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
	let hasInitialLoad = $state(false);

	// Quick initial check - if no assets registered within 100ms, skip loading screen
	setTimeout(() => {
		if (Object.keys(assets).length === 0) {
			console.log('⚡ No assets to load, skipping loading screen');
			isGlobalLoading = false;
			globalProgress = 100;
			hasInitialLoad = true;
		}
	}, 100);

	// Fallback timeout - force completion after 5 seconds (reduced from 10)
	setTimeout(() => {
		if (isGlobalLoading) {
			console.log('⚠️ Loading timeout - forcing completion');
			const assetList = Object.values(assets);
			assetList.forEach((asset) => {
				if (asset.status === 'pending' || asset.status === 'loading') {
					console.log('⚠️ Marking slow asset as loaded:', asset.id);
					assets[asset.id] = { ...asset, status: 'loaded' };
				}
			});
			updateGlobalState();
		}
	}, 5000);

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

		if (assetList.length === 0 && hasInitialLoad) {
			isGlobalLoading = false;
			globalProgress = 100;
			return;
		}

		const loadedCount = assetList.filter((asset) => asset.status === 'loaded').length;
		const errorCount = assetList.filter((asset) => asset.status === 'error').length;
		const totalAssets = assetList.length;

		// Calculate progress (loaded + errors count as "complete")
		globalProgress =
			totalAssets > 0 ? Math.round(((loadedCount + errorCount) / totalAssets) * 100) : 0;

		// Loading complete when all assets are loaded/errored
		isGlobalLoading = globalProgress < 100;

		console.log('🔄 Global state:', {
			totalAssets,
			loadedCount,
			errorCount,
			globalProgress,
			isGlobalLoading
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
