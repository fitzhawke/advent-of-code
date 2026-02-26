import { calcMaxVolt } from './part2.ts';

export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

export const findMaxVal = (str: string): string => {
	const max = str
		.split('')
		.reduce((a, c) => (Number(c) > Number(a) ? c : a), '0');
	return max;
};

const main = (input: string): number => {
	const banks = parseInput(input);
	return banks.reduce((a, c) => a + calcMaxVolt(c, 2), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
