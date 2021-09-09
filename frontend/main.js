//Scroll features products
let imgScrool = document.getElementById('scrool-img');
let returnScrool = document.getElementById('return-img')
let imgHeader = document.getElementById('image-header');
var clickCounter = 0;

imgScrool.addEventListener('click', () => {
    if (clickCounter >= 2) {
        clickCounter = -1;
        changeImg_next();
    } if (clickCounter <= 2) {
        clickCounter++;
        changeImg_next();
    }
});

function changeImg_next() {
    if (clickCounter == 0) {
        imgHeader.src = './src/imgs/hamb1.jpg';
    }
    if (clickCounter == 1) {
        imgHeader.src = './src/imgs/hamb2.jpg';
    }
    if (clickCounter == 2) {
        imgHeader.src = './src/imgs/hamb3.jpg';
    }
}


//Login and register
const registerBtn = document.getElementById('sign-up');
const singupContainer = document.querySelector('.singup-container')

user_login();

function user_login() {
    registerBtn.addEventListener('click', () => {
        let newHtml = `
        <div class="signup-container">
        <div class="signup-header">
            <h2>Cadastre-se</h2>
        </div>
        <form id="sp-form" class="sp-form">
            <button id="signup-exit"><i class="fas fa-times"></i></button>
            <div class="sp-form-control">
                <label for="username">Username</label>
                <input type="text" placeholder="usuário18" id="username" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Email</label>
                <input type="email" placeholder="hello@xxx.com" id="email" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Senha</label>
                <input type="password" placeholder="Password" id="password" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Confirme a senha</label>
                <input type="password" placeholder="Password two" id="password2" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <button>Enviar</button>
        </form>
    </div>
        `
        imgScrool.id = "new-scroll-img";
        singupContainer.innerHTML = newHtml;
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