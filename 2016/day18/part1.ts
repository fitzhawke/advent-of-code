export const parseInput = (input: string): string => {
	return input.trimEnd();
};

const genNewRow = (prev: string): string => {
	const prevRow = '.' + prev + '.';
	const newRow: string[] = [];
	for (let i = 1; i < prevRow.length - 1; i++) {
		const [p1, p2, p3] = prevRow.slice(i - 1, i + 2).split('');
		if (p1 === '^' && p2 === '^' && p3 !== '^') newRow.push('^');
		else if (p1 !== '^' && p2 === '^' && p3 === '^') newRow.push('^');
		else if (p1 === '^' && p2 !== '^' && p3 !== '^') newRow.push('^');
		else if (p1 !== '^' && p2 !== '^' && p3 === '^') newRow.push('^');
		else newRow.push('.');
	}
	return newRow.join('');
};

export const countSafe = (initial: string, rows: number): number => {
	const countRow = (row: string): number =>
		row.split('').reduce((acc, c) => (c === '.' ? acc + 1 : acc), 0);

	let prev = initial;
	let count = countRow(initial);
	for (let i = 1; i < rows; i++) {
		const newRow = genNewRow(prev);
		count += countRow(newRow);
		prev = newRow;
	}

	return count;
};

const main = (input: string, rows: number): number => {
	const initial = parseInput(input);
	return countSafe(initial, rows);
};

export default function (input: string, title: string, rows: number): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, rows);
	console.timeEnd('Time elapsed');
	return result;
}
