
//variables and constants

const passwordInput = document.getElementById('password');
let span = document.getElementsByTagName('span');
let show = document.getElementById('show');
let inputs = document.getElementsByTagName('input');
let register = document.getElementById('register');
let header = document.getElementById('header');
let letters = "made with ❤".split("");
const meter = document.getElementsByClassName('meter')[0];
let isMouseDown = false;

//functions and loops

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
    span[i].style.backgroundColor = '#006494';
  });


  span[i].addEventListener('mousemove', function () {

    // change the background color of the span if isMouseDown is true

    if (isMouseDown) {
      span[i].style.backgroundColor = '#006494';
    }
  });

  // change the background color of the span when the mouse is clicked

  span[i].addEventListener('click', function () {
    span[i].style.backgroundColor = '#006494';
  });

  // change the background color of the span when the mouse is released

  span[i].addEventListener('mouseleave', function () {
    if (isMouseDown) {
      span[i].style.backgroundColor = '#006494';
    }
  });
}

//set the text content of each span to the corresponding letter in the letters array

for (let i = 0; i < span.length; i++) {
  span[i].textContent = letters[i]
}

//add event listeners to the password input and show button to toggle the password visibility

passwordInput.addEventListener('focus', function() {
  show.style.opacity = 1;
});

function userCheck(users, inputs) {

  // check if inputs are empty

for (let i = 0; i <= 1; i++) {
  if (inputs[i].value === '') {
    inputs[i].style.border = '1px solid red';
    inputs[i].value = `${inputs[i].name} is required`;
    if (i === 1) {
      return false;
    }
  }
}
  // check if username or email already exists

  for (let i = 0; i <= 1; i++) {
    const input = inputs[i];
  
    for (let j = 0; j < users.length; j++) {
      const user = users[j];
  
      if (input.name.toLowerCase() === 'username' && user.username === input.value.toLowerCase()) {
        input.style.border = '1px solid red';
        input.value = `${input.name} already exists`;
        return false;
      } else if (input.name.toLowerCase() === 'email' && user.email === input.value.toLowerCase()) {
        input.style.border = '1px solid red';
        input.value = `${input.name} already exists`
        return false;
      }
    }
  
    // Reset the border style if the value does not already exist in the users array

    input.style.border = 'none';
  }

  for (let i = 0; i <= 1; i++) {
    const input2 = inputs[i];
  
    // Check if the input value is at least 3 characters

    if (input2.name.toLowerCase() === 'username' && input2.value.length < 3) {
      input2.style.border = '1px solid red';
      input2.value = `${input2.name} must be at least 3 characters`;
      return false;
    }
  
    // Check if the input value does not contain spaces

    if (input2.value.includes(' ')) {
      input2.style.border = '1px solid red';
      input2.value = `${input2.name} cannot contain spaces`;
      return false;
  }
    // Reset the border style if the value passes all checks

    input2.style.border = 'none';
  }
  return true;
}

function checkPassword(password) {

  // check if password is empty or contains spaces and return 0 if true

  if (!password || password.includes(' ')) {
    return 0;
  }
  let strength = 0;

  // define the strength of the password based on the following matches

  if (password.match(/[a-z]/)) {
    strength++;
  }
  if (password.match(/[A-Z]/)) {
    strength++;
  }
  if (password.match(/[0-9]/)) {
    strength++;
  }
  if (password.match(/[!@#$%^&*]/)) {
    strength++;
  }
  if (password.length >= 6) {
    strength++;
  } else {
    return 0;
  }
  return strength;
}
function updateMeter(strength) {

  // set background color and width of meter based on strength

  meter.classList.remove('d-none');
  switch (true) {
    case strength < 3:
      meter.style.backgroundColor = 'red';
      meter.style.width = '25%';
      break;
    case strength < 5:
      meter.style.backgroundColor = 'orange';
      meter.style.width = '50%';
      break;
    default:
      meter.style.backgroundColor = 'green';
      meter.style.width = '100%';
  }
}

register.addEventListener('click', function(e) {
  e.preventDefault();

  // get the users array from localStorage or set it to an empty array if it does not exist

  let users = JSON.parse(localStorage.getItem('users')) || [];;
  let x = userCheck(users, inputs);
  let y = checkPassword(passwordInput.value);
  updateMeter(y);

  // check if userCheck and checkPassword return true and push the user object to the users array

  if (x && (y === 5)) {
    let user = {
      username: inputs[0].value.toLowerCase(),
      email: inputs[1].value.toLowerCase(),
      password: passwordInput.value
    };
    users.push(user);

    // reset the inputs and meter

    for (let i = 0; i <= 2; i++) {
      inputs[i].value = '';
    }
    meter.style.width = '0%';
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
  }
});

// toggle the password visibility

show.addEventListener('click', function () {
    if (inputs[2].type === 'password') {
        inputs[2].type = 'text';
        show.textContent = 'Hide';
    }
    else {
        inputs[2].type = 'password';
        show.textContent = 'Show';
    }
}); 
