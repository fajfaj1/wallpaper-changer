import dotenv from "dotenv";
dotenv.config();
import process from "node:process";
const { PEXELS_ACCESS_KEY } = process.env;

export default class Pexels {
	headers = new Headers({
		Authorization: PEXELS_ACCESS_KEY,
	});
	orientation = "landscape";
	size = "large";
	per_page = 1;
	search = async (query, color, page) => {
		const url = new URL("https://api.pexels.com/v1/search");
		url.searchParams.append("query", query);
		url.searchParams.append("color", color);
		url.searchParams.append("orientation", this.orientation);
		url.searchParams.append("size", this.size);
		url.searchParams.append("per_page", this.per_page);
		url.searchParams.append("page", page);
		const response = await fetch(url, {
			headers: this.headers,
		});
		if (!response.ok) throw new Error("Pexels API request failed");
		return await response.json();
	};
}
