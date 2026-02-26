export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

const findMaxVal = (str: string): string => {
	const max = str
		.split('')
		.reduce((a, c) => (Number(c) > Number(a) ? c : a), '0');
	return max;
};

const calcMaxVolt = (bank: string): number => {
	const firstVal = findMaxVal(bank.slice(0, bank.length - 1));
	const secondVal = findMaxVal(bank.slice(bank.indexOf(firstVal) + 1));

	return Number([firstVal, secondVal].join(''));
};

const main = (input: string): number => {
	const banks = parseInput(input);
	return banks.reduce((a, c) => a + calcMaxVolt(c), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
