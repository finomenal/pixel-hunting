#! /usr/bin/env node

import arg from 'arg';
import comparePage from './lib/comparePage';
import compare from './lib/compare';
import getSiteMap from './lib/getSiteMap';
import { ADD_CORRECT_PAGES, ADD_DOMAINS, HELP } from './constants/messages';

const args = arg({
	'--old': String,
	'--new': String,
	'--main-selector': String,
	'--width': Number,
	'--page': [String],
	'--await': [String],
	'--conceal': [String],
	'--help': Boolean,
	'--sitemap': Boolean,

	'-o': '--old',
	'-n': '--new',
	'-m': '--main-selector',
	'-w': '--width',
	'-p': '--page',
	'-a': '--await',
	'-c': '--conceal',
	'-h': '--help',
	'-s': '--sitemap'
});

(async () => {
	if (args['--help']) {
		console.log(HELP);
		process.exit();
	}

	const oldDomain = args["--old"];
	const newDomain = args["--new"];

	if (!oldDomain || !newDomain) {
		console.log(ADD_DOMAINS);
		process.exit();
	}

	if (args["--sitemap"]) {
		const pages = await getSiteMap(oldDomain);
		args["--page"] = pages;
		await compare(args);
	} else if (args["--page"]) {
		if (args["--page"].find(p => !p.match(/^\//))) {
			console.log(ADD_CORRECT_PAGES);
			process.exit();
		}

		if (args["--page"].length === 1) {
			const page = args["--page"][0];
			args['--old'] = `${oldDomain}${page}`;
			args['--new'] = `${newDomain}${page}`;
			await comparePage(args);
		} else {
			await compare(args);
		}
	} else {
		await comparePage(args);
	}
})();
