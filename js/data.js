export const seedProducts = [
  {
    id: "p001",
    title: "Wool Blend Overcoat",
    brand: "Studio Noir",
    category: "Apparel",
    subcategory: "Outerwear",
    price: 298,
    compareAt: 420,
    rating: 4.8,
    reviewsCount: 124,
    inventory: 32,
    inStock: true,
    featured: true,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Camel", hex: "#C19A6B", imageIndex: 0 },
      { name: "Charcoal", hex: "#2B2B2B", imageIndex: 1 },
      { name: "Bone", hex: "#E8E0D9", imageIndex: 2 }
    ],
    sizes: ["XS","S","M","L","XL"],
    description: "A structured overcoat cut from a premium wool-blend with a soft hand-feel. Fully canvassed, unlined sleeves for ease, and horn buttons. Designed to age beautifully.",
    features: ["Italian wool blend (70% wool, 30% cashmere touch)", "Full canvas construction", "Two internal pockets", "Dry clean only"],
    specs: { Material: "Wool Blend", Weight: "1.4kg", Origin: "Portugal" },
    reviews: [
      { id: "r1", name: "Alex M.", rating: 5, date: "2026-02-14", text: "The drape is perfect. Feels like a $800 coat. Wore it in 2°C and stayed warm.", verified: true },
      { id: "r2", name: "Sana K.", rating: 5, date: "2026-01-28", text: "Camel color is exactly as pictured. Tailoring is impeccable.", verified: true }
    ]
  },
  {
    id: "p002",
    title: "Heavyweight Cotton Tee",
    brand: "SELLIFY Basics",
    category: "Apparel",
    subcategory: "Tops",
    price: 48,
    compareAt: 65,
    rating: 4.7,
    reviewsCount: 342,
    inventory: 120,
    inStock: true,
    featured: true,
    badge: "Essential",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Off White", hex: "#F5F3F0" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "Clay", hex: "#B66A50" }
    ],
    sizes: ["S","M","L","XL"],
    description: "Our signature 280gsm heavyweight tee. Garment-dyed, pre-shrunk, and cut with a slightly boxy fit that gets better with every wash.",
    features: ["280gsm organic cotton", "Garment dyed", "Reinforced neck rib", "Made in small batches"],
    specs: { Material: "100% Organic Cotton", Fit: "Boxy", Origin: "India" },
    reviews: [
      { id: "r3", name: "Jordan L.", rating: 5, date: "2026-03-02", text: "Best tee I own. Thick but breathable.", verified: true }
    ]
  },
  {
    id: "p003",
    title: "Relaxed Selvedge Denim",
    brand: "Blue Note",
    category: "Apparel",
    subcategory: "Bottoms",
    price: 168,
    compareAt: null,
    rating: 4.9,
    reviewsCount: 89,
    inventory: 45,
    inStock: true,
    featured: false,
    badge: "New",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [{ name: "Indigo Rinse", hex: "#2E3A59" }],
    sizes: ["28","30","32","34","36"],
    description: "14oz Japanese selvedge with a relaxed straight leg. Fades to your life.",
    features: ["Kaijima mills selvedge", "Chain-stitched hem", "Button fly"],
    specs: { Material: "100% Cotton", Weight: "14oz", Origin: "Japan" },
    reviews: []
  },
  {
    id: "p004",
    title: "Cashmere Mock Neck",
    brand: "Studio Noir",
    category: "Apparel",
    subcategory: "Knitwear",
    price: 225,
    compareAt: 310,
    rating: 4.8,
    reviewsCount: 56,
    inventory: 28,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Heather Grey", hex: "#9E9E9E" },
      { name: "Ink", hex: "#1A2B4C" }
    ],
    sizes: ["S","M","L"],
    description: "Grade-A Mongolian cashmere with a refined mock neck. Brushed interior for warmth without bulk.",
    features: ["2-ply cashmere", "Ribbed cuffs", "Hand wash cold"],
    specs: { Material: "100% Cashmere", Ply: "2-ply", Origin: "Mongolia" },
    reviews: []
  },
  {
    id: "p005",
    title: "Technical Cargo Pants",
    brand: "AER System",
    category: "Apparel",
    subcategory: "Bottoms",
    price: 145,
    compareAt: null,
    rating: 4.6,
    reviewsCount: 73,
    inventory: 60,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1624379019100-1a1c28b91c6f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584093420058-8f2a3363f9da?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Olive", hex: "#5A5A40" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["S","M","L","XL"],
    description: "Water-repellent cargo with articulated knees and magnetic closures. Built for city and trail.",
    features: ["DWR finish", "8 pockets", "4-way stretch"],
    specs: { Material: "Nylon / Elastane", Waterproof: "DWR", Origin: "Vietnam" },
    reviews: []
  },
  {
    id: "p006",
    title: "Silk Slip Dress",
    brand: "Atelier Moi",
    category: "Apparel",
    subcategory: "Dresses",
    price: 210,
    compareAt: 285,
    rating: 4.9,
    reviewsCount: 102,
    inventory: 18,
    inStock: true,
    featured: true,
    badge: "Editor's Pick",
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: " Noir", hex: "#0A0A0A" },
      { name: " Champagne", hex: "#E8D5B7" }
    ],
    sizes: ["XS","S","M","L"],
    description: "Bias-cut 19mm silk charmeuse that skims, not clings. Finished with French seams.",
    features: ["19mm silk", "Bias cut", "Adjustable straps"],
    specs: { Material: "100% Silk", Cut: "Bias", Origin: "Italy" },
    reviews: []
  },
  {
    id: "p007",
    title: "Studio Pro Headphones",
    brand: "Aural",
    category: "Electronics",
    subcategory: "Audio",
    price: 349,
    compareAt: 429,
    rating: 4.8,
    reviewsCount: 412,
    inventory: 85,
    inStock: true,
    featured: true,
    badge: "Hi-Fi",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Silver", hex: "#C0C0C0" },
      { name: "Midnight", hex: "#1C1C1E" }
    ],
    sizes: ["One Size"],
    description: "Planar magnetic drivers, 40h battery, and adaptive ANC. Tuned in Berlin, built to disappear.",
    features: ["Planar magnetic", "Adaptive ANC", "Multipoint Bluetooth 5.3", "40h battery"],
    specs: { Driver: "90mm Planar", Battery: "40h", Weight: "254g", Connectivity: "BT 5.3 / USB-C" },
    reviews: [
      { id: "r10", name: "Priya R.", rating: 5, date: "2026-02-20", text: "Soundstage is insane for closed-backs. ANC is whisper quiet.", verified: true },
      { id: "r11", name: "Mark T.", rating: 4, date: "2026-02-10", text: "Super comfortable for long sessions. App could be better.", verified: true }
    ]
  },
  {
    id: "p008",
    title: "AirBook Pro 14\"",
    brand: "Aural",
    category: "Electronics",
    subcategory: "Computers",
    price: 1299,
    compareAt: 1499,
    rating: 4.9,
    reviewsCount: 298,
    inventory: 22,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Space Grey", hex: "#5A5A5A" },
      { name: "Starlight", hex: "#E8E0D9" }
    ],
    sizes: ["14\" 16/512", "14\" 32/1TB"],
    description: "Fanless 14-inch with M-class efficiency, Liquid Retina XDR, and 22h battery. For creators who move.",
    features: ["XDR Display 120Hz", "22h battery", "3x Thunderbolt", "Recycled aluminum"],
    specs: { Display: "14.2\" XDR", Chip: "Aero M2 Pro", RAM: "16GB / 32GB", Storage: "512GB - 1TB" },
    reviews: []
  },
  {
    id: "p009",
    title: "Arc Speaker",
    brand: "Aural",
    category: "Electronics",
    subcategory: "Audio",
    price: 199,
    compareAt: null,
    rating: 4.7,
    reviewsCount: 156,
    inventory: 64,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand", hex: "#D9C5B2" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "360° sound in a ceramic shell. 12h battery, IP67, and room calibration.",
    features: ["360° audio", "IP67", "Room EQ", "USB-C"],
    specs: { Battery: "12h", Waterproof: "IP67", Drivers: "2x 40mm" },
    reviews: []
  },
  {
    id: "p010",
    title: "Field Watch Titanium",
    brand: "HORO",
    category: "Electronics",
    subcategory: "Wearables",
    price: 420,
    compareAt: 520,
    rating: 4.8,
    reviewsCount: 203,
    inventory: 35,
    inStock: true,
    featured: true,
    badge: "Limited",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b2?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Titanium", hex: "#8A8D93" },
      { name: "Black DLC", hex: "#1C1C1E" }
    ],
    sizes: ["40mm", "42mm"],
    description: "Grade 5 titanium, sapphire crystal, 100m water resistance. Swiss movement, Japanese restraint.",
    features: ["Sapphire crystal", "100m WR", "Super-LumiNova", "2-year warranty"],
    specs: { Case: "40mm Ti", Movement: "Auto NH35", Crystal: "Sapphire" },
    reviews: []
  },
  {
    id: "p011",
    title: "Pocket Camera X2",
    brand: "LUMEN",
    category: "Electronics",
    subcategory: "Cameras",
    price: 599,
    compareAt: 699,
    rating: 4.7,
    reviewsCount: 88,
    inventory: 19,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1452780212940-6f5c84d7fa94?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [{ name: "Black", hex: "#0A0A0A" }],
    sizes: ["One Size"],
    description: "1-inch sensor, f/1.8 lens, and film simulations. Fits in your palm, shoots like a pro.",
    features: ["1\" sensor", "4K 60p", "Film sims", "USB-C charging"],
    specs: { Sensor: "1\" 20MP", Lens: "24mm f/1.8", Video: "4K60" },
    reviews: []
  },
  {
    id: "p012",
    title: "Wireless Charging Pad",
    brand: "Aural",
    category: "Electronics",
    subcategory: "Accessories",
    price: 45,
    compareAt: null,
    rating: 4.5,
    reviewsCount: 221,
    inventory: 150,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stone", hex: "#E8E0D9" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "Cork and aluminum Qi2 charger. 15W fast charge, anti-slip, and fully recyclable.",
    features: ["Qi2 15W", "Cork base", "Aluminum body"],
    specs: { Power: "15W", Standard: "Qi2", Material: "Alu + Cork" },
    reviews: []
  },
  {
    id: "p013",
    title: "Court Sneaker Low",
    brand: "SELLIFY Studio",
    category: "Footwear",
    subcategory: "Sneakers",
    price: 128,
    compareAt: 165,
    rating: 4.8,
    reviewsCount: 267,
    inventory: 90,
    inStock: true,
    featured: true,
    badge: "Bestseller",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "White / Gum", hex: "#F5F3F0" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["6","7","8","9","10","11"],
    description: "Italian leather court sneaker with margom sole. Hand-stitched, vegetable tanned.",
    features: ["Full-grain leather", "Margom sole", "Cork footbed"],
    specs: { Upper: "Italian Leather", Sole: "Margom", Origin: "Italy" },
    reviews: [
      { id: "r20", name: "Emily R.", rating: 5, date: "2026-03-10", text: "Goes with everything. Breaks in fast.", verified: true }
    ]
  },
  {
    id: "p014",
    title: "Suede Desert Boot",
    brand: "Blue Note",
    category: "Footwear",
    subcategory: "Boots",
    price: 195,
    compareAt: null,
    rating: 4.7,
    reviewsCount: 74,
    inventory: 40,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand", hex: "#C2B280" },
      { name: "Moss", hex: "#5A5A40" }
    ],
    sizes: ["7","8","9","10","11"],
    description: "Unlined suede desert boot with crepe sole. Soft, lightweight, built for travel.",
    features: ["Unlined suede", "Crepe sole", "Leather laces"],
    specs: { Material: "Suede", Sole: "Crepe", Origin: "Spain" },
    reviews: []
  },
  {
    id: "p015",
    title: "Trail Runner GTX",
    brand: "AER System",
    category: "Footwear",
    subcategory: "Performance",
    price: 165,
    compareAt: null,
    rating: 4.6,
    reviewsCount: 112,
    inventory: 55,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Stone / Orange", hex: "#E8E0D9" },
      { name: "Black / Volt", hex: "#0A0A0A" }
    ],
    sizes: ["7","8","9","10","11","12"],
    description: "GORE-TEX trail runner with Vibram outsole. For wet city runs and mountain escapes.",
    features: ["GORE-TEX", "Vibram Megagrip", "Reflective details"],
    specs: { Waterproof: "GORE-TEX", Sole: "Vibram", Weight: "310g" },
    reviews: []
  },
  {
    id: "p016",
    title: "Leather Tote Bag",
    brand: "Atelier Moi",
    category: "Accessories",
    subcategory: "Bags",
    price: 245,
    compareAt: 320,
    rating: 4.9,
    reviewsCount: 91,
    inventory: 30,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Cognac", hex: "#9A5C3D" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "Full-grain tote with laptop sleeve and hidden phone pocket. Ages with character.",
    features: ["Full-grain leather", "Laptop sleeve 14\"", "Brass hardware"],
    specs: { Leather: "Full-grain", Dimensions: "38x30x15cm", Origin: "Italy" },
    reviews: []
  },
  {
    id: "p017",
    title: "Merino Beanie",
    brand: "SELLIFY Basics",
    category: "Accessories",
    subcategory: "Headwear",
    price: 42,
    compareAt: null,
    rating: 4.7,
    reviewsCount: 134,
    inventory: 100,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532240839873-1d6a6e45c7b5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Charcoal", hex: "#2B2B2B" },
      { name: "Oatmeal", hex: "#E8E0D9" }
    ],
    sizes: ["One Size"],
    description: "Superfine merino beanie, double-layered for warmth without itch.",
    features: ["17.5 micron merino", "Double layer", "Unisex"],
    specs: { Material: "100% Merino", Gauge: "7gg", Origin: "Scotland" },
    reviews: []
  },
  {
    id: "p018",
    title: "Acetate Sunglasses",
    brand: "HORO",
    category: "Accessories",
    subcategory: "Eyewear",
    price: 165,
    compareAt: 210,
    rating: 4.6,
    reviewsCount: 67,
    inventory: 48,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Tortoise", hex: "#7A4A2E" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "Hand-polished acetate with polarized lenses and stainless steel hinges.",
    features: ["Polarized lenses", "UV400", "Hand-polished acetate"],
    specs: { Material: "Acetate", Lens: "Polarized", Origin: "Japan" },
    reviews: []
  },
  {
    id: "p019",
    title: "Leather Card Holder",
    brand: "Atelier Moi",
    category: "Accessories",
    subcategory: "Small Goods",
    price: 55,
    compareAt: null,
    rating: 4.8,
    reviewsCount: 201,
    inventory: 80,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Black", hex: "#0A0A0A" },
      { name: "Tan", hex: "#C19A6B" }
    ],
    sizes: ["One Size"],
    description: "Minimal card holder with 4 slots and central pocket. Vegetable-tanned, edge-painted.",
    features: ["4 card slots", "Veg-tan leather", "Edge painted"],
    specs: { Leather: "Veg-tan", Slots: "4 + 1", Origin: "Spain" },
    reviews: []
  },
  {
    id: "p020",
    title: "Stoneware Mug Set",
    brand: "Haus",
    category: "Home",
    subcategory: "Kitchen",
    price: 68,
    compareAt: null,
    rating: 4.8,
    reviewsCount: 89,
    inventory: 70,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Ivory", hex: "#F5F3F0" },
      { name: "Charcoal", hex: "#2B2B2B" }
    ],
    sizes: ["Set of 2"],
    description: "Matte stoneware mugs, wheel-thrown look, dishwasher safe. 350ml.",
    features: ["Matte glaze", "350ml", "Dishwasher safe"],
    specs: { Material: "Stoneware", Capacity: "350ml", Origin: "Portugal" },
    reviews: []
  },
  {
    id: "p021",
    title: "Linen Throw Blanket",
    brand: "Haus",
    category: "Home",
    subcategory: "Textiles",
    price: 145,
    compareAt: 190,
    rating: 4.7,
    reviewsCount: 52,
    inventory: 25,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Natural", hex: "#E8E0D9" },
      { name: "Sage", hex: "#9CAF88" }
    ],
    sizes: ["130x180cm"],
    description: "Heavyweight European linen throw, stonewashed for softness. Gets softer each wash.",
    features: ["100% European flax", "Stonewashed", "Pre-shrunk"],
    specs: { Material: "100% Linen", Weight: "350gsm", Origin: "Lithuania" },
    reviews: []
  },
  {
    id: "p022",
    title: "Aroma Diffuser",
    brand: "Haus",
    category: "Home",
    subcategory: "Wellness",
    price: 98,
    compareAt: null,
    rating: 4.6,
    reviewsCount: 103,
    inventory: 60,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1608571423902-eed4a94d8108?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608571423902-eed4a94d8108?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Sand", hex: "#D9C5B2" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "Ceramic ultrasonic diffuser with 8h runtime and soft glow. Whisper quiet.",
    features: ["8h runtime", "Auto shut-off", "Ceramic shell"],
    specs: { Capacity: "200ml", Runtime: "8h", Material: "Ceramic" },
    reviews: []
  },
  {
    id: "p023",
    title: "Oversized Hoodie",
    brand: "SELLIFY Basics",
    category: "Apparel",
    subcategory: "Tops",
    price: 88,
    compareAt: 120,
    rating: 4.7,
    reviewsCount: 178,
    inventory: 75,
    inStock: true,
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Heather Grey", hex: "#9E9E9E" },
      { name: "Black", hex: "#0A0A0A" },
      { name: "Faded Blue", hex: "#6B8CAE" }
    ],
    sizes: ["S","M","L","XL"],
    description: "500gsm loopback cotton, dropped shoulders, and a hood that actually stays up.",
    features: ["500gsm loopback", "Kangaroo pocket", "Garment washed"],
    specs: { Material: "Cotton Blend", Weight: "500gsm", Origin: "Portugal" },
    reviews: []
  },
  {
    id: "p024",
    title: "Modular Desk Lamp",
    brand: "Haus",
    category: "Home",
    subcategory: "Lighting",
    price: 132,
    compareAt: null,
    rating: 4.8,
    reviewsCount: 44,
    inventory: 33,
    inStock: true,
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop"
    ],
    colors: [
      { name: "Off White", hex: "#F5F3F0" },
      { name: "Black", hex: "#0A0A0A" }
    ],
    sizes: ["One Size"],
    description: "Adjustable aluminum lamp with warm dimming and USB-C charging base.",
    features: ["Warm dim 2700-4000K", "USB-C base", "Touch dimming"],
    specs: { Material: "Aluminum", Power: "7W", Origin: "Denmark" },
    reviews: []
  }
];

export const categories = [
  { id: "Apparel", name: "Apparel", count: 7, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop", description: "Tailored essentials" },
  { id: "Electronics", name: "Electronics", count: 6, image: "https://images.unsplash.com/photo-1498049794561-7780e7231666?q=80&w=600&auto=format&fit=crop", description: "Tools for flow" },
  { id: "Footwear", name: "Footwear", count: 3, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop", description: "Built to move" },
  { id: "Accessories", name: "Accessories", count: 4, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop", description: "Small, considered" },
  { id: "Home", name: "Home", count: 4, image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop", description: "Calm spaces" }
];

export const collections = [
  { id: "new", name: "New Arrivals", subtitle: "Fall / Winter 26", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop", filter: p => p.badge === "New" || p.featured },
  { id: "essentials", name: "The Essentials Edit", subtitle: "Foundation wardrobe", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop", filter: p => p.category === "Apparel" },
  { id: "tech", name: "Tech Essentials", subtitle: "For deep work", image: "https://images.unsplash.com/photo-1498049794561-7780e7231666?q=80&w=1200&auto=format&fit=crop", filter: p => p.category === "Electronics" }
];
