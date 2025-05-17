type RangeType = {
	low: number;
	high: number;
};

export const parseInput = (input: string): RangeType[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			const [low, high] = cur.split('-').map(Number);
			return { low, high };
		});
};

const findLowest = (ranges: RangeType[]): number => {
	while (true) {
		let done = true;
		const newRanges: RangeType[] = [];
		ranges.sort((a, b) => a.low - b.low);
		for (let i = 0; i < ranges.length - 1; i++) {
			const r1 = ranges[i];
			const r2 = ranges[i + 1];

			if (r1.high + 1 < r2.low) {
				newRanges.push(r1);
				if (i === ranges.length - 1) newRanges.push(r2);
				continue;
			}

			done = false;
			newRanges.push({
				low: Math.min(r1.low, r2.low),
				high: Math.max(r1.high, r2.high),
			});
			i++;
		}
		if (done) break;
		else ranges = newRanges;
	}
	console.log(ranges);
	return ranges[0].high + 1;
};

const main = (input: string): number => {
	const ranges = parseInput(input);
	return findLowest(ranges);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
