import { convert, convertTemperature } from '../converter.js';

const EPSILON = 1e-9;

const lengthFactors = {
	mm: 0.001,
	cm: 0.01,
	m: 1,
	km: 1000,
	in: 0.0254,
	ft: 0.3048,
	yd: 0.9144,
	mi: 1609.34,
};

const weightFactors = {
	mg: 0.001,
	g: 1,
	kg: 1000,
	oz: 28.3495,
	lb: 453.592,
};

const temperatureUnits = ['C', 'F', 'K'];

function almostEqual(actual, expected, epsilon = EPSILON) {
	return Math.abs(actual - expected) <= epsilon;
}

function expectedFactorConversion(value, fromUnit, toUnit, factors) {
	const valueInBase = value * factors[fromUnit];
	return valueInBase / factors[toUnit];
}

function expectedTemperatureConversion(value, fromUnit, toUnit) {
	if (fromUnit === toUnit) {
		return value;
	}

	if (fromUnit === 'C') {
		if (toUnit === 'F') return value * 9 / 5 + 32;
		if (toUnit === 'K') return value + 273.15;
	}

	if (fromUnit === 'F') {
		if (toUnit === 'C') return (value - 32) * 5 / 9;
		if (toUnit === 'K') return (value - 32) * 5 / 9 + 273.15;
	}

	if (fromUnit === 'K') {
		if (toUnit === 'C') return value - 273.15;
		if (toUnit === 'F') return (value - 273.15) * 9 / 5 + 32;
	}

	throw new Error(`Unsupported temperature conversion: ${fromUnit} -> ${toUnit}`);
}

function runCategoryTests(categoryName, units, value, converterFn, expectedFn) {
	let passed = 0;
	let failed = 0;

	console.log(`\n=== ${categoryName} ===`);

	for (const fromUnit of units) {
		for (const toUnit of units) {
			const actual = converterFn(value, fromUnit, toUnit);
			const expected = expectedFn(value, fromUnit, toUnit);
			const ok = almostEqual(actual, expected);

			if (ok) {
				passed += 1;
				console.log(`PASS ${categoryName}: ${value} ${fromUnit} -> ${toUnit} = ${actual}`);
			} else {
				failed += 1;
				console.log(`FAIL ${categoryName}: ${value} ${fromUnit} -> ${toUnit} | expected ${expected}, got ${actual}`);
			}
		}
	}

	return { passed, failed };
}

const results = [];

results.push(
	runCategoryTests(
		'Length',
		Object.keys(lengthFactors),
		123.45,
		convert,
		(value, fromUnit, toUnit) => expectedFactorConversion(value, fromUnit, toUnit, lengthFactors),
	),
);

results.push(
	runCategoryTests(
		'Weight',
		Object.keys(weightFactors),
		987.65,
		convert,
		(value, fromUnit, toUnit) => expectedFactorConversion(value, fromUnit, toUnit, weightFactors),
	),
);

results.push(
	runCategoryTests(
		'Temperature',
		temperatureUnits,
		42,
		convertTemperature,
		expectedTemperatureConversion,
	),
);

const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
const totalFailed = results.reduce((sum, result) => sum + result.failed, 0);

console.log('\n=== Summary ===');
console.log(`Passed: ${totalPassed}`);
console.log(`Failed: ${totalFailed}`);
console.log(`Total: ${totalPassed + totalFailed}`);

if (totalFailed > 0) {
	process.exitCode = 1;
}
