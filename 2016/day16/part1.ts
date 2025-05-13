export const parseInput = (input: string): string => {
	return input.trimEnd();
};

const findChecksum = (init: string, diskLen: number): string => {
	let data = init;

	while (data.length < diskLen) {
		data =
			data +
			'0' +
			data
				.split('')
				.reverse()
				.map((c) => {
					if (c === '0') return '1';
					else return '0';
				})
				.join('');
	}

	data = data.slice(0, diskLen);

	while (data.length % 2 === 0) {
		const arr = data.split('');
		const newArr: string[] = [];
		for (let i = 0; i < data.length; i += 2) {
			arr[i] === arr[i + 1] ? newArr.push('1') : newArr.push('0');
		}
		data = newArr.join('');
	}
	return data;
};

const main = (input: string, diskLen: number): string => {
	const init = parseInput(input);
	return findChecksum(init, diskLen);
};

export default function (
	input: string,
	title: string,
	diskLen: number,
): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, diskLen);
	console.timeEnd('Time elapsed');
	return result;
}
