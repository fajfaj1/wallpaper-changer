import assert from "assert";
import dotenv from "dotenv";
dotenv.config();
import process from "node:process";
import Wallpaper from "../modules/wallpaper.js";
import fs from "node:fs";

const { FILE_NAME } = process.env;

const wallpaper = await Wallpaper.fetchWallpaper();

describe("Wallpaper", async () => {
	describe("#Wallpaper.fetchWallpaper()", () => {
		it("should return a new Wallpaper object", async () => {
			assert.ok(wallpaper instanceof Wallpaper);
		});
	});

	describe("#wallpaper.saveImage()", () => {
		it("should save the image to the specified directory", async () => {
			await wallpaper.saveImage("./image");
			assert.ok(fs.existsSync(`./image/${FILE_NAME}`));
		});
	});
});
