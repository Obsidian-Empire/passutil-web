import { usePassportContext } from "./PassportContext";

export function TextView() {
  const { nickname, entryTime, about } = usePassportContext();

  return (
    <div className="text">
      <div className="text-nickname">{nickname}</div>
      <div className="text-entry-time">{entryTime}</div>
      <div className="text-about">{about}</div>
    </div>
  );
}
