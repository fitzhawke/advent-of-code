import { describe, it, expect } from 'vitest';
import { promises } from 'fs';
import { resolve } from 'path';
import part1 from './part1.ts';
import part2 from './part2.ts';

const title = 'Plutonian Pebbles';
const year = '2024';
const day = '11';

const fullTitle = `${year} Day ${day} - ${title}`;
const path = `${year}/day${day}`;

const answers = {
	ae: 55312,
	ai: 183620,
	bi: 220377651399268,
};

let input = promises.readFile(
	resolve(process.cwd(), path, 'input.txt'),
	'utf8',
);
let example = promises.readFile(
	resolve(process.cwd(), path, 'example.txt'),
	'utf8',
);

describe(`${year}-day${day}-Part 1`, () => {
	it('should produce the correct value for example', async () => {
		expect(part1(await example, fullTitle)).toEqual(answers.ae);
	});
	it('should produce the correct value for input', async () => {
		expect(part1(await input, fullTitle)).toEqual(answers.ai);
	});
});

describe(`${year}-day${day}-Part 2`, () => {
	it('should produce the correct value for input', async () => {
		expect(part2(await input, fullTitle)).toEqual(answers.bi);
	});
});
