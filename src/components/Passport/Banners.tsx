import { usePassportContext } from "./PassportContext";
import { SlotEditItemShell, SlotViewItemShell } from "./SlotItemShell";

export function BannersView() {
  return (
    <div className="banners">
      {Array.from({ length: 2 }).map((_, index) => (
        <BannerViewItem key={`banner-${index}`} index={index} />
      ))}
    </div>
  );
}

export function BannersEdit() {
  return (
    <div className="banners">
      {Array.from({ length: 2 }).map((_, index) => (
        <BannerEditItem key={`banner-${index}`} index={index} />
      ))}
    </div>
  );
}

function BannerViewItem({ index }: { index: number }) {
  const { banners } = usePassportContext();
  const banner = banners[index];

  return (
    <SlotViewItemShell slotClassName="card_slot--banner">
      {banner ? (
        <img className="banner" src={banner.part.url} alt={banner.part.name} />
      ) : null}
      Card
    </SlotViewItemShell>
  );
}

function BannerEditItem({ index }: { index: number }) {
  const { banners, isSelected, selectSlot } = usePassportContext();
  const banner = banners[index];

  return (
    <SlotEditItemShell
      slotClassName="card_slot--banner"
      isSelected={isSelected("banner", index)}
      onClick={() => selectSlot("banner", index)}
      ariaLabel={`Выбрать баннер ${index + 1}`}
    >
      {banner ? (
        <img className="banner banner--ghost" src={banner.part.url} alt="" />
      ) : null}
    </SlotEditItemShell>
  );
}
