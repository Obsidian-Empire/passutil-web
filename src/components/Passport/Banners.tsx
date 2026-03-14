import { SelectBox } from "../ui/select-box";
import { usePassportContext } from "./PassportContext";

export function BannersView() {
  return (
    <SelectBox type="banners">
      {Array.from({ length: 2 }).map((_, index) => (
        <BannerViewItem key={`banner-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

export function BannersEdit() {
  return (
    <SelectBox type="banners" variant="bound_box">
      {Array.from({ length: 2 }).map((_, index) => (
        <BannerEditItem key={`banner-${index}`} index={index} />
      ))}
    </SelectBox>
  );
}

function BannerViewItem({ index }: { index: number }) {
  const { banners } = usePassportContext();
  const banner = banners[index];

  return (
    <SelectBox type="banner" className="cursor-pointer" aria-hidden="true">
      {banner ? <img src={banner.part.url} alt={banner.part.name} /> : null}
    </SelectBox>
  );
}

function BannerEditItem({ index }: { index: number }) {
  const { isSelected, selectSlot } = usePassportContext();

  return (
    <SelectBox
      type="banner"
      className="cursor-pointer"
      data-selected={isSelected("banner", index) ? true : false}
      onClick={() => selectSlot("banner", index)}
      aria-label={`Выбрать баннер ${index + 1}`}
      variant="edit"
    />
  );
}
