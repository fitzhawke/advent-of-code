export type paperMap = Set<string>;

export const eightDir = [
	[-1, -1],
	[0, -1],
	[1, -1],
	[-1, 0],
	[1, 0],
	[-1, 1],
	[0, 1],
	[1, 1],
];

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

export const parseInput = (input: string): paperMap => {
	const pMap = new Set() as paperMap;
	input
		.trimEnd()
		.split('\n')
		.map((a, r) =>
			a.split('').map((b, c) => {
				if (b === '@') pMap.add(idFromCoord(r, c));
			}),
		);
	return pMap;
};

const countMovable = (pMap: paperMap): number => {
	let movable = 0;

	for (const loc of pMap) {
		let count = 0;

		const [r, c] = coordFromId(loc);
		for (const [y, x] of eightDir) {
			if (pMap.has(idFromCoord(r + y, c + x))) count++;
			if (count >= 4) break;
		}

		if (count < 4) movable++;
	}

	return movable;
};

const main = (input: string): number => {
	const pMap = parseInput(input);
	return countMovable(pMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
