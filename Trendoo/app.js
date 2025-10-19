// Trendoo E-commerce App
class TrendooApp {
    constructor() {
        this.currentScreen = 'home';
        this.currentProducts = [];
        this.currentCategory = '';
        this.currentBrand = '';
        this.cart = JSON.parse(localStorage.getItem('trendoo_cart')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('trendoo_user')) || null;
        this.orders = JSON.parse(localStorage.getItem('trendoo_orders')) || [];
        this.navigationHistory = ['home']; // Track navigation history
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadFeaturedProducts();
        this.updateCartCount();
        this.setupBrandFilter();
        this.checkAuthStatus();
        this.setupClickOutsideSearch();
        this.setupScrollToTop();
        this.setupSmoothScrolling();
        this.setupBrowserHistory();
    }

    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                if (section) {
                    this.showScreen(section);
                }
            });
        });

        // Category buttons
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const category = btn.getAttribute('data-category');
                if (category) {
                    this.showBrandCollection(category);
                }
            });
        });

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchProducts(e.target.value);
            });
            
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const searchResults = document.getElementById('searchResults');
                    if (searchResults) {
                        searchResults.classList.add('hidden');
                    }
                }
            });
        }

        // Filter controls
        const categoryFilter = document.getElementById('categoryFilter');
        const brandFilter = document.getElementById('brandFilter');
        const priceFilter = document.getElementById('priceFilter');
        const sortBy = document.getElementById('sortBy');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.applyFilters());
        }
        if (brandFilter) {
            brandFilter.addEventListener('change', () => this.applyFilters());
        }
        if (priceFilter) {
            priceFilter.addEventListener('change', () => this.applyFilters());
        }
        if (sortBy) {
            sortBy.addEventListener('change', () => this.applyFilters());
        }
    }

    showScreen(screenName, params = {}) {
        // Add to browser history
        this.addToHistory(screenName, params);
        
        // Show loading overlay for smooth transition (except for brand-collection which handles its own loading)
        if (screenName !== 'brand-collection') {
            this.showLoadingOverlay();
        }
        
        // Add smooth transition delay
        setTimeout(() => {
            // Hide all screens with smooth transition
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.add('hidden');
                screen.classList.remove('active');
            });

            // Show target screen with animation
            const targetScreen = document.getElementById(`${screenName}-screen`);
            if (targetScreen) {
                targetScreen.classList.remove('hidden');
                targetScreen.classList.add('active');
                this.currentScreen = screenName;

                // Add entrance animation based on navigation direction
                this.addEntranceAnimation(targetScreen, screenName);

                // Load screen-specific content
                this.loadScreenContent(screenName, params);
            }
            
            // Hide loading overlay after content is loaded (except for brand-collection)
            if (screenName !== 'brand-collection') {
                this.hideLoadingOverlay();
            }
            
            // Scroll to top smoothly
            this.scrollToTopSmooth();
        }, 150);
    }

    addEntranceAnimation(screen, screenName) {
        // Remove any existing animation classes
        screen.classList.remove('animate-slide-in-right', 'animate-slide-in-left', 'animate-fade-in-up');
        
        // Add a simple fade-in animation for all screens to prevent shaking
        screen.classList.add('animate-fade-in');
        
        // Remove animation class after animation completes to prevent conflicts
        setTimeout(() => {
            screen.classList.remove('animate-fade-in');
        }, 500);
    }

    loadScreenContent(screenName, params) {
        switch (screenName) {
            case 'home':
                this.loadHomeScreen();
                break;
            case 'cart':
                this.loadCartScreen();
                break;
            case 'checkout':
                this.loadCheckoutScreen();
                break;
            case 'account':
                this.loadAuthScreen();
                break;
            case 'product-list':
                if (params.category) {
                    this.showProductsByCategory(params.category);
                } else {
                    this.loadAllProducts();
                }
                break;
            case 'brand-collection':
                if (params.brandId) {
                    this.showBrandCollection(params.brandId);
                } else if (this.currentBrand) {
                    this.showBrandCollection(this.currentBrand);
                }
                break;
            case 'product-details':
                if (params.productId) {
                    this.loadProductDetails(params.productId);
                }
                break;
        }
    }

    showLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
            overlay.classList.add('active');
            
            // Fallback: hide loading overlay after 5 seconds maximum
            setTimeout(() => {
                this.hideLoadingOverlay();
            }, 5000);
        }
    }

    hideLoadingOverlay() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            // Remove active class immediately for better responsiveness
            overlay.classList.remove('active');
            
            // Also ensure it's completely hidden after transition
            setTimeout(() => {
                overlay.style.display = 'none';
            }, 300);
        }
    }

    scrollToTopSmooth() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    showScreenWithoutLoading(screenName, params = {}) {
        // Track navigation history (don't add duplicates)
        if (this.navigationHistory[this.navigationHistory.length - 1] !== screenName) {
            this.navigationHistory.push(screenName);
        }
        
        // Hide all screens with smooth transition
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });

        // Show target screen with animation
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            this.currentScreen = screenName;

            // Add simple fade-in animation
            targetScreen.classList.add('animate-fade-in');
            
            // Remove animation class after completion
            setTimeout(() => {
                targetScreen.classList.remove('animate-fade-in');
            }, 500);
        }
        
        // Scroll to top smoothly
        this.scrollToTopSmooth();
    }

    loadHomeScreen() {
        this.loadFeaturedProducts();
    }

    loadFeaturedProducts() {
        const featuredProducts = productData.products.filter(product => product.featured);
        const container = document.getElementById('featuredProducts');
        
        if (container) {
            container.innerHTML = featuredProducts.slice(0, 8).map(product => this.createProductCard(product)).join('');
        }
    }

    createProductCard(product) {
        const discountPercentage = product.originalPrice ? 
            Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
        
        return `
            <div class="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer product-card border border-gray-100" 
                 onclick="app.showProductDetails(${product.id})">
                <div class="relative overflow-hidden">
                    <img src="${product.images[0]}" alt="${product.name}" 
                         class="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                         loading="lazy">
                    ${discountPercentage > 0 ? `
                        <div class="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                            -${discountPercentage}%
                        </div>
                    ` : ''}
                    <button class="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white p-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
                            onclick="event.stopPropagation(); app.toggleWishlist(${product.id})">
                        <i class="fas fa-heart text-gray-600 hover:text-red-500 transition-colors"></i>
                    </button>
                    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-200"></div>
                </div>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-xs font-semibold text-trendoo-secondary uppercase tracking-wider">${productData.brands[product.brand]?.name || product.brand}</span>
                        <div class="flex items-center">
                            <div class="flex text-yellow-400 mr-1">
                                ${this.generateStarRating(product.rating)}
                            </div>
                            <span class="text-sm text-gray-600">(${product.reviews})</span>
                        </div>
                    </div>
                    <h4 class="font-bold text-xl mb-2 text-trendoo-primary group-hover:text-trendoo-secondary transition-colors">${product.name}</h4>
                    <p class="text-gray-600 text-sm mb-4 line-clamp-2">${product.shortDescription}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-2">
                            <span class="text-2xl font-black text-trendoo-primary">৳${product.price}</span>
                            ${product.originalPrice && product.originalPrice > product.price ? `
                                <span class="text-sm text-gray-500 line-through">৳${product.originalPrice}</span>
                            ` : ''}
                        </div>
                        <button class="bg-gradient-to-r from-trendoo-secondary to-orange-600 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-200 hover:-translate-y-0.5"
                                onclick="event.stopPropagation(); app.addToCart(${product.id})">
                            <i class="fas fa-shopping-cart mr-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    showProductsByCategory(category) {
        this.currentCategory = category;
        this.currentProducts = productData.products.filter(product => 
            product.brand === category || product.category === category
        );
        
        this.showScreen('product-list', { category });
        this.displayProducts();
        this.updateProductListTitle();
    }

    showBrandCollection(brandId) {
        console.log('Showing brand collection for:', brandId);
        const brand = productData.brands[brandId];
        if (!brand) {
            console.error('Brand not found:', brandId);
            this.showNotification('Brand not found. Please try again.', 'error');
            this.hideLoadingOverlay();
            return;
        }

        this.currentBrand = brandId;
        this.currentProducts = productData.products.filter(product => 
            product.brand === brandId
        );

        console.log('Found products for brand:', this.currentProducts.length);
        console.log('Products:', this.currentProducts);
        
        // Add to browser history
        this.addToHistory('brand-collection', { brandId: brandId });
        
        // Show screen without loading overlay to prevent conflicts
        this.showScreenWithoutLoading('brand-collection');
        this.loadBrandCollection(brand);
        
        // Show success notification
        this.showNotification(`Loading ${brand.name} collection...`, 'success');
    }

    loadBrandCollection(brand) {
        // Update brand collection title
        const title = document.getElementById('brandCollectionTitle');
        const subtitle = document.getElementById('brandCollectionSubtitle');
        const heroTitle = document.getElementById('brandHeroTitle');
        const heroDescription = document.getElementById('brandHeroDescription');
        const brandIcon = document.getElementById('brandIcon');

        if (title) title.textContent = `${brand.name} Collection`;
        if (subtitle) subtitle.textContent = `Discover our curated ${brand.name} selection`;
        if (heroTitle) heroTitle.textContent = brand.name;
        if (brandIcon) {
            // Set appropriate icon based on brand category
            if (brand.category === 'sneakers') {
                brandIcon.className = 'fas fa-running text-3xl text-trendoo-secondary';
            } else {
                brandIcon.className = 'fas fa-clock text-3xl text-trendoo-secondary';
            }
        }

        // Set brand-specific descriptions
        const descriptions = {
            'nike': 'Innovation meets style in our Nike collection. From Air Max to Dunk, discover iconic sneakers that define athletic culture.',
            'air-jordan': 'Experience the legacy of Michael Jordan with our Air Jordan collection. Premium basketball heritage meets modern design.',
            'adidas': 'German engineering meets street style in our Adidas collection. From Ultraboost to Stan Smith, performance and style combined.',
            'louis-vuitton': 'Luxury redefined with our Louis Vuitton sneaker collection. Exclusive designs that blend high fashion with street culture.',
            'rolex': 'Swiss precision and timeless elegance in our Rolex collection. Discover iconic timepieces that define luxury watchmaking.',
            'casio': 'Innovation and durability in our Casio collection. From G-Shock to Edifice, reliable timepieces for every lifestyle.',
            'armani': 'Italian luxury meets modern design in our Emporio Armani collection. Sophisticated timepieces for the discerning individual.',
            'richard-mille': 'Cutting-edge horology in our Richard Mille collection. Ultra-lightweight tourbillons that push the boundaries of watchmaking.',
            'hublot': 'Swiss innovation meets bold design in our Hublot collection. Discover chronographs that redefine modern luxury.',
            'rado': 'High-tech ceramic excellence in our Rado collection. Discover timepieces that combine innovation with timeless design.',
            'navi-force': 'Military-inspired precision in our Navi Force collection. Reliable chronographs built for adventure and style.',
            'omega': 'Space exploration heritage in our Omega collection. From Speedmaster to Seamaster, legendary timepieces for every moment.',
            'jacob-co': 'Artistic horology in our Jacob & Co collection. Discover astronomical timepieces that showcase mechanical artistry.'
        };

        if (heroDescription) {
            // Use brand ID for descriptions since it matches the data structure
            heroDescription.textContent = descriptions[this.currentBrand] || 
                `Discover our premium ${brand.name} collection featuring the finest selection of ${brand.category}.`;
        }

        // Display brand products
        this.displayBrandProducts();
        
        // Hide loading overlay after content is loaded
        this.hideLoadingOverlay();
    }

    displayBrandProducts() {
        const container = document.getElementById('brandProducts');
        if (!container) return;

        // Add small delay to prevent content jumping
        setTimeout(() => {
            if (this.currentProducts.length === 0) {
                container.innerHTML = `
                    <div class="col-span-full text-center py-16">
                        <div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <i class="fas fa-search text-4xl text-gray-400"></i>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-700 mb-3">No Products Found</h3>
                        <p class="text-gray-500 mb-8 max-w-md mx-auto">We're working on adding more ${productData.brands[this.currentBrand]?.name || 'brand'} products to our collection.</p>
                        <button class="bg-trendoo-secondary text-white px-8 py-4 rounded-2xl font-bold hover:bg-orange-600 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1"
                                onclick="goBackToHome()">
                            <i class="fas fa-arrow-left mr-2"></i>Back to Home
                        </button>
                    </div>
                `;
                return;
            }

            container.innerHTML = this.currentProducts.map(product => this.createProductCard(product)).join('');
            
            // Hide loading overlay after content is loaded
            this.hideLoadingOverlay();
        }, 100);
    }

    loadAllProducts() {
        this.currentProducts = [...productData.products];
        this.displayProducts();
    }

    displayProducts() {
        const container = document.getElementById('productsGrid');
        if (container) {
            container.innerHTML = this.currentProducts.map(product => this.createProductCard(product)).join('');
        }
    }

    updateProductListTitle() {
        const title = document.getElementById('productListTitle');
        if (title) {
            const brandName = productData.brands[this.currentCategory]?.name || 'All Products';
            title.textContent = brandName;
        }
    }

    searchProducts(query) {
        const searchResults = document.getElementById('searchResults');
        
        if (query.length < 2) {
            this.currentProducts = [...productData.products];
            this.displayProducts();
            if (searchResults) {
                searchResults.classList.add('hidden');
            }
            return;
        }

        const searchTerm = query.toLowerCase();
        const results = productData.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.brand.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.shortDescription.toLowerCase().includes(searchTerm)
        );

        // Show search suggestions
        if (searchResults) {
            if (results.length > 0) {
                searchResults.innerHTML = results.slice(0, 5).map(product => `
                    <div class="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0" 
                         onclick="app.selectSearchResult(${product.id})">
                        <div class="flex items-center space-x-3">
                            <img src="${product.images[0]}" alt="${product.name}" class="w-12 h-12 object-cover rounded-lg">
                            <div class="flex-1">
                                <h4 class="font-semibold text-gray-900">${product.name}</h4>
                                <p class="text-sm text-gray-600">${productData.brands[product.brand]?.name || product.brand} • $${product.price}</p>
                            </div>
                        </div>
                    </div>
                `).join('');
                searchResults.classList.remove('hidden');
            } else {
                searchResults.innerHTML = `
                    <div class="p-6 text-center text-gray-500">
                        <i class="fas fa-search text-2xl mb-2"></i>
                        <p>No products found for "${query}"</p>
                    </div>
                `;
                searchResults.classList.remove('hidden');
            }
        }

        this.currentProducts = results;
        this.showScreen('product-list');
        this.displayProducts();
        document.getElementById('productListTitle').textContent = `Search Results for "${query}"`;
    }

    selectSearchResult(productId) {
        const searchInput = document.getElementById('searchInput');
        const searchResults = document.getElementById('searchResults');
        
        if (searchInput) searchInput.value = '';
        if (searchResults) searchResults.classList.add('hidden');
        
        this.showProductDetails(productId);
    }

    applyFilters() {
        let filteredProducts = [...productData.products];

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter')?.value;
        if (categoryFilter) {
            filteredProducts = filteredProducts.filter(product => product.category === categoryFilter);
        }

        // Brand filter
        const brandFilter = document.getElementById('brandFilter')?.value;
        if (brandFilter) {
            filteredProducts = filteredProducts.filter(product => product.brand === brandFilter);
        }

        // Price filter
        const priceFilter = document.getElementById('priceFilter')?.value;
        if (priceFilter) {
            const [min, max] = priceFilter.split('-').map(Number);
            filteredProducts = filteredProducts.filter(product => {
                if (max) {
                    return product.price >= min && product.price <= max;
                } else {
                    return product.price >= min;
                }
            });
        }

        // Sort
        const sortBy = document.getElementById('sortBy')?.value;
        switch (sortBy) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'name':
            default:
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }

        this.currentProducts = filteredProducts;
        this.displayProducts();
    }

    setupBrandFilter() {
        const brandFilter = document.getElementById('brandFilter');
        if (brandFilter) {
            const brands = [...new Set(productData.products.map(p => p.brand))];
            brandFilter.innerHTML = '<option value="">All Brands</option>' +
                brands.map(brand => 
                    `<option value="${brand}">${productData.brands[brand]?.name || brand}</option>`
                ).join('');
        }
    }

    showProductDetails(productId) {
        this.showScreen('product-details', { productId });
    }

    loadProductDetails(productId) {
        const product = productData.products.find(p => p.id === productId);
        if (!product) return;

        const container = document.getElementById('productDetails');
        if (container) {
            const discountPercentage = product.originalPrice ? 
                Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

            container.innerHTML = `
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <!-- Product Images -->
                    <div class="space-y-4">
                        <div class="relative">
                            <img id="mainProductImage" src="${product.images[0]}" alt="${product.name}" 
                                 class="w-full h-96 object-cover rounded-xl shadow-lg">
                            ${discountPercentage > 0 ? `
                                <div class="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg text-lg font-semibold">
                                    -${discountPercentage}%
                                </div>
                            ` : ''}
                        </div>
                        <div class="flex space-x-2">
                            ${product.images.map((img, index) => `
                                <img src="${img}" alt="${product.name}" 
                                     class="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                                     onclick="document.getElementById('mainProductImage').src = this.src">
                            `).join('')}
                        </div>
                    </div>

                    <!-- Product Info -->
                    <div class="space-y-6">
                        <div>
                            <h1 class="text-3xl font-bold text-trendoo-primary mb-2">${product.name}</h1>
                            <p class="text-lg text-gray-600 mb-4">${product.shortDescription}</p>
                            <div class="flex items-center mb-4">
                                <div class="flex text-yellow-400 mr-3">
                                    ${this.generateStarRating(product.rating)}
                                </div>
                                <span class="text-gray-600">${product.rating} (${product.reviews} reviews)</span>
                            </div>
                            <div class="flex items-center space-x-4 mb-6">
                                <span class="text-3xl font-bold text-trendoo-secondary">$${product.price}</span>
                                ${product.originalPrice && product.originalPrice > product.price ? `
                                    <span class="text-xl text-gray-500 line-through">$${product.originalPrice}</span>
                                ` : ''}
                            </div>
                        </div>

                        <div class="space-y-4">
                            ${product.sizes ? `
                                <div>
                                    <h3 class="font-semibold mb-2">Size</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${product.sizes.map(size => `
                                            <button class="px-4 py-2 border border-gray-300 rounded-lg hover:border-trendoo-secondary hover:bg-trendoo-secondary hover:text-white transition-colors">
                                                ${size}
                                            </button>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            ${product.colors ? `
                                <div>
                                    <h3 class="font-semibold mb-2">Color</h3>
                                    <div class="flex flex-wrap gap-2">
                                        ${product.colors.map(color => `
                                            <button class="px-4 py-2 border border-gray-300 rounded-lg hover:border-trendoo-secondary hover:bg-trendoo-secondary hover:text-white transition-colors">
                                                ${color}
                                            </button>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <div class="flex space-x-4">
                                <button class="flex-1 bg-trendoo-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                                        onclick="app.addToCart(${product.id})">
                                    Add to Cart
                                </button>
                                <button class="px-6 py-3 border border-trendoo-secondary text-trendoo-secondary rounded-lg hover:bg-trendoo-secondary hover:text-white transition-colors">
                                    <i class="fas fa-heart"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Product Specifications -->
                        <div class="border-t pt-6">
                            <h3 class="font-semibold mb-4">Product Details</h3>
                            <div class="space-y-2 text-gray-600">
                                <p><strong>Description:</strong> ${product.description}</p>
                                ${product.materials ? `<p><strong>Materials:</strong> ${product.materials.join(', ')}</p>` : ''}
                                ${product.caseSize ? `<p><strong>Case Size:</strong> ${product.caseSize}</p>` : ''}
                                ${product.movement ? `<p><strong>Movement:</strong> ${product.movement}</p>` : ''}
                                ${product.waterResistance ? `<p><strong>Water Resistance:</strong> ${product.waterResistance}</p>` : ''}
                                <p><strong>Availability:</strong> <span class="${product.inStock ? 'text-green-600' : 'text-red-600'}">${product.inStock ? 'In Stock' : 'Out of Stock'}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    addToCart(productId) {
        const product = productData.products.find(p => p.id === productId);
        if (!product || !product.inStock) return;

        const existingItem = this.cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images[0],
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.loadCartScreen();
    }

    updateCartQuantity(productId, quantity) {
        if (quantity <= 0) {
            this.removeFromCart(productId);
            return;
        }

        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.loadCartScreen();
        }
    }

    loadCartScreen() {
        const container = document.getElementById('cartContent');
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-16">
                    <div class="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i class="fas fa-shopping-cart text-4xl text-gray-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-700 mb-3">Your cart is empty</h3>
                    <p class="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added any items to your cart yet. Start shopping to fill it up!</p>
                    <button class="bg-gradient-to-r from-trendoo-secondary to-orange-600 text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
                            onclick="goBackToHome()">
                        <i class="fas fa-shopping-bag mr-2"></i>Start Shopping
                    </button>
                </div>
            `;
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const subtotal = total;
        const shipping = 0; // Free shipping
        const tax = subtotal * 0.1; // 10% tax
        const grandTotal = subtotal + shipping + tax;

        container.innerHTML = `
            <div class="space-y-6">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-xl font-bold text-trendoo-primary">Cart Items (${this.cart.length})</h3>
                    <button class="text-red-500 hover:text-red-700 font-semibold transition-colors" onclick="app.clearCart()">
                        <i class="fas fa-trash mr-2"></i>Clear Cart
                    </button>
                </div>
                
                ${this.cart.map(item => `
                    <div class="group bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-all duration-300 border border-gray-200">
                        <div class="flex items-center space-x-6">
                            <div class="relative">
                                <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow">
                                <div class="absolute -top-2 -right-2 bg-gradient-to-r from-trendoo-secondary to-orange-600 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold">
                                    ${item.quantity}
                                </div>
                            </div>
                            <div class="flex-1">
                                <h4 class="font-bold text-lg text-trendoo-primary mb-1">${item.name}</h4>
                                <p class="text-gray-600 mb-2">৳${item.price} each</p>
                                <div class="flex items-center space-x-4">
                                    <div class="flex items-center space-x-3 bg-white rounded-xl p-2 shadow-sm">
                                        <button class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                                onclick="app.updateCartQuantity(${item.id}, ${item.quantity - 1})">
                                            <i class="fas fa-minus text-sm text-gray-600"></i>
                                        </button>
                                        <span class="w-12 text-center font-bold text-lg">${item.quantity}</span>
                                        <button class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                                onclick="app.updateCartQuantity(${item.id}, ${item.quantity + 1})">
                                            <i class="fas fa-plus text-sm text-gray-600"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <p class="font-bold text-2xl text-trendoo-primary mb-2">৳${(item.price * item.quantity).toFixed(0)}</p>
                                <button class="text-red-500 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-lg"
                                        onclick="app.removeFromCart(${item.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}

                <div class="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
                    <h3 class="text-xl font-bold text-trendoo-primary mb-6">Order Summary</h3>
                    <div class="space-y-4 mb-6">
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Subtotal (${this.cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                            <span class="font-semibold">৳${subtotal.toFixed(0)}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Shipping</span>
                            <span class="font-semibold text-green-600">Free</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-gray-600">Tax</span>
                            <span class="font-semibold">৳${tax.toFixed(0)}</span>
                        </div>
                        <div class="border-t border-gray-300 pt-4">
                            <div class="flex justify-between items-center">
                                <span class="text-xl font-bold text-trendoo-primary">Total</span>
                                <span class="text-2xl font-black text-trendoo-secondary">৳${grandTotal.toFixed(0)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4">
                        <button class="flex-1 bg-gradient-to-r from-trendoo-secondary to-orange-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1"
                                onclick="app.showScreen('checkout')">
                            <i class="fas fa-credit-card mr-2"></i>Proceed to Checkout
                        </button>
                        <button class="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300"
                                onclick="goBackToHome()">
                            <i class="fas fa-arrow-left mr-2"></i>Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    loadCheckoutScreen() {
        if (this.cart.length === 0) {
            this.showScreen('cart');
            return;
        }

        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Checkout Form
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.innerHTML = `
                <h3 class="text-xl font-semibold mb-6">Shipping Information</h3>
                <form id="checkoutFormElement" class="space-y-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium mb-2">
                                First Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="firstName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                        </div>
                        <div>
                            <label class="block text-sm font-medium mb-2">
                                Last Name <span class="text-red-500">*</span>
                            </label>
                            <input type="text" name="lastName" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                        </div>
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">Email</label>
                        <input type="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">
                            Phone Number <span class="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary" placeholder="+8801XXXXXXXXX">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-2">
                            Address <span class="text-red-500">*</span>
                        </label>
                        <textarea name="address" required rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary" placeholder="Enter your full address"></textarea>
                    </div>
                </form>
            `;
        }

        // Order Summary
        const orderSummary = document.getElementById('orderSummary');
        if (orderSummary) {
            orderSummary.innerHTML = `
                <h3 class="text-xl font-semibold mb-6">Order Summary</h3>
                <div class="space-y-4 mb-6">
                    ${this.cart.map(item => `
                        <div class="flex justify-between items-center">
                            <div class="flex items-center space-x-3">
                                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded">
                                <div>
                                    <p class="font-medium">${item.name}</p>
                                    <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                                </div>
                            </div>
                            <span class="font-semibold">৳${(item.price * item.quantity).toFixed(0)}</span>
                        </div>
                    `).join('')}
                </div>

                <div class="border-t pt-4 mb-6">
                    <div class="flex justify-between mb-2">
                        <span>Subtotal:</span>
                        <span>৳${total.toFixed(0)}</span>
                    </div>
                    <div class="flex justify-between mb-2">
                        <span>Shipping:</span>
                        <span class="text-green-600 font-semibold">Free</span>
                    </div>
                    <div class="flex justify-between font-semibold text-lg">
                        <span>Total:</span>
                        <span class="text-trendoo-secondary">৳${total.toFixed(0)}</span>
                    </div>
                </div>

                <div class="space-y-4">
                    <h4 class="font-semibold">Payment Method <span class="text-red-500">*</span></h4>
                    <div class="space-y-3">
                        <label class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-trendoo-secondary transition-colors">
                            <input type="radio" name="payment" value="bkash" class="text-trendoo-secondary focus:ring-trendoo-secondary" required>
                            <div>
                                <span class="font-medium">bKash</span>
                                <p class="text-sm text-gray-600">+8801640475515</p>
                            </div>
                        </label>
                        <label class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-trendoo-secondary transition-colors">
                            <input type="radio" name="payment" value="nagad" class="text-trendoo-secondary focus:ring-trendoo-secondary" required>
                            <div>
                                <span class="font-medium">Nagad</span>
                                <p class="text-sm text-gray-600">+8801640475515</p>
                            </div>
                        </label>
                        <label class="flex items-center space-x-3 cursor-pointer p-3 border border-gray-200 rounded-lg hover:border-trendoo-secondary transition-colors">
                            <input type="radio" name="payment" value="cod" class="text-trendoo-secondary focus:ring-trendoo-secondary" required>
                            <div>
                                <span class="font-medium">Cash on Delivery</span>
                                <p class="text-sm text-gray-600">Pay when you receive</p>
                            </div>
                        </label>
                    </div>
                </div>

                <button class="w-full bg-trendoo-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-6"
                        onclick="app.placeOrder()">
                    <i class="fas fa-credit-card mr-2"></i>Place Order
                </button>
            `;
        }
    }

    placeOrder() {
        const form = document.getElementById('checkoutFormElement');
        const paymentMethod = document.querySelector('input[name="payment"]:checked');
        
        // Check if all required fields are filled
        const requiredFields = form.querySelectorAll('[required]');
        let allFieldsValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFieldsValid = false;
                field.classList.add('border-red-500');
            } else {
                field.classList.remove('border-red-500');
            }
        });
        
        if (!allFieldsValid || !paymentMethod) {
            this.showNotification('Please fill all required fields (marked with *) and select a payment method', 'error');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const customerInfo = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address')
        };

        const orderData = {
            id: Date.now(),
            items: [...this.cart],
            total: this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            paymentMethod: paymentMethod.value,
            customerInfo: customerInfo,
            status: 'pending',
            date: new Date().toISOString()
        };

        this.orders.push(orderData);
        this.cart = [];
        this.saveCart();
        this.saveOrders();
        this.updateCartCount();

        this.showNotification('Order placed successfully! We will contact you soon for confirmation.', 'success');
        this.showScreen('home');
    }

    loadAuthScreen() {
        const container = document.getElementById('authContent');
        if (!container) return;

        if (this.currentUser) {
            // User Profile
            container.innerHTML = `
                <div class="text-center">
                    <div class="w-20 h-20 bg-trendoo-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                        <i class="fas fa-user text-2xl text-white"></i>
                    </div>
                    <h3 class="text-xl font-semibold mb-2">Welcome, ${this.currentUser.name}!</h3>
                    <p class="text-gray-600 mb-6">${this.currentUser.email}</p>
                    
                    <div class="space-y-4">
                        <button class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                                onclick="app.showOrderHistory()">
                            <i class="fas fa-history mr-2"></i>Order History
                        </button>
                        <button class="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors"
                                onclick="app.editProfile()">
                            <i class="fas fa-edit mr-2"></i>Edit Profile
                        </button>
                        <button class="w-full bg-red-100 text-red-700 py-3 rounded-lg hover:bg-red-200 transition-colors"
                                onclick="app.logout()">
                            <i class="fas fa-sign-out-alt mr-2"></i>Logout
                        </button>
                    </div>
                </div>
            `;
        } else {
            // Login/Signup Forms
            container.innerHTML = `
                <div class="space-y-6">
                    <div class="flex border-b">
                        <button class="flex-1 py-2 font-semibold text-trendoo-secondary border-b-2 border-trendoo-secondary" 
                                onclick="app.showLoginForm()">
                            Login
                        </button>
                        <button class="flex-1 py-2 font-semibold text-gray-500 hover:text-trendoo-secondary transition-colors" 
                                onclick="app.showSignupForm()">
                            Sign Up
                        </button>
                    </div>
                    
                    <div id="authFormContainer">
                        ${this.createLoginForm()}
                    </div>
                </div>
            `;
        }
    }

    showLoginForm() {
        const container = document.getElementById('authFormContainer');
        if (container) {
            container.innerHTML = this.createLoginForm();
        }
    }

    showSignupForm() {
        const container = document.getElementById('authFormContainer');
        if (container) {
            container.innerHTML = this.createSignupForm();
        }
    }

    createLoginForm() {
        return `
            <form id="loginForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div class="flex justify-between items-center">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-sm">Remember me</span>
                    </label>
                    <a href="#" class="text-sm text-trendoo-secondary hover:text-orange-600">Forgot password?</a>
                </div>
                <button type="submit" class="w-full bg-trendoo-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Login
                </button>
            </form>
        `;
    }

    createSignupForm() {
        return `
            <form id="signupForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input type="email" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Confirm Password</label>
                    <input type="password" required class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-trendoo-secondary">
                </div>
                <div class="flex items-center">
                    <input type="checkbox" required class="mr-2">
                    <span class="text-sm">I agree to the <a href="#" class="text-trendoo-secondary hover:text-orange-600">Terms of Service</a></span>
                </div>
                <button type="submit" class="w-full bg-trendoo-secondary text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    Create Account
                </button>
            </form>
        `;
    }

    showOrderHistory() {
        if (this.orders.length === 0) {
            this.showNotification('No orders found', 'info');
            return;
        }

        // Implementation for order history display
        this.showNotification('Order history feature coming soon!', 'info');
    }

    editProfile() {
        this.showNotification('Profile editing feature coming soon!', 'info');
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('trendoo_user');
        this.loadAuthScreen();
        this.showNotification('Logged out successfully', 'success');
    }

    checkAuthStatus() {
        if (this.currentUser) {
            // Update UI to show logged in state
            const accountBtn = document.querySelector('[data-section="account"]');
            if (accountBtn) {
                accountBtn.innerHTML = '<i class="fas fa-user-check text-xl"></i>';
            }
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        switch (type) {
            case 'success':
                notification.classList.add('bg-green-500', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-500', 'text-white');
                break;
            case 'info':
                notification.classList.add('bg-blue-500', 'text-white');
                break;
            default:
                notification.classList.add('bg-gray-500', 'text-white');
        }

        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    saveCart() {
        localStorage.setItem('trendoo_cart', JSON.stringify(this.cart));
    }

    saveOrders() {
        localStorage.setItem('trendoo_orders', JSON.stringify(this.orders));
    }

    updateCartCount() {
        const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            if (count > 0) {
                cartCount.textContent = count;
                cartCount.classList.remove('hidden');
            } else {
                cartCount.classList.add('hidden');
            }
        }
    }

    goBackToList() {
        if (this.currentCategory) {
            this.showProductsByCategory(this.currentCategory);
        } else if (this.currentBrand) {
            this.showBrandCollection(this.currentBrand);
        } else {
            this.showScreen('home');
        }
    }

    goBackToHome() {
        this.currentCategory = '';
        this.currentBrand = '';
        this.currentProducts = [];
        this.navigationHistory = ['home'];
        this.showScreen('home');
        this.loadFeaturedProducts();
    }

    goBackToPrevious() {
        // Remove current screen from history
        if (this.navigationHistory.length > 1) {
            this.navigationHistory.pop(); // Remove current screen
            const previousScreen = this.navigationHistory[this.navigationHistory.length - 1];
            
            // Handle different previous screens
            switch (previousScreen) {
                case 'home':
                    this.goBackToHome();
                    break;
                case 'brand-collection':
                    if (this.currentBrand) {
                        this.showBrandCollection(this.currentBrand);
                    } else {
                        this.goBackToHome();
                    }
                    break;
                case 'product-list':
                    if (this.currentCategory) {
                        this.showProductsByCategory(this.currentCategory);
                    } else {
                        this.goBackToHome();
                    }
                    break;
                case 'cart':
                    this.showScreen('cart');
                    break;
                case 'product-details':
                    this.goBackToList();
                    break;
                default:
                    this.goBackToHome();
                    break;
            }
        } else {
            // If no history, go to home
            this.goBackToHome();
        }
    }

    clearCart() {
        if (confirm('Are you sure you want to clear your cart?')) {
            this.cart = [];
            this.saveCart();
            this.updateCartCount();
            this.loadCartScreen();
            this.showNotification('Cart cleared successfully', 'success');
        }
    }

    toggleWishlist(productId) {
        // Simple wishlist functionality
        const product = productData.products.find(p => p.id === productId);
        if (product) {
            this.showNotification(`${product.name} added to wishlist!`, 'success');
        }
    }

    // Enhanced search with click outside to close
    setupClickOutsideSearch() {
        document.addEventListener('click', (e) => {
            const searchResults = document.getElementById('searchResults');
            const searchInput = document.getElementById('searchInput');
            
            if (searchResults && searchInput && 
                !searchResults.contains(e.target) && 
                !searchInput.contains(e.target)) {
                searchResults.classList.add('hidden');
            }
        });
    }

    setupScrollToTop() {
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        // Show/hide scroll to top button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
    }

    setupSmoothScrolling() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupBrowserHistory() {
        // Listen for browser back/forward button
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.screen) {
                this.navigateToScreen(event.state.screen, event.state.params || {});
            } else {
                // Parse URL hash to determine initial screen
                this.parseUrlAndNavigate();
            }
        });

        // Parse initial URL and navigate accordingly
        this.parseUrlAndNavigate();
    }

    parseUrlAndNavigate() {
        const hash = window.location.hash;
        
        if (hash) {
            const parts = hash.split('/');
            const screen = parts[0].substring(1); // Remove #
            
            switch (screen) {
                case 'brand':
                    const brandId = parts[1];
                    if (brandId) {
                        this.showBrandCollection(brandId);
                        return;
                    }
                    break;
                case 'products':
                    const category = parts[1];
                    this.showScreen('product-list', { category });
                    return;
                case 'product':
                    const productId = parseInt(parts[1]);
                    if (productId) {
                        this.showScreen('product-details', { productId });
                        return;
                    }
                    break;
                case 'cart':
                    this.showScreen('cart');
                    return;
                case 'checkout':
                    this.showScreen('checkout');
                    return;
                case 'account':
                    this.showScreen('account');
                    return;
            }
        }
        
        // Default to home
        this.showScreen('home');
    }

    addToHistory(screenName, params) {
        const state = {
            screen: screenName,
            params: params,
            timestamp: Date.now()
        };
        
        // Push state to browser history
        history.pushState(state, '', this.getUrlForScreen(screenName, params));
        
        // Update navigation history
        if (this.navigationHistory[this.navigationHistory.length - 1] !== screenName) {
            this.navigationHistory.push(screenName);
        }
    }

    getUrlForScreen(screenName, params) {
        const baseUrl = window.location.origin + window.location.pathname;
        
        switch (screenName) {
            case 'home':
                return baseUrl;
            case 'brand-collection':
                return `${baseUrl}#brand/${params.brandId || this.currentBrand}`;
            case 'product-list':
                return `${baseUrl}#products/${params.category || ''}`;
            case 'product-details':
                return `${baseUrl}#product/${params.productId || ''}`;
            case 'cart':
                return `${baseUrl}#cart`;
            case 'checkout':
                return `${baseUrl}#checkout`;
            case 'account':
                return `${baseUrl}#account`;
            default:
                return baseUrl;
        }
    }

    navigateToScreen(screenName, params) {
        // Navigate without adding to history (since it's already in history)
        this.currentScreen = screenName;
        
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.add('hidden');
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            targetScreen.classList.add('active');
            
            // Load screen content
            this.loadScreenContent(screenName, params);
        }
        
        // Scroll to top
        this.scrollToTopSmooth();
    }

    // Enhanced navigation with micro-interactions
    enhanceNavigationLinks() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
}

// Global functions for HTML onclick handlers
function showScreen(screenName, params = {}) {
    app.showScreen(screenName, params);
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function showBrandCollection(brandId) {
    app.showBrandCollection(brandId);
}

function goBackToList() {
    app.goBackToList();
}

function goBackToHome() {
    app.goBackToHome();
}

// Debug function to test brand collections
function testBrand(brandId) {
    console.log('Testing brand:', brandId);
    app.showBrandCollection(brandId);
}

function goBackToPrevious() {
    app.goBackToPrevious();
}

// Initialize app when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new TrendooApp();
});
