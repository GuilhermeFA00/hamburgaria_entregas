//Scroll rating messages
const arrowIcon = document.querySelectorAll(".arrow");
const msgsList = document.querySelectorAll(".apr-list");

arrowIcon.forEach((arrow, index) => {
    const index_num = msgsList[index].querySelectorAll("img").length;
    let click_counter = 0;
    arrow.addEventListener('click', () => {
        const ratio = Math.floor(window.innerWidth / 270);
        click_counter++;
        if (index_num - (4 + click_counter) + (4 - ratio) >= 0) {
            msgsList[index].style.transform = `translateX(${msgsList[index].computedStyleMap().get("transform")[0].x.value - 300
                }px)`;
        } else {
            msgsList[index].style.transform = "translateX(0)";
            click_counter = 0;
        }
    });
});

//Login and register redirect
const signIn_btn = document.getElementById('sign-in');

redirect_loginPage();

function redirect_loginPage() {
    signIn_btn.addEventListener('click', () => {
        window.location.href = "http://127.0.0.1:5500/login/login.html";
    });
}

//Filtering categorys
const filterBtns = document.querySelectorAll('.carte-filter-btn');
const filterIts = document.querySelectorAll('.carte-filter-item');

addEventListener('DOMContentLoaded', () => {
    filterBtns[0].classList.add('carte-active-btn');
});

filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        showFilteredContent(btn)
    });
});

function showFilteredContent(btn) {
    filterIts.forEach((item) => {
        if (item.classList.contains(btn.id)) {
            resetActiveBtn();
            btn.classList.add('carte-active-btn');
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

function resetActiveBtn() {
    filterBtns.forEach((btn) => {
        btn.classList.remove('carte-active-btn');
    });
}


//CART
const productsLoad = document.querySelector('.products-apr');
const cartContainer = document.querySelector('.cart-container');
let cartItemID = 1;
const cartList = document.querySelector('.cart-list');
const cartCount_info = document.getElementById('cart-count-info');
const cartTotal_value = document.getElementById('cart-total-value');

cartEvents();
function cartEvents() {
    addEventListener('DOMContentLoaded', () => {
        loadJSON();
        loadCart();
    });

    let cartBtn = document.getElementById('cart-btn');
    cartBtn.addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container');
    });

    productsLoad.addEventListener('click', purchaseProduct);

    cartList.addEventListener('click', delProduct);
}

function loadJSON() {
    fetch('products.json')
        //I'm using "Arrow Functions" inside promises, to reduce my code
        .then(response => response.json())
        .then(data => {
            let Newhtml = '';
            //Returning all data from JSON file
            data.forEach(product => {
                Newhtml += `
            <div class = "product-item">
            <div class = "product-img">
                <img src = "${product.imgSrc}" alt = "product image">
                <button type = "button" class = "add-to-cart-btn">
                    <i class = "fas fa-shopping-cart"></i>Add To Cart
                </button>
            </div>
            <div class = "product-content">
                <h3 class = "product-name">${product.name}</h3>
                <p class = "product-value">$${product.value}</p>
            </div>
        </div>
            ` ;
            });
            productsLoad.innerHTML = Newhtml;
        })
        //it is necessary to use a Local server or something related to load the content, otherwise an error will be returned.
        .catch(error => {
            alert(`User live server or local server`);
            //URL scheme must be "http" or "https" for CORS request. You need to be serving your index.html locally or have your site hosted on a live server somewhere for the Fetch API to work properly.
        })
}

function purchaseProduct(ev) {
    if (ev.target.classList.contains('add-to-cart-btn')) {
        let product = ev.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        imgSrc: product.querySelector('.product-img img').src,
        name: product.querySelector('.product-name').textContent,
        value: product.querySelector('.product-value').textContent
    }
    cartItemID++;
    addToCL(productInfo);
    saveProductInStrg(productInfo);
}

function addToCL(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', `${product.id}`);
    cartItem.innerHTML = `
    <img src="${product.imgSrc}" alt="product image">
    <div class="cart-item-info">
    <h3 class="cart-item-name">${product.name}</h3>
    <span class="cart-item-value">${product.value}</span>
    </div>
    <button type="button" class="cart-item-del-btn">
        <i class="fas fa-times"></i>
    </button>
    `;
    cartList.appendChild(cartItem);
}

function getProductFromStrg() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
}

function findCartInfo() {
    let products = getProductFromStrg();
    let total = products.reduce((accumulator, product) => {
        let value = parseFloat(product.value.substr(1));
        return accumulator += value;
    }, 0);

    return {
        total: total.toFixed(2),
        productCount: products.length
    }
}

function updateCartInfo() {
    let cartInfo = findCartInfo();
    cartCount_info.textContent = cartInfo.productCount;
    cartTotal_value.textContent = cartInfo.total;
}

function saveProductInStrg(item) {
    let products = getProductFromStrg();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products));
    updateCartInfo();
}

function loadCart() {
    let products = getProductFromStrg();
    if (products.length < 1) {
        cartItemID = 1;
    } else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    products.forEach(product => addToCL(product));

    updateCartInfo();
}

function delProduct(event) {
    let cartItem;
    if (event.target.tagName === "BUTTON") {
        cartItem = event.target.parentElement;
        cartItem.remove();
    } else if (event.target.tagName === "I") {
        cartItem = event.target.parentElement.parentElement;
        cartItem.remove();
    }
    let products = getProductFromStrg();
    let updateProducts_strg = products.filter(product => {
        return product.id !== parseInt(cartItem.dataset.id);
    });
    localStorage.setItem('products', JSON.stringify(updateProducts_strg));
    updateCartInfo();
}