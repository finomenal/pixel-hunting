import arg from 'arg';
import comparePage from './comparePage';

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

const comparePageLib = async () => {
	if (!args["--old"] || !args["--new"] || !args["--width"]) throw new Error('err');
	await comparePage(args);
};

comparePageLib();
