import { findRotations, parseInput } from './part1.ts';

const main = (input: string): number => {
	const discs = parseInput(input);
	discs.push({ positions: 11, initial: 0 });
	return findRotations(discs);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
