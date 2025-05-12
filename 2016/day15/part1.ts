type DiscType = {
	positions: number;
	initial: number;
};

export const parseInput = (input: string): DiscType[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			const [, pos, , init] = [...cur.matchAll(/\d+/g)].map(Number);
			return { positions: pos, initial: init };
		});
};

export const findRotations = (discs: DiscType[]): number => {
	let time = 0;

	while (true) {
		let good = true;
		let extra = 0;
		for (const disc of discs) {
			extra++;
			if ((disc.initial + time + extra) % disc.positions !== 0) {
				good = false;
				break;
			}
		}
		if (good) break;
		time++;
	}

	return time;
};

const main = (input: string): number => {
	const discs = parseInput(input);
	return findRotations(discs);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
