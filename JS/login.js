let span = document.getElementsByTagName('span');
let defaultBlue = "#006494";
let loginBtn = document.getElementById('register');
let password = document.getElementById("password");
let user = document.getElementById('usr');
let paswordWrong = "Password is wrong".split();

document.addEventListener('mouseup', function () {

    // reset isMouseDown to false when the mouse is released
  
    isMouseDown = false;
  
  });
  
  for (let i = 0; i < span.length; i++) {
  
    // add event listeners to each span
  
      span[i].addEventListener('mousedown', function (event) {
  
      // prevent the default action of selecting text
  
      event.preventDefault();
  
      // set isMouseDown to true and change the background color of the span
  
      isMouseDown = true;
      span[i].style.backgroundColor = defaultBlue;
    });
  
  
    span[i].addEventListener('mousemove', function () {
  
      // change the background color of the span if isMouseDown is true
  
      if (isMouseDown) {
        span[i].style.backgroundColor = defaultBlue;
      }
    });
  
    // change the background color of the span when the mouse is clicked
  
    span[i].addEventListener('click', function () {
      span[i].style.backgroundColor = defaultBlue;
    });
  
    // change the background color of the span when the mouse is released
  
    span[i].addEventListener('mouseleave', function () {
      if (isMouseDown) {
        span[i].style.backgroundColor = defaultBlue;
      }
    });
  }
  loginBtn.addEventListener('click', function () {
    let enteredUsername = user.value;
    let enteredPassword = password.value;
    let users = JSON.parse(localStorage.getItem("users"));
    let userIsValid = false;
    let correctPassword = "";

    for (let i = 0; i < users.length; i++) {
        if (enteredUsername === users[i].username) {
            userIsValid = true;
            correctPassword = users[i].password;
            break;
        }
    }
    if (userIsValid) {
        if (enteredPassword === correctPassword) {
            localStorage.setItem('loggedIn', true);
            password.style.border = "solid 1px green";
            window.location.href = "mainpage.html";
        } else {
            password.style.border = "solid 1px red";
        }
    } else {
        user.value = "Username doesn't exist";
    }
});

