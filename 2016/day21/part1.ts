export type OpType = {
	op: 'sp' | 'sl' | 'rl' | 'rr' | 'rb' | 'rp' | 'mp' | '';
	p1?: string;
	p2?: string;
};

export const operations = {
	swapPosition: (s: string, p1: string, p2: string): string => {
		let sArr = s.split('');
		const l1 = s.charAt(Number(p1));
		const l2 = s.charAt(Number(p2));
		sArr[Number(p1)] = l2;
		sArr[Number(p2)] = l1;
		return sArr.join('');
	},

	swapLetter: (s: string, l1: string, l2: string = ''): string =>
		s.replace(l1, '_').replace(l2, l1).replace('_', l2),

	rotate: (s: string, steps: string): string => {
		let num = Number(steps);
		while (num < 0) num += s.length;
		num = num % s.length;
		const sNum = s.length - num;
		return s.substring(sNum) + s.substring(0, sNum);
	},

	rotateLeft: (s: string, steps: string): string =>
		operations.rotate(s, `${Number(steps) * -1}`),

	rotateLetter: (s: string, l: string): string => {
		const idx = s.indexOf(l);
		const rotNum = idx >= 4 ? 2 + idx : 1 + idx;
		return operations.rotate(s, `${rotNum}`);
	},

	reverse: (s: string, p1: string, p2: string): string => {
		const s2 = s.substring(Number(p1), Number(p2) + 1);
		const s2Rev = s2.split('').reverse().join('');
		return s.replace(s2, s2Rev);
	},

	move: (s: string, p1: string, p2: string): string => {
		const sArr = s.split('');
		const [l] = sArr.splice(Number(p1), 1);
		return sArr.toSpliced(Number(p2), 0, l).join('');
	},
};

export const parseInput = (input: string): OpType[] => {
	const ops: OpType[] = input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			if (cur.startsWith('swap position')) {
				const [, , p1, , , p2] = cur.split(' ');
				return { op: 'sp', p1, p2 };
			}
			if (cur.startsWith('swap letter')) {
				const [, , p1, , , p2] = cur.split(' ');
				return { op: 'sl', p1, p2 };
			}
			if (cur.startsWith('rotate right')) {
				const [, , p1] = cur.split(' ');
				return { op: 'rr', p1 };
			}
			if (cur.startsWith('rotate left')) {
				const [, , p1] = cur.split(' ');
				return { op: 'rl', p1 };
			}
			if (cur.startsWith('rotate based')) {
				const [, , , , , , p1] = cur.split(' ');
				return { op: 'rb', p1 };
			}
			if (cur.startsWith('reverse')) {
				const [, , p1, , p2] = cur.split(' ');
				return { op: 'rp', p1, p2 };
			}
			if (cur.startsWith('move')) {
				const [, , p1, , , p2] = cur.split(' ');
				return { op: 'mp', p1, p2 };
			}
			return { op: '' };
		});
	return ops;
};

const performOps = (s: string, ops: OpType[]): string => {
	let str = s;
	for (const op of ops) {
		switch (op.op) {
			case 'sp':
				str = operations.swapPosition(str, op.p1, op.p2);
				break;
			case 'sl':
				str = operations.swapLetter(str, op.p1, op.p2);
				break;
			case 'rl':
				str = operations.rotateLeft(str, op.p1);
				break;
			case 'rr':
				str = operations.rotate(str, op.p1);
				break;
			case 'rb':
				str = operations.rotateLetter(str, op.p1);
				break;
			case 'rp':
				str = operations.reverse(str, op.p1, op.p2);
				break;
			case 'mp':
				str = operations.move(str, op.p1, op.p2);
				break;
			default:
				break;
		}
	}
	return str;
};

const main = (input: string, s: string): string => {
	const ops = parseInput(input);
	return performOps(s, ops);
};

export default function (input: string, title: string, s: string): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, s);
	console.timeEnd('Time elapsed');
	return result;
}
