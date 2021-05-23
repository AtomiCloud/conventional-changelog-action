import * as path from "path";
import {opti} from "./webpack.optimizer";
import webpack, {Entry} from "webpack";
import {rules} from "./webpack.rules";
import {Kore} from "@kirinnee/core";

const nodeExternals = require('webpack-node-externals');

let core = new Kore();
core.ExtendPrimitives();

let entry: Entry = {
	index: "./src/index.ts"
};


function GenerateConfig(entry: Entry, filename: string, mode: "development" | "production" | "none", target: string, index: boolean): webpack.Configuration {
	let outDir = path.resolve(__dirname, index ? "../" : "../dist");
	let config: webpack.Configuration = {
		entry: entry,
		output: {
			path: outDir,
			filename: filename,
			libraryTarget: "umd",
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js'],
			alias: {
				'ejs': 'ejs.min.js',
				'express-handlebars': 'handlebars/dist/handlebars.js'
			}
		},
		mode: mode,
		module: {rules: rules},
		externalsPresets: {node: true},
		externals: [nodeExternals()]
		
	};
	if (target === "node") {
		config.target = "node";
		config.node = {__dirname: false, __filename: false};
	}
	if (target === "web") config.target = "web";
	if (mode === "production") config.optimization = opti;
	
	return config;
}

let target;
target = "node";

module.exports = [
	GenerateConfig(entry, '[name].min.js', 'production', target, false),
	GenerateConfig(entry, '[name].js', 'development', target, false),
	GenerateConfig(entry, 'index.ts', 'production', target, true)
];
