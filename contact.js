var inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


let submitButton = document.querySelector(".btn");
submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  let check = true;

  
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      check = false;
    }
  });

  let textarea = document.querySelector("textarea");
  if (textarea.value.trim() === "") {
    check = false;
  }

  
  if (check) {
    alert("Thank you for reaching out; we’ll get back to you soon.");
  } else {
    alert("Please fill out all forms.");
  }
});