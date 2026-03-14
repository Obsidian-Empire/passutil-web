import { GithubLogoIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { ImageIcon, UmbrellaSimpleIcon } from "@phosphor-icons/react/dist/ssr";

function Promo() {
  return (
    <section>
      <div className="flex w-full flex-col gap-2 overflow-clip rounded-xl border bg-linear-to-r from-primary/10 to-background p-2">
        <div className="bg-grad z-1 flex items-center justify-between gap-2">
          <h1 className="text-xl">Passutil</h1>
          <div className="flex gap-2">
            {/* <Button>
              <InfoIcon />
            </Button> */}
            <Button
              render={
                <a
                  href="https://github.com/Obsidian-Empire/passutil_assets/tree/compressed"
                  aria-label="Репозиторий изображений проекта"
                  about="Репозиторий изображений проекта"
                >
                  <ImageIcon aria-hidden="true" />
                </a>
              }
            />
            <Button
              render={
                <a
                  href="https://github.com/Obsidian-Empire/passutil-web"
                  aria-label="Репозиторий проекта"
                  about="Репозиторий проекта"
                >
                  <GithubLogoIcon aria-hidden="true" />
                </a>
              }
            />
          </div>
        </div>
      </div>
      <a
        href="https://github.com/TOwInOK"
        className="flex items-center justify-end gap-2 pt-2 pr-2 text-sm text-muted-foreground"
      >
        <span>powered by loum</span>
        <UmbrellaSimpleIcon aria-hidden="true" focusable="false" />
      </a>
    </section>
  );
}

export { Promo };
