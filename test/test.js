import assert from "assert";
import dotenv from "dotenv";
dotenv.config();
import process from "node:process";

import fs from "node:fs";

import Wallpaper from "../modules/wallpaper.js";
import updateWallpaper from "../modules/desktop.js";
import Pexels from "../modules/pexels.js";

const wallpaper = await Wallpaper.fetchWallpaper("", ["nature"]);

describe("wallpaper.js", () => {
	describe("#Wallpaper.fetchWallpaper()", () => {
		it("should return a new Wallpaper object", async () => {
			assert.ok(wallpaper instanceof Wallpaper);
		});
	});

	describe("#wallpaper.saveImage()", () => {
		it("should save the image to the specified directory", async () => {
			const path = await wallpaper.saveImage("./image");
			assert.ok(fs.existsSync(path));
		});
	});
});

describe("desktop.js", () => {
	describe("#updateWallpaper()", () => {
		it("should update the wallpaper", () => {
			assert.doesNotThrow(() => {
				updateWallpaper();
			});
		});
	});
});

const pexels = new Pexels();
describe("pexels.js", () => {
	describe("#Pexels.search()", () => {
		it("Should return a JSON object", async () => {
			const response = await pexels.search("nature", "green", 1);
			console.log(response);
			assert.ok(response);
		});
	});
});
