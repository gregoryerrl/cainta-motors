<script lang="ts">
	import { T } from '@threlte/core';
	import { GLTF } from '@threlte/extras';
	
	let { selectedColor = '#0000FF' }: { selectedColor?: string } = $props();
	
	let gltf: any = $state();
	
	function handleLoad(event: any) {
		gltf = event.detail;
		console.log('Car1 loaded, materials:', Object.keys(gltf.materials || {}));
	}
</script>

{#if gltf}
	<T.Group position={[0, -0.01, 0]} rotation={[3.13, 0, Math.PI]}>
		<!-- Main car body with color change -->
		<T.Mesh 
			geometry={gltf.nodes.Object_4?.geometry}
			material={gltf.materials.Main_Paint}
			material.color={selectedColor}
		/>
		
		<!-- Other parts that don't change color -->
		<T.Mesh geometry={gltf.nodes.Object_5?.geometry} material={gltf.materials.Black} />
		<T.Mesh geometry={gltf.nodes.Object_6?.geometry} material={gltf.materials.Black} />
		<T.Mesh geometry={gltf.nodes.Object_7?.geometry} material={gltf.materials.Chrome} />
		<T.Mesh geometry={gltf.nodes.Object_8?.geometry} material={gltf.materials.Tail_Lights} />
		<T.Mesh geometry={gltf.nodes.Object_9?.geometry} material={gltf.materials.Glass} />
		<T.Mesh geometry={gltf.nodes.Object_10?.geometry} material={gltf.materials.Globes} />
		<T.Mesh geometry={gltf.nodes.Object_11?.geometry} material={gltf.materials.Mirrors} />
		<T.Mesh geometry={gltf.nodes.Object_12?.geometry} material={gltf.materials.material} />
		<T.Mesh geometry={gltf.nodes.Object_13?.geometry} material={gltf.materials.Gold} />
	</T.Group>
	
	<T.Group position={[0, 0.05, -0.08]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.61, 0.65, 0.65]}>
		<T.Mesh geometry={gltf.nodes.Object_15?.geometry} material={gltf.materials.Chrome} />
		<T.Mesh geometry={gltf.nodes.Object_16?.geometry} material={gltf.materials.Gold} />
	</T.Group>
	
	<T.Mesh 
		geometry={gltf.nodes.Object_18?.geometry} 
		material={gltf.materials.Rims}
		position={[0, 0.05, 0.02]} 
		scale={[0.61, 0.65, 0.65]} 
	/>
	
	<T.Mesh 
		geometry={gltf.nodes.Object_20?.geometry} 
		material={gltf.materials.Tyres}
		position={[0, 0.05, 0.02]} 
		scale={[0.61, 0.65, 0.65]} 
	/>
{/if}

<!-- Load the GLTF model -->
<GLTF url="/car1/car1.gltf" on:load={handleLoad} />