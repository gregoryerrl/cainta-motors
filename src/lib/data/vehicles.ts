export interface Vehicle {
	id: string;
	slug: string;
	brand: string;
	model: string;
	variant: string;
	price: number;
	year: number;
	category: 'sedan' | 'suv' | 'hatchback' | 'sports' | 'luxury';
	image: string;
	images: string[];
	modelPath?: string;
	modelScale?: number;
	modelPosition?: [number, number, number];
	modelTarget?: [number, number, number];
	has3DModel?: boolean;
	supportsColorChange?: boolean;
	features: string[];
	specifications: {
		engine: string;
		power: string;
		torque: string;
		transmission: string;
		drivetrain: string;
		fuelType: string;
		fuelCapacity: string;
		seatingCapacity: number;
		dimensions: {
			length: string;
			width: string;
			height: string;
			wheelbase: string;
		};
	};
	colors: {
		name: string;
		hex: string;
	}[];
}

export const vehicles: Vehicle[] = [
	{
		id: '1',
		slug: 'honda-city-rs',
		brand: 'Honda',
		model: 'City',
		variant: 'RS',
		price: 1115000,
		year: 2024,
		category: 'sedan',
		image: '/honda/honda_front.jpg',
		images: [
			'/honda/honda1.jpg',
			'/honda/honda2.jpg',
			'/honda/honda3.jpg',
			'/honda/honda4.jpg',
			'/honda/honda5.jpg'
		],
		has3DModel: false,
		supportsColorChange: false,
		features: [
			'Honda SENSING',
			'LED Headlights with DRL',
			'Smart Entry with Push Start',
			'7" Display Audio with Apple CarPlay',
			'Paddle Shifters',
			'Remote Engine Start',
			'Leather Seats',
			'Sunroof'
		],
		specifications: {
			engine: '1.5L DOHC i-VTEC',
			power: '121 PS @ 6,600 rpm',
			torque: '145 Nm @ 4,300 rpm',
			transmission: 'CVT',
			drivetrain: 'FWD',
			fuelType: 'Gasoline',
			fuelCapacity: '40L',
			seatingCapacity: 5,
			dimensions: {
				length: '4,553 mm',
				width: '1,748 mm',
				height: '1,467 mm',
				wheelbase: '2,600 mm'
			}
		},
		colors: [
			{ name: 'Platinum White Pearl', hex: '#f8f8f8' },
			{ name: 'Lunar Silver Metallic', hex: '#c0c0c0' },
			{ name: 'Modern Steel Metallic', hex: '#4a4a4a' },
			{ name: 'Crystal Black Pearl', hex: '#000000' },
			{ name: 'Ignite Red Metallic', hex: '#cc0000' }
		]
	},
	{
		id: '2',
		slug: 'toyota-vios-gr-s',
		brand: 'Toyota',
		model: 'Vios',
		variant: 'GR-S',
		price: 1075000,
		year: 2024,
		category: 'sedan',
		image: '/vios/vios1.jpg',
		images: ['/vios/vios2.jpg'],
		has3DModel: false,
		supportsColorChange: false,
		features: [
			'Toyota Safety Sense',
			'LED Headlights',
			'Push Start System',
			'9" Touchscreen Display'
		],
		specifications: {
			engine: '1.5L Dual VVT-i',
			power: '107 PS @ 6,000 rpm',
			torque: '140 Nm @ 4,200 rpm',
			transmission: 'CVT',
			drivetrain: 'FWD',
			fuelType: 'Gasoline',
			fuelCapacity: '42L',
			seatingCapacity: 5,
			dimensions: {
				length: '4,425 mm',
				width: '1,730 mm',
				height: '1,475 mm',
				wheelbase: '2,550 mm'
			}
		},
		colors: [
			{ name: 'Super White', hex: '#ffffff' },
			{ name: 'Attitude Black', hex: '#000000' },
			{ name: 'Red Mica Metallic', hex: '#b30000' }
		]
	},
	{
		id: '3',
		slug: 'mazda-3-premium',
		brand: 'Mazda',
		model: '3',
		variant: 'Premium',
		price: 1498000,
		year: 2024,
		category: 'sedan',
		image: '/mazda/mazda1.jpg',
		images: ['/mazda/mazda2.jpg'],
		modelPath: '/gltf/mazda-3/scene.gltf',
		modelScale: 0.02,
		modelPosition: [4, 2, 4] as [number, number, number],
		modelTarget: [0, 0, 0] as [number, number, number],
		has3DModel: true,
		supportsColorChange: true,
		features: [
			'i-Activsense Safety Features',
			'Bose Premium Audio',
			'Mazda Connect Infotainment',
			'Adaptive LED Headlights'
		],
		specifications: {
			engine: '2.0L SkyActiv-G',
			power: '153 PS @ 6,000 rpm',
			torque: '200 Nm @ 4,000 rpm',
			transmission: '6-Speed Automatic',
			drivetrain: 'FWD',
			fuelType: 'Gasoline',
			fuelCapacity: '51L',
			seatingCapacity: 5,
			dimensions: {
				length: '4,460 mm',
				width: '1,795 mm',
				height: '1,435 mm',
				wheelbase: '2,725 mm'
			}
		},
		colors: [
			{ name: 'Soul Red Crystal', hex: '#b91c1c' },
			{ name: 'Machine Grey', hex: '#6b7280' },
			{ name: 'Snowflake White Pearl', hex: '#fafafa' }
		]
	},
	{
		id: '4',
		slug: 'mercedes-benz-maybach-s-class',
		brand: 'Mercedes-Benz',
		model: 'Maybach S-Class',
		variant: 'S 580 4MATIC',
		price: 12500000,
		year: 2022,
		category: 'luxury',
		image: '/maybach/maybach1.jpg',
		images: ['/maybach/maybach1.jpg', '/maybach/maybach2.jpg'],
		modelPath: '/gltf/mercedes-benz_maybach_2022/scene.gltf',
		modelScale: 0.5,
		modelPosition: [4, 2, 4] as [number, number, number],
		modelTarget: [0, 0, 0] as [number, number, number],
		has3DModel: true,
		supportsColorChange: true,
		features: [
			'MBUX Rear Tablet',
			'Executive Rear Seat Package Plus',
			'Burmester 4D Surround Sound System',
			'MAGIC BODY CONTROL with ROAD SURFACE SCAN',
			'Multibeam LED Headlights',
			'Active Ambient Lighting',
			'Refrigerated Compartment',
			'Massage Seats with Hot Stone Function',
			'Electronic Rear Doors',
			'First-Class Rear Suite'
		],
		specifications: {
			engine: '4.0L V8 Biturbo',
			power: '496 HP @ 5,500 rpm',
			torque: '700 Nm @ 2,000-4,500 rpm',
			transmission: '9G-TRONIC Automatic',
			drivetrain: '4MATIC AWD',
			fuelType: 'Premium Gasoline',
			fuelCapacity: '76L',
			seatingCapacity: 4,
			dimensions: {
				length: '5,469 mm',
				width: '1,921 mm',
				height: '1,510 mm',
				wheelbase: '3,396 mm'
			}
		},
		colors: [
			{ name: 'Obsidian Black Metallic', hex: '#0a0a0a' },
			{ name: 'Designo Diamond White', hex: '#f5f5f5' },
			{ name: 'Selenite Grey Metallic', hex: '#3c3c3c' },
			{ name: 'Designo Hyacinth Red Metallic', hex: '#5c1e1e' },
			{ name: 'Onyx Black', hex: '#000000' }
		]
	}
];
