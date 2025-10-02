const ProductModel = require('../models/product.model');

function buildSampleProducts(){
	return [
		{ name: 'Classic T-Shirt', price: 19.99, category: 'Apparel', variants: [
			{ color: 'Red', size: 'S', stock: 15 },
			{ color: 'Red', size: 'M', stock: 8 },
			{ color: 'Blue', size: 'L', stock: 20 }
		] },
		{ name: 'Running Shoes', price: 59.5, category: 'Footwear', variants: [
			{ color: 'Black', size: '8', stock: 10 },
			{ color: 'Black', size: '9', stock: 6 },
			{ color: 'White', size: '8', stock: 12 }
		] },
		{ name: 'Wireless Mouse', price: 24.0, category: 'Electronics', variants: [
			{ color: 'Black', size: 'Standard', stock: 30 },
			{ color: 'Grey', size: 'Compact', stock: 18 }
		] }
	];
}
