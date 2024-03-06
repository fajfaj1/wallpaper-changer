import assert from "assert";

import env from "../modules/env.js";
const { FILE_NAME, FILE_DIR } = env;

import fs from "node:fs";
import path from "node:path";

import Pexels from "../modules/pexels.js";
import download from "../modules/downloader.js";

const pexels = new Pexels();
describe("pexels.js", () => {
	describe("#Pexels.search()", () => {
		it("Should return a JSON object", async () => {
			const response = await pexels.search("nature", "green", 1);
			assert.ok(response);
		});
	});
});

describe("download.js", () => {
	describe("#download()", () => {
		it("should download the wikipedia logo", async () => {
			const url =
				"https://en.wikipedia.org/static/images/icons/wikipedia.png";
			const filePath = path.join("test", "wikipedia-download.png");
			const templatePath = path.join("test", "wikipedia.png");
			download(url, filePath).then(() => {
				const template = fs.readFileSync(templatePath);
				const downloaded = fs.readFileSync(filePath);
				assert.strictEqual(template.toString(), downloaded.toString());
			});
		});
	});
});
