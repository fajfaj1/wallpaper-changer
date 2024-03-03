import dotenv from "dotenv";
dotenv.config();
import process from "node:process";
const { UNSPLASH_ACCESS_KEY } = process.env;

import { createApi } from "unsplash-js";
const unsplash = createApi({
	accessKey: UNSPLASH_ACCESS_KEY,
});

export class Wallpaper {
	constructor(data) {
		this.data = data.response;
	}
	static async fetchWallpaper() {
		return await unsplash.photos.getRandom({
			orientation: "landscape",
		});
	}
}

console.log(await Wallpaper.fetchWallpaper());
