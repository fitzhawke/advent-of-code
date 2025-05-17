import { parseInput } from './part1.ts';

const runGame = (numElves: number): number => {
	const lSet = new Set<number>();
	const rSet = new Set<number>();

	for (let i = 1; i <= numElves; i++) {
		i < numElves / 2 ? lSet.add(i) : rSet.add(i);
	}

	const l = lSet.values();
	const r = rSet.values();

	while (lSet.size + rSet.size > 1) {
		const lVal = l.next().value;
		const rVal = r.next().value;

		rSet.add(lVal);
		lSet.delete(lVal);
		rSet.delete(rVal);

		while (lSet.size + 1 < rSet.size) {
			const cur = r.next().value;
			lSet.add(cur);
			rSet.delete(cur);
		}
	}

	return r.next().value;
};

const main = (input: string): number => {
	const numElves = parseInput(input);
	return runGame(numElves);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
