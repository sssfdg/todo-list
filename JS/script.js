const passwordInput = document.getElementById('password');
let span = document.getElementsByTagName('span');
let show = document.getElementById('show');
let inputs = document.getElementsByTagName('input');
let register = document.getElementById('register');
let header = document.getElementById('header');
let letters = "made with ❤".split("");
const meter = document.getElementsByClassName('meter')[0];
let isMouseDown = false;
document.addEventListener('mouseup', function () {
  isMouseDown = false;
});
for (let i = 0; i < span.length; i++) {
  span[i].addEventListener('mousedown', function (event) {
    event.preventDefault();
    isMouseDown = true;
    span[i].style.backgroundColor = '#006494';
  });
  span[i].addEventListener('mousemove', function () {
    if (isMouseDown) {
      span[i].style.backgroundColor = '#006494';
    }
  });
  span[i].addEventListener('click', function () {
    span[i].style.backgroundColor = '#006494';
  });
  span[i].addEventListener('mouseleave', function () {
    if (isMouseDown) {
      span[i].style.backgroundColor = '#006494';
    }
  });
}
for (let i = 0; i < span.length; i++) {
  span[i].textContent = letters[i]
}
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
  // check if password is empty or contains spaces
  if (!password || password.includes(' ')) {
    return 0;
  }
  let strength = 0;
  // check if password contains at least 1 lowercase letter
  if (password.match(/[a-z]/)) {
    strength++;
  }
  // check if password contains at least 1 uppercase letter
  if (password.match(/[A-Z]/)) {
    strength++;
  }
  // check if password contains at least 1 number
  if (password.match(/[0-9]/)) {
    strength++;
  }
  // check if password contains at least 1 special character
  if (password.match(/[!@#$%^&*]/)) {
    strength++;
  }
  // check if password is at least 6 characters
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
  let users = JSON.parse(localStorage.getItem('users')) || [];;
  let x = userCheck(users, inputs);
  let y = checkPassword(passwordInput.value);
  updateMeter(y);
  console.log(x, y);
  if (x && (y === 5)) {
    let user = {
      username: inputs[0].value.toLowerCase(),
      email: inputs[1].value.toLowerCase(),
      password: passwordInput.value
    };
    users.push(user);
    for (let i = 0; i <= 2; i++) {
      inputs[i].value = '';
    }
    meter.style.width = '0%';
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
  }
});
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
