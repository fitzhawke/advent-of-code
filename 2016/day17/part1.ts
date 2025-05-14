import crypto from 'node:crypto';

export const dirs = [
	{ dir: 'U', r: -1, c: 0 },
	{ dir: 'D', r: 1, c: 0 },
	{ dir: 'L', r: 0, c: -1 },
	{ dir: 'R', r: 0, c: 1 },
];

export const md5Hash = (str: string) =>
	crypto.createHash('md5').update(str).digest('hex');

export const parseInput = (input: string): string => {
	return input.trimEnd();
};

const findBestPath = (seed: string): string => {
	const queue: [number, number, string][] = [[1, 1, '']];
	const open = 'bcdef';

	while (queue.length > 0) {
		const [r, c, path] = queue.shift();
		if (r === 4 && c === 4) return path;
		const check = md5Hash(`${seed}${path}`).slice(0, 4);

		for (let i = 0; i < dirs.length; i++) {
			if (!open.includes(check[i])) continue;
			const d = dirs[i];
			const r2 = r + d.r;
			const c2 = c + d.c;
			if (r2 < 1 || r2 > 4) continue;
			if (c2 < 1 || c2 > 4) continue;

			queue.push([r2, c2, path + d.dir]);
		}
	}
	return '';
};

const main = (input: string): string => {
	const seed = parseInput(input);
	return findBestPath(seed);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
