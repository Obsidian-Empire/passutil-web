import { useRef } from "preact/hooks";
import type { MouseEventHandler, Ref, WheelEventHandler } from "preact";
import { useCardState, type CardSlotKind } from "../lib/state";
import { useSide } from "../lib/side";
import { useViewport } from "../lib/viewport";
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
      <CardView />
      <CardEditLayout />
    </div>
  );
}

function CardView() {
  const { state } = useCardState();
  const { nickname, entry_time, about, friends, selected, user } = state;
  const backgroundUrl = selected.background?.part.url;
  const frameUrl = selected.frame?.part.url;
  const banners = selected.banners ?? [];
  const mainBadges = selected.main_badges ?? [];
  const commonBadges = selected.common_badges ?? [];

  return (
    <div className="card_layer card_layer--display">
      <div
        className="card_slot card_slot--background card_slot--display"
        aria-hidden="true"
      >
        {backgroundUrl ? (
          <img className="card_img" src={backgroundUrl} alt="" />
        ) : null}
      </div>
      <div
        className="card_slot card_slot--frame card_slot--display"
        aria-hidden="true"
      >
        {frameUrl ? <img className="card_frame" src={frameUrl} alt="" /> : null}
      </div>
      <div
        className="card_slot card_slot--avatar card_slot--display"
        aria-hidden="true"
      >
        {user ? <img className="card_avatar" src={user} alt="" /> : null}
      </div>
      <div className="friends">
        {Array.from({ length: 14 }).map((_, index) => {
          const friend = friends[index];
          return (
            <div
              className="card_slot card_slot--friend card_slot--display"
              aria-hidden="true"
              key={`friend-display-${index}`}
            >
              {friend ? (
                <img className="avatar" src={friend} alt={index.toString()} />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="common-badges">
        {Array.from({ length: 20 }).map((_, index) => {
          const badge = commonBadges[index];
          return (
            <div
              className="card_slot card_slot--common-badge card_slot--display"
              aria-hidden="true"
              key={`common-badge-${index}`}
            >
              {badge ? (
                <img
                  className="common-badge"
                  src={badge.part.url}
                  alt={badge.part.name}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="main-badges">
        {Array.from({ length: 2 }).map((_, index) => {
          const badge = mainBadges[index];
          return (
            <div
              className="card_slot card_slot--main-badge card_slot--display"
              aria-hidden="true"
              key={`main-badge-${index}`}
            >
              {badge ? (
                <img
                  className="main-badge"
                  src={badge.part.url}
                  alt={badge.part.name}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="banners">
        {Array.from({ length: 2 }).map((_, index) => {
          const banner = banners[index];
          return (
            <div
              className="card_slot card_slot--banner card_slot--display"
              aria-hidden="true"
              key={`banner-${index}`}
            >
              {banner ? (
                <img
                  className="banner"
                  src={banner.part.url}
                  alt={banner.part.name}
                />
              ) : null}
              Card
            </div>
          );
        })}
      </div>
      <div className="text">
        <div className="text-nickname">{nickname}</div>
        <div className="text-entry-time">{entry_time}</div>
        <div className="text-about">{about}</div>
      </div>
    </div>
  );
}

function CardEditLayout() {
  const { activeSlot, setActiveSlot } = useSide();
  const { state } = useCardState();
  const { friends, selected, user } = state;
  const backgroundUrl = selected.background?.part.url;
  const mainBadges = selected.main_badges ?? [];
  const commonBadges = selected.common_badges ?? [];
  const banners = selected.banners ?? [];

  const handleSlotSelect = (kind: CardSlotKind, index: number) => {
    setActiveSlot({ kind, index });
  };

  const isSelected = (kind: CardSlotKind, index: number) =>
    activeSlot?.kind === kind && activeSlot.index === index;

  return (
    <div className="card_layer card_layer--overlay">
      <button
        className={`card_slot card_slot--background${isSelected("background", 0) ? " is-selected" : ""}`}
        type="button"
        onClick={() => handleSlotSelect("background", 0)}
        aria-label="Выбрать фон"
      >
        {backgroundUrl ? (
          <img
            className="card_img card_img--ghost"
            src={backgroundUrl}
            alt=""
          />
        ) : null}
      </button>
      <button
        className={`card_slot card_slot--avatar${isSelected("avatar", 0) ? " is-selected" : ""}`}
        type="button"
        onClick={() => handleSlotSelect("avatar", 0)}
        aria-label="Выбрать аватар"
      >
        {user ? (
          <img className="card_avatar card_avatar--ghost" src={user} alt="" />
        ) : null}
      </button>
      <div className="friends">
        {Array.from({ length: 14 }).map((_, index) => (
          <button
            className={`card_slot card_slot--friend${isSelected("friend", index) ? " is-selected" : ""}`}
            type="button"
            onClick={() => handleSlotSelect("friend", index)}
            aria-label={`Выбрать друга ${index + 1}`}
            key={`friend-${index}`}
          >
            {friends[index] ? (
              <img
                className="avatar avatar--ghost"
                src={friends[index]}
                alt=""
              />
            ) : null}
          </button>
        ))}
      </div>
      <div className="common-badges">
        {Array.from({ length: 20 }).map((_, index) => {
          const badge = commonBadges[index];
          return (
            <button
              className={`card_slot card_slot--common-badge${isSelected("common_badge", index) ? " is-selected" : ""}`}
              type="button"
              onClick={() => handleSlotSelect("common_badge", index)}
              aria-label={`Выбрать общий значок ${index + 1}`}
              key={`common-badge-${index}`}
            >
              {badge ? (
                <img
                  className="common-badge common-badge--ghost"
                  src={badge.part.url}
                  alt=""
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="main-badges">
        {Array.from({ length: 2 }).map((_, index) => {
          const badge = mainBadges[index];
          return (
            <button
              className={`card_slot card_slot--main-badge${isSelected("main_badge", index) ? " is-selected" : ""}`}
              type="button"
              onClick={() => handleSlotSelect("main_badge", index)}
              aria-label={`Выбрать основной значок ${index + 1}`}
              key={`main-badge-${index}`}
            >
              {badge ? (
                <img
                  className="main-badge main-badge--ghost"
                  src={badge.part.url}
                  alt=""
                />
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="banners">
        {Array.from({ length: 2 }).map((_, index) => {
          const banner = banners[index];
          return (
            <button
              className={`card_slot card_slot--banner${isSelected("banner", index) ? " is-selected" : ""}`}
              type="button"
              onClick={() => handleSlotSelect("banner", index)}
              aria-label={`Выбрать баннер ${index + 1}`}
              key={`banner-${index}`}
            >
              {banner ? (
                <img
                  className="banner banner--ghost"
                  src={banner.part.url}
                  alt=""
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
