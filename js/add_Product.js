document.addEventListener('DOMContentLoaded', function () {
    // Render select category
    renderSelectCategory();
    let productForm = document.getElementById('productForm');

    productForm.addEventListener('submit', function (event) {
        event.preventDefault();
        debugger;
        // Tải hình ảnh ở định dạng Base64
        let imageUpload = document.getElementById('imageUpload');
        if (imageUpload.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const base64Image = e.target.result;
                saveProduct(base64Image);
            };
            reader.readAsDataURL(imageUpload.files[0]);
        } else {
            saveProduct(null);
        }
    });
});

function renderSelectCategory() {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let selectionCategory = document.getElementById("category");
    categories.forEach(category => {
        // let tr = document.createElement('select');
        // console.log(Object.values(user));

        let option = document.createElement('option');
        option.value = category.id;

        option.textContent = category.categoryName;
        selectionCategory.appendChild(option);
    });
}


function ProductId() {
    return Math.floor(Math.random() * 99999999 + new Date().getMilliseconds());
}

let date = new Date().toLocaleDateString('vi');

function saveProduct(base64Image) {
    let categories = JSON.parse(localStorage.getItem('categories')) || [];
    let categoryChooseId = document.getElementById('category').value;
    debugger;
    let productNew = {
        id: ProductId(),
        productName: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        productCode: document.getElementById('productCode').value,
        status: document.getElementById('status').value,
        image: base64Image || document.getElementById('image').value,
        categoryId: categoryChooseId,
        date: date,
    };

    for (let i = 0; i < categories.length; i++) {
        if (categories[i].id == categoryChooseId) {
            categories[i].products.push(productNew);
            break;
        }
    }

    alert('Thêm sảm phẩm thành công!');
    document.getElementById('productForm').reset();
    localStorage.setItem("categories", JSON.stringify(categories));
}