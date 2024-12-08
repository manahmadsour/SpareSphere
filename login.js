var logInEmail = document.getElementById("lemail");
var logInPass = document.getElementById("lpassword");
var logInButton = document.getElementById("log");
var signUpUsername = document.getElementById("username");
var signUpEmail = document.getElementById("semail");
var signUpPass = document.getElementById("spassword");
var signUpButton = document.getElementById("sign");
var emailAlert = document.getElementById("emailAlert");
var passAlert = document.getElementById("passAlert");
var dataArr = [];
var currentIndex = 0;

if (JSON.parse(localStorage.getItem("userData")) != null) {
  dataArr = JSON.parse(localStorage.getItem("userData"));
}

signUpButton.addEventListener("click", signUpUser);
logInButton.addEventListener("click", checkValidData);

function clearLoginFields() {
    logInEmail.value = "";
    logInPass.value = "";
  }
  
  window.addEventListener("DOMContentLoaded", clearLoginFields);

function showAlert(message, type = "success") {
  let alertContainer = document.createElement("div");
  alertContainer.textContent = message;

  Object.assign(alertContainer.style, {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px 20px",
    backgroundColor:
      type === "success" ? "rgba(0, 123, 255, 0.8)" : "rgba(220, 53, 69, 0.9)", 
    color: "white",
    borderRadius: "5px",
    fontSize: "16px",
    zIndex: "9999",
    opacity: "1",
    transition: "opacity 0.5s ease-in-out",
  });

  document.body.appendChild(alertContainer);

  setTimeout(() => {
    alertContainer.style.opacity = "0";
    setTimeout(() => {
      alertContainer.remove();
    }, 500);
  }, 2000);
}

function signUpUser(event) {
  event.preventDefault();

  if (signUpUsername.value === "000" && signUpEmail.value === "000" && signUpPass.value === "000") {

    if (dataArr.length > 0) {
      let accounts = dataArr.map(
        (user, index) => `Account ${index + 1}: Username: ${user.username}, Email: ${user.email}`
      ).join("\n");
      showAlert("Showing all signed-up accounts in console.", "success");
      console.log("Signed-up Accounts:\n" + accounts);
    } else {
      showAlert("No accounts found in local storage.", "error");
    }
    return;
  }
  if (signUpUsername.value === "999" && signUpEmail.value === "999" && signUpPass.value === "999") {
    let confirmation = prompt("Type 'confirm' to clear all user accounts:");
    if (confirmation && confirmation.toLowerCase() === "confirm") {
      localStorage.removeItem("userData");
      dataArr = [];
      showAlert("All user accounts have been cleared!", "success");
      clearSignUpFields();
    } else {
      showAlert("Action canceled. User accounts were not cleared.", "error");
    }
    return;
  }

  if (signUpEmail.value && signUpPass.value && signUpUsername.value) {
    var user = {
      username: signUpUsername.value,
      email: signUpEmail.value,
      pass: signUpPass.value,
    };

    dataArr.push(user);
    localStorage.setItem("userData", JSON.stringify(dataArr));
    showAlert("Sign-up successful!", "success");
    clearSignUpFields();
  } else {
    showAlert("Please fill in all the fields to sign up.", "error");
  }
}

function checkValidData(event) {
  event.preventDefault();

  var valid = false;
  for (var i = 0; i < dataArr.length; i++) {
    if (
      logInEmail.value == dataArr[i].email &&
      logInPass.value == dataArr[i].pass
    ) {
      valid = true;
      currentIndex = i;
      break;
    }
  }

  if (valid) {
    showAlert(`Welcome back, ${dataArr[currentIndex].username}!`, "success");
   // moveToHomePage();
  } else {
    showAlert("Invalid email or password.", "error");
  }
}

/*/function moveToHomePage() {
  localStorage.setItem("currentUserIndex", currentIndex);
  window.location.href = "index.html";
}
*/
function clearSignUpFields() {
  signUpUsername.value = "";
  signUpEmail.value = "";
  signUpPass.value = "";
}

function validateEmailInput(inputField, alertField) {
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (!emailRegex.test(inputField.value)) {
    inputField.classList.add("is-invalid");
    inputField.classList.remove("is-valid");
    alertField.classList.remove("d-none");
    return false;
  } else {
    inputField.classList.remove("is-invalid");
    inputField.classList.add("is-valid");
    alertField.classList.add("d-none");
    return true;
  }
}

function validatePasswordInput(inputField, alertField) {
  var passRegex = /^[a-zA-Z0-9!@#\$%\^\&*_=+-]{4,15}$/;
  if (!passRegex.test(inputField.value)) {
    inputField.classList.add("is-invalid");
    inputField.classList.remove("is-valid");
    alertField.classList.remove("d-none");
    return false;
  } else {
    inputField.classList.remove("is-invalid");
    inputField.classList.add("is-valid");
    alertField.classList.add("d-none");
    return true;
  }
}
