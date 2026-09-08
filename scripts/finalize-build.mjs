import { copyFile, rm } from "node:fs/promises";

await copyFile("dist/app.html", "dist/index.html");
await copyFile("dist/app.html", "dist/404.html");
await rm("dist/app.html");
