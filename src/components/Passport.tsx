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
    <TransformWrapper
      initialScale={0.7}
      minScale={0.5}
      maxScale={1.2}
      centerOnInit
      zoomAnimation={{
        animationType: "easeInCubic",
        size: 0.5,
        animationTime: 1,
      }}
    >
      <TransformComponent
        wrapperStyle={{ width: "100%", height: "100%" }}
        wrapperProps={{ onMouseDown: onContainerMouseDown }}
      >
        <Card cardRef={cardRef} />
      </TransformComponent>
    </TransformWrapper>
  );
}

function Card({ cardRef }: { cardRef: Ref<HTMLDivElement> }) {
  return (
    <div className="h-[900px] w-[1600px]" ref={cardRef}>
      <PassportProvider>
        <CardView />
        <CardEditLayout />
      </PassportProvider>
    </div>
  );
}

function CardView() {
  return (
    <div className="card relative h-[900px] w-[1600px]">
      <BackgroundView />
      <FrameView />
      <AvatarView />
      <FriendsView />
      <MainBadgesView />
      <CommonBadgesView />
      <BannersView />
      <TextView />
    </div>
  );
}

function CardEditLayout() {
  return (
    <div>
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
