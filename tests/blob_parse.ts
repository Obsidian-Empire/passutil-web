import Blob from "../src/lib/blob";

async function run() {
  const blob = await Blob.loadFromRepo();

  const allBackgrounds = blob.backgrounds.items.find(
    (item) => item.type === "all",
  );

  const sample = allBackgrounds?.part[0];

  console.log({
    backgrounds: blob.backgrounds.items.length,
    badges: blob.badges.items.length,
    banners: blob.banners.items.length,
    frames: blob.frames.items.length,
    sample,
  });
}

run().catch((error) => {
  console.error("Failed to load blob:", error);
  process.exit(1);
});
