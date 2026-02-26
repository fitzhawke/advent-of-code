import { findMaxVal, parseInput } from './part1.ts';

export const calcMaxVolt = (bank: string, batteries: number): number => {
	const vals: string[] = [];
	let remain = bank;

	for (let i = batteries - 1; i >= 0; i--) {
		const maxVal = findMaxVal(remain.slice(0, remain.length - i));
		vals.push(maxVal);
		remain = remain.slice(remain.indexOf(maxVal) + 1);
	}

	return Number(vals.join(''));
};

const main = (input: string): number => {
	const banks = parseInput(input);
	return banks.reduce((a, c) => a + calcMaxVolt(c, 12), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
