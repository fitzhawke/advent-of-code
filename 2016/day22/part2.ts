import { NodeType, parseInput } from './part1.ts';

type NodeMap = {
	map: Map<string, string>;
	empty: string;
	target: string;
	rows: number;
	cols: number;
};

const dirs = [
	[1, 0],
	[0, 1],
	[-1, 0],
	[0, -1],
];

const buildMap = (nodes: NodeType[]): NodeMap => {
	const map = new Map<string, string>();
	const maxC = nodes.reduce((acc, c) => (c.c > acc ? c.c : acc), 0);
	const maxR = nodes.reduce((acc, c) => (c.r > acc ? c.r : acc), 0);
	const [empty] = nodes.filter((c) => c.used === 0);
	const [target] = nodes.filter((c) => c.r === 0 && c.c === maxC);

	for (let i = 0; i < nodes.length; i++) {
		const n = nodes[i];
		const id = [n.r, n.c].join('_');
		if (n.r === 0 && n.c === maxC) map.set(id, 't');
		else if (n === empty) map.set(id, 'e');
		else if (n.used > empty.avail) map.set(id, 'X');
		else map.set(id, '.');
	}

	return {
		map,
		empty: [empty.r, empty.c].join('_'),
		target: [target.r, target.c].join('_'),
		rows: maxR + 1,
		cols: maxC + 1,
	};
};

const serial = (map: Map<string, string>): string => {
	let s = '';
	for (const val of map.values()) {
		s += val;
	}
	return s;
};

const deserial = (s: string, r: number, c: number): NodeMap => {
	const map = new Map<string, string>();
	let empty = '';
	let target = '';
	for (let i = 0; i < s.length; i++) {
		const row = i % r;
		const col = Math.floor(i / r);
		const id = [row, col].join('_');
		if (s[i] === 'e') empty = id;
		if (s[i] === 'e') target = id;
		map.set(id, s[i]);
	}
	return { map, empty, target, rows: r, cols: c };
};

const moveBlocks = (map: NodeMap): number => {
	const queue: [string, number][] = [[serial(map.map), 0]];
	const seen = new Set<string>();

	while (queue.length > 0) {
		const [ser, steps] = queue.shift();

		if (seen.has(ser)) continue;
		else seen.add(ser);

		if (ser[0] === 't') return steps;

		for (const dir of dirs) {
			const cur = deserial(ser, map.rows, map.cols);
			const [empR, empC] = cur.empty.split('_').map(Number);
			const newR = empR + dir[0];
			const newC = empC + dir[1];
			const newId = [newR, newC].join('_');
			const m = cur.map;
			if (m.has(newId) && m.get(newId) !== 'X') {
				const tmp = m.get(newId);
				m.set(newId, 'e');
				m.set(cur.empty, tmp);
				queue.push([serial(m), steps + 1]);
			}
		}
	}

	return 0;
};

const main = (input: string): number => {
	const nodes = parseInput(input);
	const map = buildMap(nodes);
	return moveBlocks(map);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
