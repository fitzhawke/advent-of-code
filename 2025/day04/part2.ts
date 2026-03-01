import {
	coordFromId,
	eightDir,
	idFromCoord,
	paperMap,
	parseInput,
} from './part1.ts';

const movePaper = (pMap: paperMap): number => {
	let curMap = pMap;

	while (true) {
		let nextMap = new Set() as paperMap;

		for (const loc of curMap) {
			let count = 0;

			const [r, c] = coordFromId(loc);
			for (const [y, x] of eightDir) {
				if (curMap.has(idFromCoord(r + y, c + x))) count++;
				if (count >= 4) {
					nextMap.add(loc);
					break;
				}
			}
		}

		if (nextMap.size === curMap.size) break;
		curMap = nextMap;
	}

	return pMap.size - curMap.size;
};

const main = (input: string): number => {
	const pMap = parseInput(input);
	return movePaper(pMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
