import env from "./modules/env.js";
const { FILE_DIR, FILE_NAME } = env;

import path from "node:path";

import Pexels from "./modules/pexels.js";
import download from "./modules/downloader.js";
import fs from "node:fs";

import { setWallpaper } from "wallpaper";

(async () => {
	// const color = process.argv[2];
	const query = process.argv.slice(2).join(" ");

	const pexels = new Pexels();
	console.log("Fetching image from Pexels...");
	const response = await pexels.search(
		query,
		undefined,
		Math.round(Math.random() * 20)
	);
	const photo = response.photos[0];

	console.log("Logging the query...");
	if (!fs.existsSync("logs")) fs.mkdirSync("logs");
	fs.writeFileSync(
		"logs/logs.txt",
		`[${new Date()}] "${query}" - ${photo.url}\n`,
		{
			flag: "a",
		}
	);

	const filePath = path.join(
		FILE_DIR,
		FILE_NAME.replace(
			"%TIME%",
			new Date()
				.toISOString()
				.replace(/\.[0-9]{3}Z/, "")
				.replace(/:/g, "-")
		)
	);

	console.log("Purging the directory...");
	// Purge the directory
	if (fs.existsSync(FILE_DIR)) fs.rmSync(FILE_DIR, { recursive: true });
	fs.mkdirSync(FILE_DIR, { recursive: true });

	console.log("Downloading the image to disk...");
	await download(response.photos[0].src.original, filePath);

	console.log("Setting the wallpaper...");
	await setWallpaper(filePath);
})();
