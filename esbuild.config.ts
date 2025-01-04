import fs from "node:fs";
import path from "node:path";
import * as esbuild from 'esbuild'
import {htmlPlugin} from "@craftamap/esbuild-plugin-html";

const
	dirname = import.meta.dirname;

function getHtmlTemplate(p: string) {
	const pathToFile = path.resolve(dirname, p);
	return fs.readFileSync(pathToFile, {encoding: "utf-8"});
}

async function main() {
	const build = await esbuild.context({
		entryPoints: ['src/index.ts'],
		bundle: true,
		metafile: true,
		outdir: '.esbuild',
		write: true,
		tsconfig: "tsconfig.json",
		logLevel: "info",
		alias: {
			"~lib": path.resolve(dirname, "src", "lib"),
			"~core": path.resolve(dirname, "src", "lib",),
			"~assets": path.resolve(dirname, "assets"),
		},
		plugins: [
			htmlPlugin({
				files: [
					{
						entryPoints: [
							"src/index.ts"
						],
						filename: "index.html",
						htmlTemplate: getHtmlTemplate("assets/templates/index.html")
					},
				],
			})
		]
	});

	await build.watch();
	const server = await build.serve({
		servedir: ".esbuild",
	});

	console.log(`Listening on port: http://localhost:${server.port}`);
}

main();
