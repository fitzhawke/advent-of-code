import { IDRange, parseInput } from './part1.ts';

const findInvalid = (rng: IDRange): number => {
	let count = 0;

	for (let i = rng.start; i <= rng.end; i++) {
		const testVal = String(i);
		for (let j = 1; j <= testVal.length / 2; j++) {
			if (testVal.length % j !== 0) continue;
			const l = testVal.slice(0, j);
			if (l.repeat(testVal.length / j) === testVal) {
				count += i;
				break;
			}
		}
	}

	return count;
};

const main = (input: string): number => {
	let invalid = 0;
	const ranges = parseInput(input);
	for (const rng of ranges) invalid += findInvalid(rng);
	return invalid;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
