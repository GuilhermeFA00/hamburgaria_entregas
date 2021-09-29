function clearInput_error(inputEl) {
    inputEl.classList.remove("form__input--error");
    inputEl.parentElement.querySelector(".form__input-error-message").textContent = "";
}

function setInput_error(inputEl, msg) {
    inputEl.classList.add("form__input--error");
    inputEl.parentElement.querySelector(".form__input-error-message").textContent = msg;
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAcc_form = document.querySelector("#createAccount");

    const link_createAcc = document.querySelector("#linkCreateAccount");
    link_createAcc.addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAcc_form.classList.remove("form--hidden");
    });

    const loginLink = document.querySelector("#linkLogin");
    loginLink.addEventListener('click', e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAcc_form.classList.add("form--hidden");
    });

    const inputContents = document.querySelectorAll(".form__input");
    inputContents.forEach(inputEl => {
        inputEl.addEventListener('blur', e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 8) {
                setInput_error(inputEl, "Seu nome de usuário tem que ter no minímo 8 caracteres");
            }
        });
        inputEl.addEventListener('input', e => {
            clearInput_error(inputEl);
        });
    });
});