import { useRef } from "preact/hooks";
import type { MouseEventHandler, Ref } from "preact";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import { useSide } from "../lib/side";
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
  const { setActiveSlot } = useSide();
  const cardRef = useRef<HTMLDivElement | null>(null);

  const onContainerMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    const card = cardRef.current;
    if (!card) {
      return;
    }
    if (card.contains(event.target as Node)) {
      return;
    }
    setActiveSlot(null);
  };

  return (
    <div className="card_container" onMouseDown={onContainerMouseDown}>
      <TransformWrapper
        initialScale={0.5}
        minScale={0.5}
        maxScale={0.8}
        centerOnInit
        zoomAnimation={{
          animationType: "easeInCubic",
          size: 0.5,
          animationTime: 1,
        }}
      >
        <TransformComponent>
          <Card cardRef={cardRef} />
        </TransformComponent>
      </TransformWrapper>
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
