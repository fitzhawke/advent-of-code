import { countSafe, parseInput } from './part1.ts';

const main = (input: string, rows: number): number => {
	const initial = parseInput(input);
	return countSafe(initial, rows);
};

export default function (input: string, title: string, rows: number): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, rows);
	console.timeEnd('Time elapsed');
	return result;
}
