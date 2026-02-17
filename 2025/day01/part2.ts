import { mod, parseInput } from './part1.ts';

const countZero = (rotations: number[], startVal: number = 50): number => {
	let zeroes = 0;
	let val = startVal;

	for (const rot of rotations) {
		const newVal = val + rot;

		if (val !== 0 && newVal <= 0) zeroes++;

		if (Math.abs(newVal) >= 100) {
			zeroes += Math.floor(Math.abs(newVal) / 100);
		}

		val = mod(newVal, 100);
	}

	return zeroes;
};

const main = (input: string): number => {
	const rotations = parseInput(input);
	return countZero(rotations);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
