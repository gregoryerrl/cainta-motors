#!/usr/bin/env node

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const imageDirectories = [
	'static/honda',
	'static/maybach', 
	'static/mazda',
	'static/vios'
];

const supportedFormats = ['.jpg', '.jpeg', '.png'];

async function convertToWebP(inputPath, outputPath) {
	console.log(`🔧 Converting ${inputPath} to WebP...`);
	
	try {
		// Check original file size
		const stats = await fs.stat(inputPath);
		const originalSize = (stats.size / 1024).toFixed(2);
		console.log(`  Original size: ${originalSize} KB`);
		
		// Convert to WebP with high quality
		const command = `npx @squoosh/cli --webp '{"quality":85,"target_size":0,"target_PSNR":0,"method":4,"sns_strength":50,"filter_strength":60,"filter_sharpness":0,"filter_type":1,"partitions":0,"segments":4,"pass":1,"show_compressed":0,"preprocessing":0,"autofilter":0,"partition_limit":0,"alpha_compression":1,"alpha_filtering":1,"alpha_quality":100,"lossless":0,"exact":0,"image_hint":0,"emulate_jpeg_size":0,"thread_level":0,"low_memory":0,"near_lossless":100,"use_delta_palette":0,"use_sharp_yuv":0}' "${inputPath}" -d "${path.dirname(outputPath)}"`;
		
		const { stdout, stderr } = await execAsync(command);
		if (stderr) console.log(`  Warning: ${stderr}`);
		
		// Check converted file size
		try {
			const convertedStats = await fs.stat(outputPath);
			const convertedSize = (convertedStats.size / 1024).toFixed(2);
			const reduction = ((1 - convertedStats.size / stats.size) * 100).toFixed(1);
			
			console.log(`  ✅ WebP size: ${convertedSize} KB (${reduction}% reduction)`);
			return { success: true, reduction };
		} catch {
			console.log(`  ✅ Converted to WebP (size check failed)`);
			return { success: true, reduction: 'unknown' };
		}
		
	} catch (error) {
		console.error(`  ❌ Error converting ${inputPath}:`, error.message);
		return { success: false, error: error.message };
	}
}

async function processDirectory(dirPath) {
	try {
		const files = await fs.readdir(dirPath);
		const imageFiles = files.filter(file => 
			supportedFormats.some(format => file.toLowerCase().endsWith(format))
		);
		
		console.log(`\n📁 Processing directory: ${dirPath}`);
		console.log(`   Found ${imageFiles.length} images`);
		
		const results = [];
		
		for (const file of imageFiles) {
			const inputPath = path.join(dirPath, file);
			const name = path.parse(file).name;
			const outputPath = path.join(dirPath, `${name}.webp`);
			
			// Skip if WebP version already exists
			try {
				await fs.access(outputPath);
				console.log(`  ⏭️  ${file} -> WebP already exists`);
				continue;
			} catch {
				// File doesn't exist, proceed with conversion
			}
			
			const result = await convertToWebP(inputPath, outputPath);
			results.push({ file, ...result });
		}
		
		return results;
	} catch (error) {
		console.error(`❌ Error processing directory ${dirPath}:`, error.message);
		return [];
	}
}

async function main() {
	console.log('🚀 Starting image optimization to WebP...\n');
	
	const allResults = [];
	
	for (const dir of imageDirectories) {
		const results = await processDirectory(dir);
		allResults.push(...results);
	}
	
	console.log('\n📊 Optimization Summary:');
	console.log('========================');
	
	const successful = allResults.filter(r => r.success);
	const failed = allResults.filter(r => !r.success);
	
	console.log(`✅ Successfully converted: ${successful.length} images`);
	console.log(`❌ Failed conversions: ${failed.length} images`);
	
	if (successful.length > 0) {
		const avgReduction = successful
			.filter(r => r.reduction !== 'unknown')
			.reduce((sum, r) => sum + parseFloat(r.reduction), 0) / successful.length;
		console.log(`📈 Average size reduction: ${avgReduction.toFixed(1)}%`);
	}
}

main().catch(console.error);