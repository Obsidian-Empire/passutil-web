import { useEffect, useRef } from "preact/hooks";
import type {
  MouseEventHandler,
  PointerEventHandler,
  Ref,
  WheelEventHandler,
} from "preact";
import { useViewport } from "../lib/viewport";
import {
  DEFAULT_SCALE_CONFIG,
  clampScale,
  computeScaleUpdate,
} from "../lib/side-scale";
import {
  AvatarEdit,
  AvatarView,
  BackgroundEdit,
  BackgroundView,
  BannersEdit,
  BannersView,
  CommonBadgesEdit,
  CommonBadgesView,
  FriendsEdit,
  FriendsView,
  FrameView,
  MainBadgesEdit,
  MainBadgesView,
  PassportProvider,
  TextEdit,
  TextView,
} from "./Passport/index";
import "./Passport.css";

export default function Passport() {
  const {
    scale,
    handleViewportWheel,
    handleViewportContainerMouseDown,
    applyScaleUpdate,
  } = useViewport();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef<Map<number, PointerEvent>>(new Map());
  const pinchRef = useRef<{
    startDistance: number;
    startScale: number;
    startScrollLeft: number;
    startScrollTop: number;
    anchorX: number;
    anchorY: number;
  } | null>(null);
  const panRef = useRef<{
    pointerId: number;
    lastX: number;
    lastY: number;
  } | null>(null);

  useEffect(() => {
    return () => {
      pointersRef.current.clear();
    };
  }, []);

  const onWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    handleViewportWheel(event as unknown as WheelEvent, container);
  };

  const scaleStyle = { "--card-scale": scale } as Record<
    string,
    string | number
  >;

  const onContainerMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }
    handleViewportContainerMouseDown(event as unknown as MouseEvent, card);
  };

  const onPointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    if (event.button !== 0 && event.pointerType === "mouse") {
      return;
    }
    container.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, event);
    if (pointersRef.current.size === 1) {
      panRef.current = {
        pointerId: event.pointerId,
        lastX: event.clientX,
        lastY: event.clientY,
      };
    }
    if (pointersRef.current.size === 2) {
      const [first, second] = Array.from(pointersRef.current.values());
      const dx = first.clientX - second.clientX;
      const dy = first.clientY - second.clientY;
      const distance = Math.hypot(dx, dy);
      const rect = container.getBoundingClientRect();
      const centerX = (first.clientX + second.clientX) / 2 - rect.left;
      const centerY = (first.clientY + second.clientY) / 2 - rect.top;
      pinchRef.current = {
        startDistance: distance,
        startScale: scale,
        startScrollLeft: container.scrollLeft,
        startScrollTop: container.scrollTop,
        anchorX: centerX,
        anchorY: centerY,
      };
      panRef.current = null;
    }
  };

  const onPointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    const container = containerRef.current;
    if (!container) {
      return;
    }
    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }
    pointersRef.current.set(event.pointerId, event);

    if (event.pointerType !== "mouse") {
      event.preventDefault();
    }

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const [first, second] = Array.from(pointersRef.current.values());
      const dx = first.clientX - second.clientX;
      const dy = first.clientY - second.clientY;
      const distance = Math.hypot(dx, dy);
      if (!distance) {
        return;
      }
      const nextScale = clampScale(
        pinchRef.current.startScale *
          (distance / pinchRef.current.startDistance),
        DEFAULT_SCALE_CONFIG.min,
        DEFAULT_SCALE_CONFIG.max,
      );
      const update = computeScaleUpdate({
        currentScale: pinchRef.current.startScale,
        nextScale,
        scrollLeft: pinchRef.current.startScrollLeft,
        scrollTop: pinchRef.current.startScrollTop,
        anchorX: pinchRef.current.anchorX,
        anchorY: pinchRef.current.anchorY,
      });
      applyScaleUpdate(update, container);
      return;
    }

    if (panRef.current && panRef.current.pointerId === event.pointerId) {
      const dx = event.clientX - panRef.current.lastX;
      const dy = event.clientY - panRef.current.lastY;
      panRef.current.lastX = event.clientX;
      panRef.current.lastY = event.clientY;
      container.scrollLeft -= dx;
      container.scrollTop -= dy;
    }
  };

  const onPointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    const container = containerRef.current;
    if (container && container.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
    pointersRef.current.delete(event.pointerId);
    if (pointersRef.current.size < 2) {
      pinchRef.current = null;
    }
    if (pointersRef.current.size === 1) {
      const remaining = Array.from(pointersRef.current.values())[0];
      panRef.current = {
        pointerId: remaining.pointerId,
        lastX: remaining.clientX,
        lastY: remaining.clientY,
      };
    } else {
      panRef.current = null;
    }
  };

  return (
    <div
      className="card_container"
      onWheel={onWheel}
      onMouseDown={onContainerMouseDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      ref={containerRef}
    >
      <div className="card_stage" style={scaleStyle}>
        <Card cardRef={cardRef} />
      </div>
    </div>
  );
}

function Card({ cardRef }: { cardRef: Ref<HTMLDivElement> }) {
  return (
    <div className="card" ref={cardRef}>
      <PassportProvider>
        <CardView />
        <CardEditLayout />
      </PassportProvider>
    </div>
  );
}

function CardView() {
  return (
    <div className="card_layer card_layer--display">
      <BackgroundView />
      <FrameView />
      <AvatarView />
      <FriendsView />
      <CommonBadgesView />
      <MainBadgesView />
      <BannersView />
      <TextView />
    </div>
  );
}

function CardEditLayout() {
  return (
    <div className="card_layer card_layer--overlay">
      <BackgroundEdit />
      <AvatarEdit />
      <FriendsEdit />
      <CommonBadgesEdit />
      <MainBadgesEdit />
      <BannersEdit />
      <TextEdit />
    </div>
  );
}
