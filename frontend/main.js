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

//Login e register
const registerBtn = document.getElementById('sign-up');
const singupContainer = document.querySelector('.singup-container')

user_login()
function user_login() {
    registerBtn.addEventListener('click', function () {
        singupContainer.classList.toggle('show-singup-container');
    });
}