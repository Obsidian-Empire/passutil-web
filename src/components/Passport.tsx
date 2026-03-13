import { useRef } from "preact/hooks";
import type { MouseEventHandler, Ref, WheelEventHandler } from "preact";
import { useViewport } from "../lib/viewport";
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
  TextView,
} from "./Passport/index";
import "./Passport.css";

export default function Passport() {
  const { scale, handleViewportWheel, handleViewportContainerMouseDown } =
    useViewport();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div
      className="card_container"
      onWheel={onWheel}
      onMouseDown={onContainerMouseDown}
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
    </div>
  );
}
