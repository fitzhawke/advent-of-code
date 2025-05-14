import { dirs, md5Hash, parseInput } from './part1.ts';

const findLongestPath = (seed: string): number => {
	const queue: [number, number, string, number][] = [[1, 1, '', 0]];
	const open = 'bcdef';
	let longest = 0;

	while (queue.length > 0) {
		const [r, c, path, steps] = queue.shift();
		if (r === 4 && c === 4) {
			longest = steps;
			continue;
		}
		const check = md5Hash(`${seed}${path}`).slice(0, 4);

		for (let i = 0; i < dirs.length; i++) {
			if (!open.includes(check[i])) continue;
			const d = dirs[i];
			const r2 = r + d.r;
			const c2 = c + d.c;
			if (r2 < 1 || r2 > 4) continue;
			if (c2 < 1 || c2 > 4) continue;

			queue.push([r2, c2, path + d.dir, steps + 1]);
		}
	}
	return longest;
};

const main = (input: string): number => {
	const seed = parseInput(input);
	return findLongestPath(seed);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
