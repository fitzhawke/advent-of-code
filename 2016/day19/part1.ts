export const parseInput = (input: string): number => {
	return Number(input.trimEnd());
};

export const buildCircle = (numElves: number): Set<number> => {
	const elves = new Set<number>();

	for (let i = 1; i <= numElves; i++) {
		elves.add(i);
	}

	return elves;
};

const runGame = (numElves: number): number => {
	const elves = buildCircle(numElves);
	const iter = elves.keys();

	while (elves.size > 1) {
		const curKey = iter.next().value;
		const nextKey = iter.next().value;

		// Sets retain order. Could just use an array though.
		elves.delete(curKey);
		elves.add(curKey);
		elves.delete(nextKey);
	}

	for (const num of elves.keys()) {
		return num;
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
