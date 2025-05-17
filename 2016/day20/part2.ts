import { mergeRanges, parseInput } from './part1.ts';

const main = (input: string, start: number, end: number): number => {
	const ranges = mergeRanges(parseInput(input));
	let allowed = start + ranges[0].low + end - ranges.at(-1).high;
	for (let i = 0; i < ranges.length - 1; i++) {
		const r1 = ranges[i];
		const r2 = ranges[i + 1];
		allowed += r2.low - (r1.high + 1);
	}
	return allowed;
};

export default function (
	input: string,
	title: string,
	start: number,
	end: number,
): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, start, end);
	console.timeEnd('Time elapsed');
	return result;
}
