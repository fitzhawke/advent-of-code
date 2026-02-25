export type IDRange = {
	start: number;
	end: number;
};

export const parseInput = (input: string): IDRange[] => {
	return input
		.trimEnd()
		.split(',')
		.map((c) => {
			const [start, end] = c.split('-').map(Number);
			return { start, end };
		});
};

const findInvalid = (rng: IDRange): number => {
	let count = 0;

	for (let i = rng.start; i <= rng.end; i++) {
		const testVal = String(i);
		if (testVal.length % 2 !== 0) continue;

		const l = testVal.slice(0, testVal.length / 2);
		const r = testVal.slice(testVal.length / 2);

		if (l === r) count += i;
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
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
