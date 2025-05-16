export const parseInput = (input: string): number => {
	return Number(input.trimEnd());
};

const buildCircle = (numElves: number): Map<number, number> => {
	const elves = new Map<number, number>();

	for (let i = 1; i <= numElves; i++) {
		elves.set(i, 1);
	}

	return elves;
};

const runGame = (numElves: number): number => {
	const elves = buildCircle(numElves);

	while (elves.size > 1) {
		const sorted = Array.from(elves.keys()).sort((a, b) => a - b);
		for (let i = 0; i < sorted.length; i++) {
			const curKey = sorted[i];
			const curVal = elves.get(curKey);
			const nextKey = sorted[(i + 1) % sorted.length];
			elves.set(curKey, curVal + elves.get(nextKey));
			elves.delete(nextKey);
			i++;
		}
	}

	for (const key of elves.keys()) {
		return key;
	}

	return 0;
};

const main = (input: string): number => {
	const numElves = parseInput(input);
	return runGame(numElves);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
