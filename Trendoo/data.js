// Trendoo Product Data

// Helper function to convert USD to BDT (approximate rate: 1 USD = 110 BDT)
const convertToBDT = (usdPrice) => Math.round(usdPrice * 110);

const productData = {
    categories: {
        sneakers: {
            name: "Sneakers",
            brands: ["nike", "air-jordan", "adidas", "louis-vuitton"]
        },
        watches: {
            name: "Hand Watches",
            brands: ["rolex", "casio", "armani", "richard-mille", "hublot", "rado", "navi-force", "omega", "jacob-co"]
        }
    },
    
    brands: {
        // Sneaker Brands
        "nike": { name: "Nike", category: "sneakers" },
        "air-jordan": { name: "Air Jordan", category: "sneakers" },
        "adidas": { name: "Adidas", category: "sneakers" },
        "louis-vuitton": { name: "Louis Vuitton", category: "sneakers" },
        
        // Watch Brands
        "rolex": { name: "Rolex", category: "watches" },
        "casio": { name: "Casio", category: "watches" },
        "armani": { name: "Armani", category: "watches" },
        "richard-mille": { name: "Richard Mille", category: "watches" },
        "hublot": { name: "Hublot", category: "watches" },
        "rado": { name: "Rado", category: "watches" },
        "navi-force": { name: "Navi Force", category: "watches" },
        "omega": { name: "Omega", category: "watches" },
        "jacob-co": { name: "Jacob & Co", category: "watches" }
    },

    products: [
        // Nike Sneakers
        {
            id: 1,
            name: "Nike Air Force 1 '07",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(120),
            originalPrice: convertToBDT(150),
            rating: 4.8,
            reviews: 245,
            description: "The radiance lives on in the Nike Air Force 1 '07, the basketball original that puts a fresh spin on what you know best.",
            shortDescription: "Classic basketball sneaker with Air cushioning",
            images: [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"],
            materials: ["Leather", "Rubber", "Textile"],
            inStock: true,
            featured: true
        },
        {
            id: 20,
            name: "Nike Air Max 90",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(130),
            originalPrice: convertToBDT(160),
            rating: 4.7,
            reviews: 189,
            description: "The Nike Air Max 90 delivers visible cushioning under every step with Max Air cushioning in the heel.",
            shortDescription: "Iconic running sneaker with visible Air",
            images: [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Blue"],
            materials: ["Mesh", "Synthetic", "Rubber"],
            inStock: true,
            featured: false
        },
        {
            id: 2,
            name: "Nike Dunk Low Retro",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(110),
            originalPrice: convertToBDT(130),
            rating: 4.7,
            reviews: 189,
            description: "The Nike Dunk Low Retro delivers a classic look with modern comfort. Originally designed for basketball, it's now a streetwear staple.",
            shortDescription: "Retro basketball-inspired low-top sneaker",
            images: [
                "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White/Black", "Blue/White", "Red/White"],
            materials: ["Leather", "Rubber"],
            inStock: true,
            featured: false
        },
        {
            id: 3,
            name: "Nike Air Max 270",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(150),
            originalPrice: convertToBDT(180),
            rating: 4.6,
            reviews: 312,
            description: "The Nike Air Max 270 delivers visible cushioning under every step with Max Air cushioning in the heel.",
            shortDescription: "Lifestyle sneaker with Max Air cushioning",
            images: [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Blue"],
            materials: ["Mesh", "Synthetic", "Rubber"],
            inStock: true,
            featured: true
        },

        // Air Jordan Sneakers
        {
            id: 4,
            name: "Air Jordan 1 Retro High OG",
            brand: "air-jordan",
            category: "sneakers",
            price: convertToBDT(170),
            originalPrice: convertToBDT(200),
            rating: 4.9,
            reviews: 456,
            description: "The Air Jordan 1 Retro High OG is the original that started it all. Premium leather construction with classic colorways.",
            shortDescription: "Iconic high-top basketball sneaker",
            images: [
                "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["Bred", "Royal", "Chicago"],
            materials: ["Premium Leather", "Rubber"],
            inStock: true,
            featured: true
        },
        {
            id: 23,
            name: "Air Jordan 11 Retro",
            brand: "air-jordan",
            category: "sneakers",
            price: convertToBDT(220),
            originalPrice: convertToBDT(250),
            rating: 4.8,
            reviews: 312,
            description: "The Air Jordan 11 Retro features patent leather and carbon fiber shank for premium performance and style.",
            shortDescription: "Premium basketball sneaker with patent leather",
            images: [
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"],
            materials: ["Patent Leather", "Carbon Fiber", "Rubber"],
            inStock: true,
            featured: false
        },
        {
            id: 5,
            name: "Air Jordan 4 Retro",
            brand: "air-jordan",
            category: "sneakers",
            price: convertToBDT(190),
            originalPrice: convertToBDT(220),
            rating: 4.8,
            reviews: 298,
            description: "The Air Jordan 4 Retro features a sleek design with visible Air cushioning and premium materials.",
            shortDescription: "Retro basketball sneaker with Air cushioning",
            images: [
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White/Cement", "Black/Cement", "Military Blue"],
            materials: ["Leather", "Synthetic", "Rubber"],
            inStock: true,
            featured: false
        },

        // Adidas Sneakers
        {
            id: 6,
            name: "Adidas Ultraboost 22",
            brand: "adidas",
            category: "sneakers",
            price: convertToBDT(180),
            originalPrice: convertToBDT(200),
            rating: 4.7,
            reviews: 234,
            description: "The Adidas Ultraboost 22 delivers responsive energy return with every stride. Perfect for running and everyday wear.",
            shortDescription: "High-performance running sneaker",
            images: [
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Blue"],
            materials: ["Primeknit", "Boost", "Continental Rubber"],
            inStock: true,
            featured: true
        },
        {
            id: 22,
            name: "Adidas NMD R1",
            brand: "adidas",
            category: "sneakers",
            price: convertToBDT(140),
            originalPrice: convertToBDT(170),
            rating: 4.6,
            reviews: 167,
            description: "The Adidas NMD R1 combines modern style with innovative Boost technology for ultimate comfort.",
            shortDescription: "Modern lifestyle sneaker with Boost",
            images: [
                "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"],
            materials: ["Primeknit", "Boost", "Rubber"],
            inStock: true,
            featured: false
        },
        {
            id: 7,
            name: "Adidas Stan Smith",
            brand: "adidas",
            category: "sneakers",
            price: convertToBDT(80),
            originalPrice: convertToBDT(100),
            rating: 4.5,
            reviews: 567,
            description: "The Adidas Stan Smith is a timeless tennis-inspired sneaker with clean, minimalist design.",
            shortDescription: "Classic tennis-inspired sneaker",
            images: [
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White/Green", "White/Black", "White/Red"],
            materials: ["Leather", "Rubber"],
            inStock: true,
            featured: false
        },

        // Louis Vuitton Sneakers
        {
            id: 8,
            name: "Louis Vuitton Archlight Sneaker",
            brand: "louis-vuitton",
            category: "sneakers",
            price: convertToBDT(1200),
            originalPrice: convertToBDT(1400),
            rating: 4.9,
            reviews: 89,
            description: "The Louis Vuitton Archlight sneaker features a futuristic design with premium materials and exceptional craftsmanship.",
            shortDescription: "Luxury futuristic sneaker design",
            images: [
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop"
            ],
            sizes: ["7", "8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Monogram"],
            materials: ["Premium Leather", "Canvas", "Rubber"],
            inStock: true,
            featured: true
        },

        // Rolex Watches
        {
            id: 9,
            name: "Rolex Submariner Date",
            brand: "rolex",
            category: "watches",
            price: convertToBDT(9500),
            originalPrice: convertToBDT(10000),
            rating: 4.9,
            reviews: 156,
            description: "The Rolex Submariner Date is the ultimate diving watch, combining precision, reliability, and elegance.",
            shortDescription: "Professional diving watch with date function",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "41mm",
            movement: "Automatic",
            waterResistance: "300m",
            materials: ["Oystersteel", "Cerachrom"],
            inStock: true,
            featured: true
        },
        {
            id: 24,
            name: "Rolex GMT-Master II",
            brand: "rolex",
            category: "watches",
            price: convertToBDT(12000),
            originalPrice: convertToBDT(13000),
            rating: 4.8,
            reviews: 89,
            description: "The Rolex GMT-Master II is the ultimate travel watch, allowing you to track multiple time zones simultaneously.",
            shortDescription: "Professional travel watch with GMT function",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "40mm",
            movement: "Automatic",
            waterResistance: "100m",
            materials: ["Oystersteel", "Cerachrom", "White Gold"],
            inStock: true,
            featured: false
        },
        {
            id: 10,
            name: "Rolex Datejust 36",
            brand: "rolex",
            category: "watches",
            price: convertToBDT(7800),
            originalPrice: convertToBDT(8200),
            rating: 4.8,
            reviews: 234,
            description: "The Rolex Datejust 36 is a classic dress watch that combines timeless elegance with modern precision.",
            shortDescription: "Classic dress watch with date function",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "36mm",
            movement: "Automatic",
            waterResistance: "100m",
            materials: ["Oystersteel", "White Gold"],
            inStock: true,
            featured: false
        },

        // Casio Watches
        {
            id: 11,
            name: "Casio G-Shock GA-2100",
            brand: "casio",
            category: "watches",
            price: convertToBDT(120),
            originalPrice: convertToBDT(150),
            rating: 4.6,
            reviews: 445,
            description: "The Casio G-Shock GA-2100 combines classic G-Shock toughness with modern octagonal design.",
            shortDescription: "Tough digital-analog watch",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "45mm",
            movement: "Digital-Analog",
            waterResistance: "200m",
            materials: ["Resin", "Carbon"],
            inStock: true,
            featured: true
        },
        {
            id: 21,
            name: "Casio G-Shock DW-5600",
            brand: "casio",
            category: "watches",
            price: convertToBDT(95),
            originalPrice: convertToBDT(120),
            rating: 4.5,
            reviews: 298,
            description: "The classic Casio G-Shock DW-5600 features the iconic square design with legendary toughness.",
            shortDescription: "Classic square G-Shock design",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "42mm",
            movement: "Digital",
            waterResistance: "200m",
            materials: ["Resin", "Stainless Steel"],
            inStock: true,
            featured: false
        },
        {
            id: 12,
            name: "Casio Edifice EFR-S108D",
            brand: "casio",
            category: "watches",
            price: convertToBDT(85),
            originalPrice: convertToBDT(110),
            rating: 4.4,
            reviews: 298,
            description: "The Casio Edifice EFR-S108D is a sleek chronograph watch perfect for business and casual wear.",
            shortDescription: "Sleek chronograph watch",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "42mm",
            movement: "Quartz",
            waterResistance: "100m",
            materials: ["Stainless Steel", "Mineral Glass"],
            inStock: true,
            featured: false
        },

        // Armani Watches
        {
            id: 13,
            name: "Emporio Armani Classic",
            brand: "armani",
            category: "watches",
            price: convertToBDT(280),
            originalPrice: convertToBDT(350),
            rating: 4.3,
            reviews: 189,
            description: "The Emporio Armani Classic watch combines Italian style with Swiss precision in an elegant package.",
            shortDescription: "Italian luxury fashion watch",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "40mm",
            movement: "Quartz",
            waterResistance: "50m",
            materials: ["Stainless Steel", "Sapphire Crystal"],
            inStock: true,
            featured: false
        },

        // Richard Mille Watches
        {
            id: 14,
            name: "Richard Mille RM 27-03",
            brand: "richard-mille",
            category: "watches",
            price: convertToBDT(45000),
            originalPrice: convertToBDT(50000),
            rating: 4.9,
            reviews: 23,
            description: "The Richard Mille RM 27-03 is an ultra-lightweight tourbillon watch designed for extreme sports.",
            shortDescription: "Ultra-lightweight tourbillon watch",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "47mm",
            movement: "Manual Winding Tourbillon",
            waterResistance: "50m",
            materials: ["Carbon TPT", "Titanium"],
            inStock: true,
            featured: true
        },

        // Hublot Watches
        {
            id: 15,
            name: "Hublot Big Bang Unico",
            brand: "hublot",
            category: "watches",
            price: convertToBDT(18000),
            originalPrice: convertToBDT(20000),
            rating: 4.8,
            reviews: 67,
            description: "The Hublot Big Bang Unico features an in-house chronograph movement with innovative materials.",
            shortDescription: "Chronograph with in-house movement",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "45mm",
            movement: "Automatic Chronograph",
            waterResistance: "100m",
            materials: ["Ceramic", "Titanium"],
            inStock: true,
            featured: false
        },

        // Rado Watches
        {
            id: 16,
            name: "Rado True Square",
            brand: "rado",
            category: "watches",
            price: convertToBDT(1200),
            originalPrice: convertToBDT(1500),
            rating: 4.5,
            reviews: 134,
            description: "The Rado True Square features a unique square case design with high-tech ceramic materials.",
            shortDescription: "Square case with ceramic materials",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "38mm",
            movement: "Automatic",
            waterResistance: "50m",
            materials: ["High-tech Ceramic", "Sapphire Crystal"],
            inStock: true,
            featured: false
        },

        // Navi Force Watches
        {
            id: 17,
            name: "Navi Force Chronograph",
            brand: "navi-force",
            category: "watches",
            price: convertToBDT(450),
            originalPrice: convertToBDT(550),
            rating: 4.2,
            reviews: 89,
            description: "The Navi Force Chronograph combines military-inspired design with reliable Swiss movement.",
            shortDescription: "Military-inspired chronograph watch",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "44mm",
            movement: "Quartz Chronograph",
            waterResistance: "100m",
            materials: ["Stainless Steel", "Mineral Glass"],
            inStock: true,
            featured: false
        },

        // Omega Watches
        {
            id: 18,
            name: "Omega Speedmaster Professional",
            brand: "omega",
            category: "watches",
            price: convertToBDT(6500),
            originalPrice: convertToBDT(7000),
            rating: 4.9,
            reviews: 278,
            description: "The Omega Speedmaster Professional is the legendary moon watch worn by astronauts.",
            shortDescription: "Legendary moon watch chronograph",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop"
            ],
            caseSize: "42mm",
            movement: "Manual Winding Chronograph",
            waterResistance: "50m",
            materials: ["Stainless Steel", "Hesalite Crystal"],
            inStock: true,
            featured: true
        },

        // Jacob & Co Watches
        {
            id: 19,
            name: "Jacob & Co Astronomia",
            brand: "jacob-co",
            category: "watches",
            price: convertToBDT(85000),
            originalPrice: convertToBDT(95000),
            rating: 4.9,
            reviews: 12,
            description: "The Jacob & Co Astronomia is a spectacular astronomical watch with rotating elements and precious stones.",
            shortDescription: "Astronomical watch with rotating elements",
            images: [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5e6a6a1c6e5?w=500&h=500&fit=crop"
            ],
            caseSize: "50mm",
            movement: "Manual Winding",
            waterResistance: "30m",
            materials: ["18k Rose Gold", "Diamonds", "Sapphire Crystal"],
            inStock: true,
            featured: true
        },
        
        // Additional Nike Products
        {
            id: 25,
            name: "Nike Air Max 97",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(160),
            originalPrice: convertToBDT(180),
            rating: 4.7,
            reviews: 189,
            description: "The Nike Air Max 97 keeps the sneaker game strong with its bold design and cushioned sole.",
            shortDescription: "Iconic Air Max design with full-length Air unit",
            images: [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"]
        },
        {
            id: 26,
            name: "Nike Dunk Low",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(140),
            originalPrice: convertToBDT(160),
            rating: 4.9,
            reviews: 312,
            description: "The Nike Dunk Low brings back the classic basketball silhouette with modern comfort.",
            shortDescription: "Classic basketball silhouette with modern comfort",
            images: [
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Blue"]
        },
        {
            id: 27,
            name: "Nike React Element 55",
            brand: "nike",
            category: "sneakers",
            price: convertToBDT(130),
            originalPrice: convertToBDT(150),
            rating: 4.6,
            reviews: 156,
            description: "The Nike React Element 55 features React foam technology for all-day comfort.",
            shortDescription: "React foam technology for all-day comfort",
            images: [
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Grey"]
        },
        
        // Additional Air Jordan Products
        {
            id: 28,
            name: "Air Jordan 4 Retro",
            brand: "air-jordan",
            category: "sneakers",
            price: convertToBDT(200),
            originalPrice: convertToBDT(220),
            rating: 4.8,
            reviews: 267,
            description: "The Air Jordan 4 Retro brings back the classic design that defined an era.",
            shortDescription: "Classic retro design with Air cushioning",
            images: [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"]
        },
        {
            id: 29,
            name: "Air Jordan 6 Retro",
            brand: "air-jordan",
            category: "sneakers",
            price: convertToBDT(190),
            originalPrice: convertToBDT(210),
            rating: 4.7,
            reviews: 198,
            description: "The Air Jordan 6 Retro features the iconic design that made history.",
            shortDescription: "Iconic design that made basketball history",
            images: [
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Infrared"]
        },
        
        // Additional Adidas Products
        {
            id: 30,
            name: "Adidas Ultraboost 22",
            brand: "adidas",
            category: "sneakers",
            price: convertToBDT(180),
            originalPrice: convertToBDT(200),
            rating: 4.8,
            reviews: 234,
            description: "The Adidas Ultraboost 22 delivers maximum energy return with every step.",
            shortDescription: "Maximum energy return with Boost technology",
            images: [
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Blue"]
        },
        {
            id: 31,
            name: "Adidas NMD R1",
            brand: "adidas",
            category: "sneakers",
            price: convertToBDT(160),
            originalPrice: convertToBDT(180),
            rating: 4.6,
            reviews: 187,
            description: "The Adidas NMD R1 combines street style with performance technology.",
            shortDescription: "Street style meets performance technology",
            images: [
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop"
            ],
            inStock: true,
            sizes: ["8", "9", "10", "11", "12"],
            colors: ["White", "Black", "Red"]
        },
        
        // Additional Rolex Products
        {
            id: 32,
            name: "Rolex Datejust 36",
            brand: "rolex",
            category: "watches",
            price: convertToBDT(8500),
            originalPrice: convertToBDT(9000),
            rating: 4.9,
            reviews: 89,
            description: "The Rolex Datejust 36 is the perfect blend of elegance and functionality.",
            shortDescription: "Perfect blend of elegance and functionality",
            images: [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5d8c0c8b3e9?w=500&h=500&fit=crop"
            ],
            inStock: true,
            features: ["Automatic Movement", "Water Resistant", "Date Display", "Oystersteel Case"]
        },
        {
            id: 33,
            name: "Rolex GMT-Master II",
            brand: "rolex",
            category: "watches",
            price: convertToBDT(12000),
            originalPrice: convertToBDT(13000),
            rating: 4.8,
            reviews: 67,
            description: "The Rolex GMT-Master II is the ultimate travel companion for the modern explorer.",
            shortDescription: "Ultimate travel companion for modern explorers",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5d8c0c8b3e9?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
            ],
            inStock: true,
            features: ["GMT Function", "Cerachrom Bezel", "Oyster Bracelet", "Superlative Chronometer"]
        },
        
        // Additional Casio Products
        {
            id: 34,
            name: "Casio Edifice EFR-S108D",
            brand: "casio",
            category: "watches",
            price: convertToBDT(90),
            originalPrice: convertToBDT(110),
            rating: 4.5,
            reviews: 145,
            description: "The Casio Edifice EFR-S108D combines sporty design with everyday functionality.",
            shortDescription: "Sporty design with everyday functionality",
            images: [
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523170335258-f5d8c0c8b3e9?w=500&h=500&fit=crop"
            ],
            inStock: true,
            features: ["100M Water Resistance", "Chronograph", "Date Display", "Stainless Steel Case"]
        },
        {
            id: 35,
            name: "Casio Pro Trek PRG-270",
            brand: "casio",
            category: "watches",
            price: convertToBDT(200),
            originalPrice: convertToBDT(250),
            rating: 4.7,
            reviews: 98,
            description: "The Casio Pro Trek PRG-270 is built for outdoor adventures with advanced sensors.",
            shortDescription: "Built for outdoor adventures with advanced sensors",
            images: [
                "https://images.unsplash.com/photo-1523170335258-f5d8c0c8b3e9?w=500&h=500&fit=crop",
                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop"
            ],
            inStock: true,
            features: ["Digital Compass", "Altimeter", "Barometer", "Thermometer", "Solar Powered"]
        }
    ]
};

// Payment methods
const paymentMethods = {
    bKash: {
        name: "bKash",
        number: "+8801640475515",
        type: "mobile"
    },
    nagad: {
        name: "Nagad",
        number: "+8801640475515",
        type: "mobile"
    },
    cod: {
        name: "Cash on Delivery",
        description: "Pay when your order arrives",
        type: "cod"
    }
};

// User authentication data (in a real app, this would be handled server-side)
let currentUser = null;
let cart = [];
let orders = [];

// Export data for use in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { productData, paymentMethods, currentUser, cart, orders };
}
