//---------------------------------modals
const paymentImgURL = {
  mastercard: "img/master-card-img.png",
  visa: "img/visa-img.png",
};

const body = document.querySelector("body");
const openPaymentButtons = document.querySelectorAll("[data-payment-type]");
const paymentModal = document.querySelector("#payment");
const paymentImg = document.querySelector(".payment__img");
const closeModalButtons = document.querySelectorAll(".modal__close");
const overlay = document.getElementById("overlay");

openPaymentButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const modal = document.getElementById("payment");
    const paymentType = button.dataset.paymentType;

    paymentImg.setAttribute("src", paymentImgURL[paymentType]);
    paymentImg.setAttribute("alt", paymentType);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;

  body.style.overflowY = "hidden";
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;

  if (modal === paymentModal) {
    paymentImg.removeAttribute("src");
    paymentImg.removeAttribute("alt");
  }

  body.removeAttribute("style");
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

//-----------------------------------------form
const form = document.querySelector(".payment__form");
const textFields = Array.from(document.querySelectorAll(".text-field__input"));
const userName = document.querySelector("#user-name");
const userLastName = document.querySelector("#user-lastname");
const cardNumber = document.querySelector("#card-number");

// toggle styles onError functions
function setErrStyle(input) {
  input.classList.add("text-field__input--err");
}
function setUnErrStyle(input) {
  input.classList.remove("text-field__input--err");
}

// clean styles from error
textFields.forEach((field) => {
  field.addEventListener("input", () => {
    setUnErrStyle(field);
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  let allIsValid = true;

  // simple form validation;
  if (!/^[A-Za-z0-9_А-Яа-я]+$/.test(userName.value)) {
    allIsValid = false;
    setErrStyle(userName);
  }

  if (!/^[A-Za-z0-9_А-Яа-я]+$/.test(userLastName.value)) {
    allIsValid = false;
    setErrStyle(userLastName);
  }

  if (!/^[0-9]+$/.test(cardNumber.value) || cardNumber.value.length !== 16) {
    allIsValid = false;
    setErrStyle(cardNumber);
  }

  if (allIsValid) {
    textFields.forEach((field) => {
      field.value = '';
    });
    closeModal(paymentModal);
    alert('Your data submitted successfully!');
  }
});
