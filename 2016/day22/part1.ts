type NodeType = {
	r: number;
	c: number;
	size: number;
	used: number;
	avail: number;
	per: number;
};

export const parseInput = (input: string): NodeType[] => {
	const nodes: NodeType[] = [];
	input
		.trimEnd()
		.split('\n')
		.forEach((cur, i) => {
			if (i === 0 || i === 1) return;
			const [c, r, size, used, avail, per] = cur.matchAll(/\d+/g).map(Number);
			nodes.push({ r, c, size, used, avail, per });
		});

	return nodes;
};

const findPairs = (nodes: NodeType[]): number => {
	let pairs = 0;

	for (let i = 0; i < nodes.length; i++) {
		for (let j = 0; j < nodes.length; j++) {
			const n1 = nodes[i];
			const n2 = nodes[j];

			if (n1.used === 0) continue;
			if (n1 === n2) continue;

			if (n1.used <= n2.avail) pairs++;
		}
	}

	return pairs;
};

const main = (input: string): number => {
	const nodes = parseInput(input);
	return findPairs(nodes);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
