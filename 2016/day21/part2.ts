import { operations, OpType, parseInput } from './part1.ts';

const reverseRotateLetter = (s: string, l: string): string => {
	for (let i = s.length - 1; i >= 0; i--) {
		const num = i >= 4 ? i + 2 : i + 1;
		const str = operations.rotate(s, String(num * -1));
		if (str.indexOf(l) === i) return str;
	}
	return '';
};

const reverseOps = (s: string, ops: OpType[]): string => {
	let str = s;
	for (const op of ops.reverse()) {
		switch (op.op) {
			case 'sp':
				str = operations.swapPosition(str, op.p1, op.p2);
				break;
			case 'sl':
				str = operations.swapLetter(str, op.p1, op.p2);
				break;
			case 'rl':
				str = operations.rotateLeft(str, `${Number(op.p1) * -1}`);
				break;
			case 'rr':
				str = operations.rotate(str, `${Number(op.p1) * -1}`);
				break;
			case 'rb':
				str = reverseRotateLetter(str, op.p1);
				break;
			case 'rp':
				str = operations.reverse(str, op.p1, op.p2);
				break;
			case 'mp':
				str = operations.move(str, op.p2, op.p1);
				break;
			default:
				break;
		}
	}
	return str;
};

const main = (input: string, s: string): string => {
	const ops = parseInput(input);
	return reverseOps(s, ops);
};

export default function (input: string, title: string, s: string): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, s);
	console.timeEnd('Time elapsed');
	return result;
}
