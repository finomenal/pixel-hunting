import type { Config } from '../types';
import { exec } from 'child_process';
import path from 'path';
import writeMessage from './writeMessage';
import { DONE } from '../constants/messages';

const maxCount = 8;
const compare = async (args: Config) => {
	const {
		"--old": oldUrl, "--new": newUrl, "--width": width = 1440, "--page": pages = [], "--conceal": conceal = [], "--await": awaitList = [], "--main-selector": mainSelector = 'body'
	} = args;
	const pagesLength = pages.length;
	const asyncData = { done: 0, currentProcessCount: 0, started: 0 };

	const comparePage = async (page: string) => {
		asyncData.currentProcessCount += 1;
		asyncData.started += 1;
		const oldPage = `${oldUrl}${page}`;
		const newPage = `${newUrl}${page}`;

		const concealRow = conceal.map(concealItem => `-c ${concealItem}`).join(' ');
		const awaitRow = awaitList.map(awaitItem => `-a ${awaitItem}`).join(' ');

		exec(`node ${path.join(__dirname, 'comparePageLib')} -o ${oldPage} -n ${newPage} -m ${mainSelector} -w ${width} ${concealRow} ${awaitRow}`, (err, stdout, stderr) => {
			if (err) throw err;
			if (stderr) throw new Error(stderr);
			if (stdout) writeMessage(stdout);

			asyncData.done += 1;
			const pageFixed = !page || page.length <= 80 ? page : `${page.slice(0, 80)}...`;
			writeMessage(`${asyncData.done}/${pagesLength} (${Math.floor(asyncData.done / pagesLength * 100)}%). ${pageFixed}.` + '\r\n');

			if (asyncData.currentProcessCount === maxCount && asyncData.started <= pagesLength) {
				comparePage(pages[asyncData.started]);
			}

			asyncData.currentProcessCount -= 1;

			if (asyncData.done === pagesLength) {
				writeMessage(DONE);
				process.exit();
			}
		});
	};

	for (const page of pages.slice(0, maxCount)) {
		comparePage(page);
	}
};

export default compare;
