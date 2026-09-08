import { copyFile, cp, rm } from "node:fs/promises";

await rm("assets", { recursive: true, force: true });
await rm("images", { recursive: true, force: true });
await cp("dist/assets", "assets", { recursive: true });
await cp("dist/images", "images", { recursive: true });
await copyFile("dist/index.html", "index.html");
await copyFile("dist/404.html", "404.html");
await copyFile("dist/robots.txt", "robots.txt");
await copyFile("dist/.nojekyll", ".nojekyll");
