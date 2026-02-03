// 1. Constructor
function Product(id, name, price, quantity, category, isAvailable) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
    this.isAvailable = isAvailable;
}

// 2. Init data
const products = [
    new Product(1, "iPhone 15 Pro Max", 35000000, 15, "Electronics", true),
    new Product(2, "Samsung S24 Ultra", 32000000, 8, "Electronics", true),
    new Product(3, "AirPods Pro 2", 6500000, 0, "Accessories", true),
    new Product(4, "Apple Watch Ultra 2", 22000000, 5, "Accessories", true),
    new Product(5, "Magic Mouse", 2500000, 12, "Accessories", false),
    new Product(6, "MacBook Pro M3", 45000000, 3, "Electronics", true),
    new Product(7, "iPad Air", 15000000, 0, "Electronics", false),
    new Product(8, "USB-C Cable", 500000, 50, "Accessories", true)
];

// 3. Map lấy name và price
const listNamePrice = products.map(p => ({
    name: p.name,
    price: p.price
}));
console.log("Câu 3:", listNamePrice);

// 4. Filter hàng còn trong kho
const inStockProducts = products.filter(p => p.quantity > 0);
console.log("Câu 4 - Còn hàng:", inStockProducts);

// 5. Some check giá > 30tr
const hasExpensive = products.some(p => p.price > 30000000);
console.log("Câu 5 - Có món > 30tr:", hasExpensive);

// 6. Check tất cả Accessories có bán không
const allAccessoriesActive = products
    .filter(p => p.category === "Accessories")
    .every(p => p.isAvailable);

console.log("Câu 6 - Accessories đang bán hết:", allAccessoriesActive);

// 7. Reduce tính tổng tiền
const totalMoney = products.reduce((total, p) => total + (p.price * p.quantity), 0);
console.log(`Câu 7 - Tổng kho: ${totalMoney.toLocaleString()} VNĐ`);

// 8. For...of in danh sách
console.log("\nCâu 8 - Duyệt mảng:");
for (let p of products) {
    console.log(`${p.name} - ${p.category} - ${p.isAvailable ? 'Đang bán' : 'Dừng bán'}`);
}

// 9. For...in duyệt object
console.log("\nCâu 9 - Duyệt thuộc tính (test sp đầu tiên):");
let sampleProduct = products[0];
for (let key in sampleProduct) {
    console.log(`${key}: ${sampleProduct[key]}`);
}

// 10. Filter + Map kết hợp
const availableNames = products
    .filter(p => p.isAvailable && p.quantity > 0)
    .map(p => p.name);

console.log("\nCâu 10 - Đang bán & còn hàng:", availableNames);