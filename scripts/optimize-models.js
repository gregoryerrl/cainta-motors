#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const models = [
	{ input: 'static/honda_city_rs.glb', output: 'static/honda_city_rs_optimized.glb' },
	{
		input: 'static/mercedes-benz_maybach_2022.glb',
		output: 'static/mercedes-benz_maybach_2022_optimized.glb'
	},
	{ input: 'static/mazda-3.glb', output: 'static/mazda-3_optimized.glb' }
];

async function optimizeModel(input, output) {
	console.log(`🔧 Optimizing ${input}...`);

	try {
		// Check original file size
		const stats = await fs.stat(input);
		const originalSize = (stats.size / 1024 / 1024).toFixed(2);
		console.log(`  Original size: ${originalSize} MB`);

		// Run optimization with Draco compression (simplified command)
		const command = `npx gltf-transform draco ${input} ${output}`;
		const { stdout, stderr } = await execAsync(command);
		if (stderr) console.log(`  Warning: ${stderr}`);

		// Check optimized file size
		const optimizedStats = await fs.stat(output);
		const optimizedSize = (optimizedStats.size / 1024 / 1024).toFixed(2);
		const reduction = ((1 - optimizedStats.size / stats.size) * 100).toFixed(1);

		console.log(`  ✅ Optimized size: ${optimizedSize} MB (${reduction}% reduction)`);

		return { success: true, reduction };
	} catch (error) {
		console.error(`  ❌ Error optimizing ${input}:`, error.message);
		return { success: false, error: error.message };
	}
}

async function main() {
	console.log('🚀 Starting 3D model optimization...\n');

	const results = [];

	for (const model of models) {
		const result = await optimizeModel(model.input, model.output);
		results.push({ ...model, ...result });
	}

	console.log('\n📊 Optimization Summary:');
	console.log('========================');

	results.forEach((result) => {
		if (result.success) {
			console.log(`✅ ${path.basename(result.input)}: ${result.reduction}% size reduction`);
		} else {
			console.log(`❌ ${path.basename(result.input)}: Failed to optimize`);
		}
	});
}

main().catch(console.error);
