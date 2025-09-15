export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  color: string; // For the colored box simulation
}

export const products: Product[] = [
  {
    id: "1",
    slug: "wireless-bluetooth-headphones",
    name: "Premium Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    longDescription:
      "Experience premium sound quality with our latest wireless Bluetooth headphones featuring advanced noise cancellation technology, comfortable over-ear design, and up to 30 hours of battery life. Perfect for music lovers, gamers, and professionals who demand the best audio experience.",
    price: 299.99,
    originalPrice: 399.99,
    category: "Electronics",
    tags: ["wireless", "bluetooth", "noise-cancellation", "premium"],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Quick charge (15 min = 3 hours)",
      "Premium leather cushions",
      "Foldable design",
      "Built-in microphone",
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32Ω",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "290g",
    },
    inStock: true,
    rating: 4.8,
    reviewCount: 1247,
    color: "#3B82F6", // Blue
  },
  {
    id: "2",
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    description: "Adjustable ergonomic chair for maximum comfort",
    longDescription:
      "Transform your workspace with our premium ergonomic office chair designed for maximum comfort and productivity. Features adjustable height, lumbar support, breathable mesh back, and premium materials that will keep you comfortable throughout your workday.",
    price: 499.99,
    category: "Furniture",
    tags: ["ergonomic", "adjustable", "office", "comfort"],
    features: [
      "Adjustable height and tilt",
      "Lumbar support",
      "Breathable mesh back",
      "360° swivel",
      "Premium foam cushions",
      "5-star base with casters",
    ],
    specifications: {
      "Seat Height": "17-21 inches",
      "Seat Width": "20 inches",
      "Seat Depth": "18 inches",
      "Back Height": "26 inches",
      "Weight Capacity": "300 lbs",
      Material: "Mesh, Foam, Metal",
    },
    inStock: true,
    rating: 4.6,
    reviewCount: 856,
    color: "#10B981", // Green
  },
  {
    id: "3",
    slug: "smart-fitness-tracker",
    name: "Smart Fitness Tracker",
    description: "Advanced fitness tracking with heart rate monitoring",
    longDescription:
      "Stay on top of your fitness goals with our advanced smart fitness tracker. Monitor your heart rate 24/7, track your steps, calories burned, sleep quality, and receive personalized workout recommendations. Water-resistant design perfect for all activities.",
    price: 199.99,
    originalPrice: 249.99,
    category: "Wearables",
    tags: ["fitness", "health", "smartwatch", "heart-rate"],
    features: [
      "24/7 Heart Rate Monitoring",
      "Sleep Tracking",
      "GPS Tracking",
      "Water Resistant (50m)",
      "7-day battery life",
      "Customizable watch faces",
    ],
    specifications: {
      Display: '1.4" AMOLED',
      "Battery Life": "7 days",
      "Water Resistance": "50 meters",
      Sensors: "Heart Rate, GPS, Accelerometer",
      Compatibility: "iOS & Android",
      Weight: "45g",
    },
    inStock: false,
    rating: 4.4,
    reviewCount: 2156,
    color: "#F59E0B", // Orange
  },
  {
    id: "4",
    slug: "professional-coffee-maker",
    name: "Professional Coffee Maker",
    description: "Commercial-grade coffee maker for home use",
    longDescription:
      "Brew barista-quality coffee at home with our professional coffee maker. Features programmable brewing, thermal carafe to keep coffee hot, burr grinder, and customizable strength settings. Perfect for coffee enthusiasts who demand the perfect cup every time.",
    price: 349.99,
    category: "Appliances",
    tags: ["coffee", "brewer", "professional", "thermal"],
    features: [
      "12-cup capacity",
      "Thermal carafe",
      "Programmable timer",
      "Built-in burr grinder",
      "Multiple brew strengths",
      "Auto shut-off",
    ],
    specifications: {
      Capacity: "12 cups",
      Material: "Stainless Steel",
      Power: "1200W",
      Dimensions: '14" x 9" x 15"',
      Weight: "12 lbs",
      Warranty: "2 years",
    },
    inStock: true,
    rating: 4.7,
    reviewCount: 932,
    color: "#8B5CF6", // Purple
  },
];

export function getRandomProduct(): Product {
  const randomIndex = Math.floor(Math.random() * products.length);
  return products[randomIndex];
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
