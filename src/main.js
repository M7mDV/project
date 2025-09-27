function setformmessage(formelement, type, message) {
  const messagelment = formelement.querySelector(".form_message");
  messagelment.textContent = message;
  messagelment.className = "form_message " + `form_message__${type}`;
}

function setinputerror(inputelement, message) {
  inputelement.classList.add("input_error");
  inputelement.parentElement.querySelector(".forminput__errormessage").textContent = message;
}

function removeinputerror(inputelement) {
  inputelement.classList.remove("input_error");
  inputelement.parentElement.querySelector(".forminput__errormessage").textContent = "";
}

function validatePasswords() {
  const pass1 = document.querySelector("#signup_password1").value;
  const pass2 = document.querySelector("#signup_password2");
  if (pass2.value.length > 0 && pass1 !== pass2.value) {
    setinputerror(pass2, "Passwords do not match");
  } else {
    removeinputerror(pass2);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginform = document.querySelector("#login");
  const createaccountform = document.querySelector("#createaccount");

  document.querySelector("#linkcreateform").addEventListener("click", e => {
    e.preventDefault();
    loginform.classList.add("form--hidden");
    createaccountform.classList.remove("form--hidden");
  });

  document.querySelector("#linkloginform").addEventListener("click", e => {
    e.preventDefault();
    createaccountform.classList.add("form--hidden");
    loginform.classList.remove("form--hidden");
  });

  // Handle login
  loginform.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(loginform);
    fetch("login.php", { method: "POST", body: fd })
      .then(res => res.json())
      .then(data => setformmessage(loginform, data.status, data.message))
      .catch(() => setformmessage(loginform, "error", "Network error"));
  });

  // Handle register
  createaccountform.addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(createaccountform);
    fetch("register.php", { method: "POST", body: fd })
      .then(res => res.json())
      .then(data => setformmessage(createaccountform, data.status, data.message))
      .catch(() => setformmessage(createaccountform, "error", "Network error"));
  });

  // Validation
  document.querySelector("#signup_password1").addEventListener("input", validatePasswords);
  document.querySelector("#signup_password2").addEventListener("input", validatePasswords);
});
