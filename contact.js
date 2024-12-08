let inputs = document.querySelectorAll(".input");

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

// Add form validation on submit button click
let submitButton = document.querySelector(".btn");
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  let check = true;

  // Check all input fields
  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      check = false;
    }
  });

  // Check textarea field
  let textarea = document.querySelector("textarea");
  if (textarea.value.trim() === "") {
    check = false;
  }

  // Display appropriate message
  if (check) {
    alert("Thank you for reaching out; we’ll get back to you soon.");
  } else {
    alert("Please fill out all forms.");
  }
});