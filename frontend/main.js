//Scroll features products
let imgScrool = document.getElementById('scrool-img');
let returnScrool = document.getElementById('return-img')
let imgHeader = document.getElementById('image-header');
var clickCounter = 0;

imgScrool.addEventListener('click', function () {
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

user_login()

function user_login() {
    registerBtn.addEventListener('click', function () {
        imgScrool.classList.toggle('new-scroll-img');
        let newHtml = `
        <div class="signup-container">
        <div class="signup-header">
            <h2>Create Account</h2>
        </div>
        <form id="sp-form" class="sp-form">
            <div class="sp-form-control">
                <label for="username">Username</label>
                <input type="text" placeholder="florinpop17" id="username" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Email</label>
                <input type="email" placeholder="a@florin-pop.com" id="email" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Password</label>
                <input type="password" placeholder="Password" id="password" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <div class="sp-form-control">
                <label for="username">Password check</label>
                <input type="password" placeholder="Password two" id="password2" />
                <i class="fas fa-check-circle"></i>
                <i class="fas fa-exclamation-circle"></i>
                <small>Error message</small>
            </div>
            <button>Submit</button>
        </form>
    </div>
        `
        singupContainer.innerHTML = newHtml;
    });
}