//Truong Thanh Son - 2280602771


const apiUrl = 'http://localhost:3000/products';

// Lấy danh sách sản phẩm
const getProducts = async () => {
    const res = await fetch(apiUrl);
    const data = await res.json();
    render(data);
}

// Hiển thị ra giao diện
const render = (items) => {
    const container = document.querySelector('#list');
    container.innerHTML = ''; // Clear cũ

    items.forEach(item => {
        // Check trạng thái để hiện nút tương ứng
        const btnHtml = item.isDeleted 
            ? `<button onclick="restore(${item.id})">Khôi phục</button>`
            : `<button onclick="removeSoft(${item.id})">Xóa</button>`;
        
        // Thêm class nếu đã xóa
        const className = item.isDeleted ? 'item deleted' : 'item';

        const html = `
            <div class="${className}">
                <b>${item.name}</b> (ID: ${item.id}) <br>
                Giá: ${Number(item.price).toLocaleString()} đ
                ${btnHtml}
            </div>
        `;
        container.innerHTML += html;
    });
}

// Thêm mới (Auto ID = Max + 1)
const handleAdd = async () => {
    const name = document.querySelector('#txtName').value;
    if (!name) return alert("Chưa nhập tên!");

    // Lấy data về để tính ID
    const res = await fetch(apiUrl);
    const currentList = await res.json();
    
    // Tìm max ID
    let maxId = 0;
    if (currentList.length > 0) {
        // Map ra mảng ID rồi tìm max
        const ids = currentList.map(x => Number(x.id)); 
        maxId = Math.max(...ids);
    }

    const newObj = {
        id: (maxId + 1).toString(),
        name: name,
        price: 0,
        quantity: 1,
        category: "New",
        isAvailable: true,
        isDeleted: false
    };

    await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObj)
    });

    document.querySelector('#txtName').value = '';
    getProducts(); // Load lại
}

// Xóa mềm (sửa isDeleted -> true)
const removeSoft = async (id) => {
    if(!confirm("Xóa nhé?")) return;

    await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: true })
    });
    getProducts();
}

// Khôi phục lại
const restore = async (id) => {
    await fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isDeleted: false })
    });
    getProducts();
}

// Chạy luôn khi vào trang
getProducts();