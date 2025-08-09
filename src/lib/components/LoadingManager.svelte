<script lang="ts">
	import { setContext } from 'svelte';

	// Asset loading states
	type AssetStatus = 'pending' | 'loading' | 'loaded' | 'error';

	interface Asset {
		id: string;
		status: AssetStatus;
		progress?: number;
	}

	// Central loading state management
	let assets = $state<Record<string, Asset>>({});
	let isGlobalLoading = $state(true);
	let globalProgress = $state(0);
	let minLoadingTime = $state(false);

	// Set minimum loading time to prevent flash
	setTimeout(() => {
		console.log('⏰ Minimum loading time elapsed');
		minLoadingTime = true;
		updateGlobalState();
	}, 1000);

	// Fallback timeout - force completion after 10 seconds
	setTimeout(() => {
		console.log('🚨 Fallback timeout - forcing completion');
		const assetList = Object.values(assets);
		assetList.forEach(asset => {
			if (asset.status === 'pending' || asset.status === 'loading') {
				console.log('🚨 Forcing asset to complete:', asset.id);
				assets[asset.id] = { ...asset, status: 'loaded' };
			}
		});
		updateGlobalState();
	}, 10000);

	// Register an asset for tracking
	function registerAsset(id: string): void {
		assets[id] = { id, status: 'pending' };
		console.log('🔄 Asset registered:', id, assets);
		updateGlobalState();
	}

	// Update asset status
	function updateAsset(id: string, status: AssetStatus, progress?: number): void {
		if (assets[id]) {
			assets[id] = { ...assets[id], status, progress };
			console.log('🔄 Asset updated:', id, status, assets);
			updateGlobalState();
		}
	}

	// Calculate global loading state
	function updateGlobalState(): void {
		const assetList = Object.values(assets);

		if (assetList.length === 0) {
			isGlobalLoading = false;
			globalProgress = 100;
			return;
		}

		const loadedCount = assetList.filter((asset) => asset.status === 'loaded').length;
		const errorCount = assetList.filter((asset) => asset.status === 'error').length;
		const totalAssets = assetList.length;

		// Calculate progress (loaded + errors count as "complete")
		globalProgress = Math.round(((loadedCount + errorCount) / totalAssets) * 100);

		// All assets loaded/errored and minimum time elapsed
		isGlobalLoading = !(globalProgress === 100 && minLoadingTime);
		
		console.log('🔄 Global state:', {
			totalAssets,
			loadedCount,
			errorCount,
			globalProgress,
			minLoadingTime,
			isGlobalLoading,
			assets: assetList
		});
	}

	// Create context for child components
	const loadingContext = {
		registerAsset,
		updateAsset,
		assets: () => assets,
		isLoading: () => isGlobalLoading,
		progress: () => globalProgress
	};

	setContext('loading', loadingContext);

	let { children } = $props();
</script>

{@render children?.()}
