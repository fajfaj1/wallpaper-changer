// env variables
import dotenv from "dotenv";
dotenv.config();
import process from "node:process";
const { UNSPLASH_ACCESS_KEY, FILE_NAME, IMGRES } = process.env;

// unsplash wrapper
import { createApi } from "unsplash-js";
const unsplash = createApi({
	accessKey: UNSPLASH_ACCESS_KEY,
});

import fs from "node:fs";
import path from "node:path";
import download from "download";

export default class Wallpaper {
	constructor(data) {
		this.data = data;
	}

	static async fetchWallpaper(color, query) {
		// Takes a result corresponding to the day of the month
		let response = await unsplash.search.getPhotos({
			perPage: 1,
			page: Math.round(Math.random() * 25),
			query: `highresolution ${query.join(" ")}`,
			orientation: "landscape",
			orderBy: "editorial",
			// color,
		});

		response = response.response.results[0];
		return new Wallpaper(response);
	}

	async saveImage(destinationPath) {
		const url = this.data.urls[IMGRES];

		if (!fs.existsSync(destinationPath)) {
			fs.mkdirSync(destinationPath, { recursive: true });
		}

		download(url, destinationPath, { filename: FILE_NAME });
		return path.join(destinationPath, FILE_NAME);
	}
}
