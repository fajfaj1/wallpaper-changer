import dotenv from "dotenv";
dotenv.config();
import process from "node:process";
const { FILE_NAME, FILE_DIR } = process.env;

import { existsSync } from "node:fs";
import { join } from "node:path";

import { setWallpaper } from "wallpaper";

export default function updateWallpaper() {
	const filePath = join(FILE_DIR, FILE_NAME);
	if (!existsSync(filePath)) {
		throw new Error("Image not found");
	}
	return setWallpaper(filePath);
}
