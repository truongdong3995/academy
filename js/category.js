let categories = JSON.parse(localStorage.getItem('categories')) || []; // ローカルストレージからオーダーを取得
render(categories);

function render(categories) {
    let ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    let prevPageButton = document.getElementById('prevPage');
    let nextPageButton = document.getElementById('nextPage');
    let currentPageSpan = document.getElementById('currentPage');
    
    let currentPage = 1;
    let ordersPerPage = 10; 
    
   

    function updateTable() {
        ordersTable.innerHTML = ''; // テーブルをクリア
        let pageOrders = categories.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage);
        
        // テーブルにオーダーを追加
        
        pageOrders.forEach((category, index) => {
            let row = ordersTable.insertRow(index);
            row.insertCell(0).innerText = index + 1 ;
            row.insertCell(1).innerText = category.categoryName;
            row.insertCell(2).innerText = category.description;
            row.insertCell(3).innerText = category.status == 1 ? "Có sẵn" : "Hết hàng";
            row.insertCell(4).innerText = category.products.length;
            let actionCell = row.insertCell(5);
            let deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.addEventListener('click', function() {
                deleteCategory(category.id);
            });
            actionCell.appendChild(deleteButton);
        });

        currentPageSpan.innerText = currentPage;
    }
    
    // ページネーションの処理
    prevPageButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });
    nextPageButton.addEventListener('click', function() {
        if ((currentPage * ordersPerPage) < categoryId.length) {
            currentPage++;
            updateTable();
        }
    });

    updateTable();
};

function randomCategoryId() {
    return Math.floor(Math.random() * 99999999 + new Date().getMilliseconds());
}

function addCategory() {
    let name = document.getElementById("categoryName").value;
    let description = document.getElementById("description").value;
    let status = document.getElementById("status").value;
    if(status == "0") {
        alert("Hãy chọn status!")
        return;
    }
    if(name == "") {
        alert("Hãy nhap name!")
        return;
    }
    if(description == "") {
        alert("Hãy nhap name!")
        return;
    }

    let category = {
        id:randomCategoryId(),
        categoryName:name,
        description:description,
        status:status,
        products:[]
    }

    categories.push(category);
    localStorage.setItem("categories",JSON.stringify(categories));
    render(categories);
}

function deleteCategory(id) {
    let categories = JSON.parse(localStorage.getItem('categories')) || []; 
    categories = categories.filter((category) => category.id != id);
    localStorage.setItem("categories",JSON.stringify(categories));
    render(categories);
}