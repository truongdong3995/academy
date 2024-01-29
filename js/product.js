document.addEventListener('DOMContentLoaded', function () {
    let ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    let prevPageButton = document.getElementById('prevPage');
    let nextPageButton = document.getElementById('nextPage');
    let currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    let ordersPerPage = 10; // 1ページあたりのオーダー数
    // let pages = Math.ceil(orders.length / ordersPerPage)
    // for (let i = 0; i < pages; i++) {
    //     html +=
    //         `
    //              <li>
    //                 <button onclick=choosePage(${i})>${i+1}</button>
    //             </li> 
    //         `
    // }
    // let page = document.get


    let categories = JSON.parse(localStorage.getItem('categories')) || []; // ローカルストレージからオーダーを取得
    let allProducts = []
    for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < categories[i].products.length; j++) {
            allProducts.push(categories[i].products[j]);
        }
    }   
    function updateTable() {
        ordersTable.innerHTML = ''; // テーブルをクリア
        let pageOrders = allProducts.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);

        // テーブルにオーダーを追加
        pageOrders.forEach((product, index) => {
                let row = ordersTable.insertRow(index);
                row.insertCell(0).innerText = index + 1;
                row.insertCell(1).innerText = product.productName;
                row.insertCell(2).innerText = product.status;
                row.insertCell(3).innerText = getCategoryName(product.categoryId);
                row.insertCell(4).innerText = product.price;
                row.insertCell(5).innerText = product.date;


                let actionCell = row.insertCell(6);
                let updateButton = document.createElement('button');
                updateButton.innerText = 'Edit';
                updateButton.addEventListener('click', function () {
                    window.location.href = "add_Product.html";

                    updateOrderStatus(product.id);
                });
                actionCell.appendChild(updateButton);

                let deleteButton = document.createElement('button');
                deleteButton.innerText = 'Delete';
                deleteButton.addEventListener('click', function () {
                    deleteProduct(product.id, product.categoryId);
                });
                actionCell.appendChild(deleteButton);
            });

            currentPageSpan.innerText = currentPage;
    }

    // Lấy category name theo id
    function getCategoryName(categoryId) {
       return categories.filter((category) => category.id == categoryId)[0].categoryName;
    }

    let idEdit1 = -1;
    function updateOrderStatus(orderId) {
        // ステータス更新処理
        let productInfo;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i].id == orderId) {
                productInfo = orders[i];
                idEdit1 = productInfo.id;
                break;
            }
            console.log(`Updating status for order ${orderId}`);
            // ここにステータス更新のロジックを実装

        }

    }

    function deleteProduct(productId,categoryId) {
        for(let i = 0; i < categories.length; i++) {
            // Tìm category hiện tại của sp muốn xóa
            if(categories[i].id == categoryId) {
                for(let j = 0; j < categories[i].products.length; j++) {

                    // Xoa product trong mảng product
                    if(categories[i].products[j].id == productId) {
                        categories[i].products.splice(j,1);
                    }
                }
            }
        }
        localStorage.setItem("categories",JSON.stringify(categories));
        // オーダー削除処理
        console.log(`Deleting order ${productId}`);
        location.reload()
    }

    // ページネーションの処理
    prevPageButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });
    nextPageButton.addEventListener('click', function () {
        if ((currentPage * ordersPerPage) < allProducts.length) {
            currentPage++;
            updateTable();
        }
    });

    updateTable();
});