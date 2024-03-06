import { error } from "console";
import { createWriteStream, existsSync, writeFileSync } from "fs";
import path from "path";
import { Readable } from "stream";

export default function download(url, filePath) {
	return new Promise(async (resolve, reject) => {
		const filePathParsed = path.parse(filePath);
		if (!existsSync(filePathParsed.dir))
			throw new Error("Directory not found");

		const writer = createWriteStream(filePath, {
			flags: "w",
			encoding: "binary",
		});

		const response = await fetch(url);

		const stream = Readable.fromWeb(response.body).pipe(writer);
		stream.on("close", () => {
			console.log("resolving");
			resolve(filePath);
		});
		stream.on(error, err => reject(err));
	});
}
