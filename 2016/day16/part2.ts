import { findChecksum, parseInput } from './part1.ts';

const main = (input: string, diskLen: number): string => {
	const init = parseInput(input);
	return findChecksum(init, diskLen);
};

export default function (
	input: string,
	title: string,
	diskLen: number,
): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, diskLen);
	console.timeEnd('Time elapsed');
	return result;
}
