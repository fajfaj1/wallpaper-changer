import Wallpaper from "./modules/wallpaper.js";
import updateWallpaper from "./modules/desktop.js";
import fs from "node:fs";
(async () => {
	const color = process.argv[2];
	const query = process.argv.slice(2);

	const wallpaper = await Wallpaper.fetchWallpaper(color, query);

	fs.writeFileSync(
		"./logs/log.txt",
		`[${new Date()}] ${query} ${wallpaper.data.slug} ${wallpaper.data.id}`,
		{ flag: "a" }
	);

	await wallpaper.saveImage("./image");
	setTimeout(async () => {
		await updateWallpaper();

		console.log("Wallpaper updated successfully");
	}, 2000);
})();
