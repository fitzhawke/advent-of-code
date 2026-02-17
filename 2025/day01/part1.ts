export const parseInput = (input: string): number[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((c) => Number(c.replace('R', '').replace('L', '-')));
};

const countZero = (rotations: number[], startVal: number = 50): number => {
	let zeroes = 0;
	let val = startVal;

	for (const rot of rotations) {
		val = (val + rot + 100) % 100;
		if (val === 0) zeroes++;
	}

	return zeroes;
};

const main = (input: string): number => {
	const rotations = parseInput(input);
	return countZero(rotations);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
