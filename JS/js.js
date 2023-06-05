//點擊menu漢堡選單時展開
$(document).ready(function () {
  $('.menu-icon').click(function () {
    $('.menu').toggleClass('menu-show');
  });
});

//點擊manu#產生滑動
$('a[href^="#"]').on('click', function (event) {
  var target = $(this.getAttribute('href'));
  if (target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top
    }, 10);
  }
});


//banner 載入index.html 時，文字backInDown效果
const isIndexPage = (document.location.pathname === '/index.html');
const isCartPage = (document.location.pathname === '/cart.html');
if (isIndexPage) {
  const elements = document.querySelectorAll('.animate__backInDown');

  elements.forEach(element => {
    element.classList.add('animate__animated');
    setTimeout(() => {
      element.classList.add('animate__backInDown');
    }, 500);
  });
}

//漢堡選單時點擊#，menu自動收合
// 取得所有的選單連結
const menuLinks = document.querySelectorAll('.menu a');

// 為每個選單連結加上點擊事件
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    // 移除 .menu-show 的 class
    document.querySelector('.menu').classList.remove('menu-show');
  });
});





//index.html  關鍵字搜索產品列表中的產品

if (isIndexPage) {
  //獲取搜索欄位和搜索按鈕及產品標題元素
  const searchButton = document.querySelector('#search-button');
  searchButton.addEventListener('click', function (event) {
    // 獲取搜尋關鍵字，轉換為小寫並去除空白字符
    const keyword = document.querySelector('#search-input').value.trim().toLowerCase();
    // 搜索所有產品標題，隱藏未匹配的產品，顯示匹配的產品
    const products = document.querySelectorAll('.product-item');
    for (let i = 0; i < products.length; i++) {
      const productName = products[i].querySelector('.product-name');
      const text = productName.textContent.trim().toLowerCase();
      if (text.includes(keyword)) {
        products[i].classList.remove('hidden');
      } else {
        products[i].classList.add('hidden');
      }
    }

    event.preventDefault(); // 阻止表單提交行為
    // 追加跳轉到商品列表的行
    location.href = "#product-head";
  });
}


// const currentUrl = window.location.href;
// const isIndexPage = currentUrl.includes('index.html');

if (isIndexPage) {
  //獲取product-list-show按鈕
  const showAllBtn = document.querySelector('#show-all-btn');
  //新增點擊#show-all-btn事件，顯示所有產品
  showAllBtn.addEventListener('click', function () {
    const products = document.querySelectorAll('.product-item.hidden');
    products.forEach(function (product) {
      product.classList.remove('hidden');
    });
  });

  //跳轉#product-head 增加paddingTop值
  const headerHeight = document.querySelector('header').offsetHeight; // 獲取 header 的高度
  const productHead = document.querySelector('#product-head'); // 獲取 #product-head 元素
  productHead.style.paddingTop = (headerHeight + 20) + 'px'; // 給 #product-head 元素設定一個 padding-top 偏移量

}










//spec-btn 按鈕點選顏色變更

//原生JS寫法
//選擇每個產品規格按鈕容器元素
if (isIndexPage) {
  const productSpecsContainers = document.querySelectorAll('.product-specs');
  // 為每個容器元素中的規格按鈕添加點擊事件監聽器
  productSpecsContainers.forEach(container => {
    const specBtns = container.querySelectorAll('.spec-btn');

    specBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 如果按鈕已經是活躍狀態，則刪除active類
        if (btn.classList.contains('active')) {
          btn.classList.remove('active');
        }
        // 如果按鈕不是活躍狀態，則從所有按鈕中刪除active類，並將其添加到當前點擊的按鈕中
        else {
          specBtns.forEach(otherBtn => {
            otherBtn.classList.remove('active');
          });
          btn.classList.add('active');
        }
      });
    });
  });
}

//JQuery寫法
// 選擇每個產品規格按鈕容器元素
// $('.product-specs').each(function() {
//   var specBtns = $(this).find('.spec-btn');

//   specBtns.on('click', function() {
//     var btn = $(this);

//     // 如果按鈕已經是活躍狀態，則刪除active類
//     if (btn.hasClass('active')) {
//       btn.removeClass('active');
//     }
//     // 如果按鈕不是活躍狀態，則從所有按鈕中刪除active類，並將其添加到當前點擊的按鈕中
//     else {
//       specBtns.removeClass('active');
//       btn.addClass('active');
//     }
//   });
// });




//規格、數量連動 單價及總價格
// 定義商品項目元素
if (isIndexPage) {
  const productItems = document.querySelectorAll('.product-item');

  // 迭代商品項目元素
  productItems.forEach(item => {
    // 獲取商品規格元素和數量輸入框元素
    const specs = item.querySelector('.product-specs');
    const quantityInput = item.querySelector('.quantity-input');

    // 迭代商品規格按鈕元素，為每個按鈕設置點擊事件
    const specBtns = specs.querySelectorAll('.spec-btn');
    specBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // 獲取選中的規格價格和重量
        const selectedPrice = btn.getAttribute('data-price');
        const selectedWeight = btn.getAttribute('data-weight');

        // 更新單價和總價格元素的值
        const unitPrice = item.querySelector('.unit-price .price-value');
        const totalPrice = item.querySelector('.total-price .price-value');
        unitPrice.textContent = selectedPrice;
        totalPrice.textContent = selectedPrice;

        // 更新數量輸入框的值
        quantityInput.value = 1;

        // 將所有規格按鈕設置為未選中狀態，將選中的規格按鈕設置為選中狀態
        specBtns.forEach(btn => btn.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // 為數量減少按鈕設置點擊事件
    const minusBtn = item.querySelector('.minus-btn');
    minusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      if (value > 1) {
        value--;
        quantityInput.value = value;
      }
      updateTotalPrice();
    });

    // 為數量增加按鈕設置點擊事件
    const plusBtn = item.querySelector('.plus-btn');
    plusBtn.addEventListener('click', () => {
      let value = parseInt(quantityInput.value);
      value++;
      quantityInput.value = value;
      updateTotalPrice();
    });

    // 為數量輸入框設置輸入事件
    quantityInput.addEventListener('input', () => {
      let value = parseInt(quantityInput.value);
      if (isNaN(value) || value <= 0) {
        quantityInput.value = 1;
      }
      updateTotalPrice();
    });

    // 定義更新總價格的函數
    function updateTotalPrice() {
      const unitPrice = parseInt(item.querySelector('.unit-price .price-value').textContent);
      let quantity = parseInt(quantityInput.value);
      const totalPrice = item.querySelector('.total-price .price-value');
      totalPrice.textContent = unitPrice * quantity;
    }
  });

}

// 在index.html 加入購物/直接結帳  生成購物清單

// 加入購物車按鈕事件處理


if (isIndexPage) {
  for (var i = 1; i <= 5; i++) {
    var addToCartBtn = document.getElementById('add-to-cart-btn-' + i);
    addToCartBtn.addEventListener('click', addToCart.bind(null, i));
  }

  // 直接結帳按鈕事件處理
  for (var i = 1; i <= 5; i++) {
    var checkoutBtn = document.getElementById('checkout-btn-' + i);
    checkoutBtn.addEventListener('click', checkout.bind(null, i));
  }




  function addToCart(productId) {
    // 獲取商品資訊
    var productElement = document.getElementById('product' + productId);
    var productName = productElement.querySelector('.product-name').getAttribute('data-product-name');
    var productSpecButtons = productElement.querySelectorAll('.spec-btn');
    var selectedSpec = null;
    var productPrice = null;
    var productQuantity = productElement.querySelector('.quantity-input').value;

    // 找到被選中的規格按鈕
    for (var i = 0; i < productSpecButtons.length; i++) {
      var button = productSpecButtons[i];
      if (button.classList.contains('active')) {
        selectedSpec = button.getAttribute('data-spec');
        productPrice = button.getAttribute('data-price');
        break;
      }
    }

    // 確保找到了被選中的規格按鈕
    if (selectedSpec && productPrice) {
      // 儲存資訊至 localStorage
      var cartItem = {
        name: productName,
        spec: selectedSpec,
        price: productPrice,
        quantity: productQuantity
      };

      var cartList = localStorage.getItem('cartList');
      if (cartList) {
        cartList = JSON.parse(cartList);
      } else {
        cartList = [];
      }

      cartList.push(cartItem);
      localStorage.setItem('cartList', JSON.stringify(cartList));



      // 更新購物車狀態
      updateCartStatus();

      window.location.href = 'cart.html'; // 導向到 cart.html
    }
  }

  // 修改 checkout() 函式
  function checkout(productId) {
    addToCart(productId); // 將點擊的商品加入購物車

    var cartList = localStorage.getItem('cartList');
    if (cartList) {
      cartList = JSON.parse(cartList);

      // 執行結帳相關邏輯
      // ...

      // 清空購物車
      cartList = [];
      localStorage.setItem('cartList', JSON.stringify(cartList));

      // 更新購物車狀態
      updateCartStatus();
    }
  }

  // 修改 updateCartStatus() 函式
  function updateCartStatus() {
    var cartList = localStorage.getItem('cartList');
    if (cartList) {
      cartList = JSON.parse(cartList);

      // 獲取購物清單容器元素
      var cartItemsContainer = document.querySelector('.cart-items');

      // 清空購物清單
      cartItemsContainer.innerHTML = '';


      // 重新生成購物清單項目
      for (var i = 0; i < cartList.length; i++) {
        var cartItem = cartList[i];

        var row = document.createElement('tr');
        var nameCell = document.createElement('td');
        var specCell = document.createElement('td');
        var priceCell = document.createElement('td');
        var quantityCell = document.createElement('td');
        var subtotalCell = document.createElement('td');
        var removeBtnCell = document.createElement('td');
        var removeBtn = document.createElement('button');


        nameCell.innerText = cartItem.name;
        specCell.innerText = cartItem.spec;
        priceCell.innerText = cartItem.price;
        quantityCell.innerText = cartItem.quantity;
        subtotalCell.innerText = cartItem.price * cartItem.quantity;

        removeBtn.innerText = '移除';
        removeBtn.addEventListener('click', removeCartItem.bind(null, i));

        removeBtnCell.appendChild(removeBtn);

        row.appendChild(nameCell);
        row.appendChild(specCell);
        row.appendChild(priceCell);
        row.appendChild(quantityCell);
        row.appendChild(subtotalCell);
        row.appendChild(removeBtnCell);


        cartItemsContainer.appendChild(row);
      }

      // 更新購物車狀態顯示
      var subtotal = calculateSubtotal(cartList);
      document.getElementById('subtotal').innerText = subtotal.toFixed(2);
      document.getElementById('total').innerText = subtotal.toFixed(2);
    }
  }

  // 計算小計
  function calculateSubtotal(cartList) {
    var subtotal = 0;
    for (var i = 0; i < cartList.length; i++) {
      var item = cartList[i];
      var itemPrice = parseFloat(item.price);
      var itemQuantity = parseInt(item.quantity);
      var itemTotal = itemPrice * itemQuantity;
      subtotal += itemTotal;
    }
    return subtotal;
  }

  // 修改 removeCartItem() 函式
  function removeCartItem(index) {
    var cartList = localStorage.getItem('cartList');
    if (cartList) {
      cartList = JSON.parse(cartList);

      // 從購物車清單中移除商品
      cartList.splice(index, 1);
      localStorage.setItem('cartList', JSON.stringify(cartList));

      // 更新購物車狀態
      updateCartStatus();
    }
  }
}
// 在 cart.html 載入時更新購物車狀態
if (isCartPage) {
  document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
  });

  function displayCartItems() {
    var cartList = localStorage.getItem('cartList');
    var cartItemsContainer = document.querySelector('.cart-items');
    var cartEmptyElement = document.querySelector('.cart-empty');
    var cartScrollX = document.querySelector('.cart-items-scroll-X');
    var totalElement = document.querySelector('.total');

    if (!cartList || JSON.parse(cartList).length === 0) {
      // cartList為空或長度為0時的處理
      cartItemsContainer.innerHTML = '';
      cartEmptyElement.innerHTML = "<p>購物車是空的。<br>繼續瀏覽產品列表，選擇你想要的產品。</p>";
      cartScrollX.style.display = 'none';
      totalElement.style.display = 'none';
    } else {
      // cartList不為空時的處理
      cartEmptyElement.innerHTML = "";
      cartScrollX.style.display = 'block';
      totalElement.style.display = 'flex';
    }
      if (cartList) {
        cartList = JSON.parse(cartList);

        // 獲取購物清單容器元素
        var cartItemsContainer = document.querySelector('.cart-items');
        cartItemsContainer.innerHTML = '';

        // 重新生成購物清單項目
        for (var i = 0; i < cartList.length; i++) {
          var cartItem = cartList[i];

          var row = document.createElement('tr');
          var nameCell = document.createElement('td');
          var specCell = document.createElement('td');
          var priceCell = document.createElement('td');
          var quantityCell = document.createElement('td');
          var subtotalCell = document.createElement('td');
          var removeBtnCell = document.createElement('td');
          var removeBtn = document.createElement('button');


          nameCell.innerText = cartItem.name;
          specCell.innerText = cartItem.spec;
          priceCell.innerText = '$' + cartItem.price;
          quantityCell.innerText = cartItem.quantity;
          subtotalCell.innerText = '$' + (cartItem.price * cartItem.quantity);

          removeBtn.innerText = '移除';
          removeBtn.addEventListener('click', removeCartItem.bind(null, i));

          removeBtnCell.appendChild(removeBtn);

          row.appendChild(nameCell);
          row.appendChild(specCell);
          row.appendChild(priceCell);
          row.appendChild(quantityCell);
          row.appendChild(subtotalCell);
          row.appendChild(removeBtnCell);


          cartItemsContainer.appendChild(row);
        }

        // 計算小計和總金額
        var freightElement = document.querySelector('.shipping span');
        var freightValue = parseFloat(freightElement.getAttribute('date-freight'));

        var subtotal = calculateSubtotal(cartList);
        var total = subtotal + freightValue;



        // 設定總金額元素的內容
        var grandTotalElement = document.querySelector('.cart-grand-total-value');
        grandTotalElement.innerText = '$' + total.toFixed(0);
      }





    }

    function removeCartItem(index) {
      var cartList = localStorage.getItem('cartList');
      if (cartList) {
        cartList = JSON.parse(cartList);

        // 從購物車清單中移除商品
        cartList.splice(index, 1);
        localStorage.setItem('cartList', JSON.stringify(cartList));

        // 重新顯示購物清單
        displayCartItems();
      }
    }

    function calculateSubtotal(cartList) {
      var subtotal = 0;
      for (var i = 0; i < cartList.length; i++) {
        var item = cartList[i];
        var itemPrice = parseFloat(item.price);
        var itemQuantity = parseInt(item.quantity);
        var itemTotal = itemPrice * itemQuantity;
        subtotal += itemTotal;
      }
      return subtotal;
    }
  }