let span = document.getElementsByTagName('span');
let show = document.getElementById('show');
let inputs = document.getElementsByTagName('input');
let register = document.getElementById('register');
let header = document.getElementById('header');
let letters = "made with ❤".split("")
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
// setTimeout(function() {
//   for (let i = 0; i < span.length; i++) {
//     span[i].style.opacity = 0
//   }
// }, 5000)
// setTimeout(function() {
//   for (let i = 0; i < span.length; i++) {
//     span[i].textContent = ''
//     span[i].style.opacity = 1
//     }
// }, 6000)
function userCheck(users, inputs) {
  // check if inputs are empty
  if (inputs[0].value === '' || inputs[1].value === '') {
    inputs[0].style.border = '1px solid red';
    inputs[1].style.border = '1px solid red';
    inputs[0].value = 'username is required';
    inputs[1].value = 'email is required';
    return false;
  }

  // check if username or email already exists
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === inputs[0].value.toLowerCase()) {
      inputs[0].style.border = '1px solid red';
      inputs[0].value = 'username already exists';
      return false;
    } else if (users[i].email === inputs[1].value.toLowerCase()) {
      inputs[1].style.border = '1px solid red';
      inputs[1].value = 'email already exists';
      return false;
    }
  }

  // check if username is at least 3 characters
  if (inputs[0].value.length < 3) {
    inputs[0].style.border = '1px solid red';
    inputs[0].value = 'username must be at least 3 characters';
    return false;
  }
  // check if username does not contain spaces
  if (inputs[0].value.includes(' ')) {
    inputs[0].style.border = '1px solid red';
    inputs[0].value = 'username cannot contain spaces';
    return false;
  }
  
  // check if email does not contain spaces
  if (inputs[1].value.includes(' ')) {
    inputs[1].style.border = '1px solid red';
    inputs[1].value = 'email cannot contain spaces';
    return false;
  }

  // if all checks pass, reset border color of input fields
  inputs[0].style.border = 'none';
  inputs[1].style.border = 'none';
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
  const meter = document.getElementsByClassName('meter')[0];
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
  const passwordInput = document.getElementById('password');
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
    inputs[0].value = '';
    inputs[1].value = '';
    passwordInput.value = '';
    meter.style.width = '0%';
    localStorage.setItem('users', JSON.stringify(users));
    alert('Registration successful!');
  } else {
    alert('Registration unsuccessful!');
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
