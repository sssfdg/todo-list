let span = document.getElementsByTagName('span');
let show = document.getElementById('show');
let inputs = document.getElementsByTagName('input');
let meter = document.getElementsByClassName('meter')[0];
let register = document.getElementById('register');
let header = document.getElementById('header');
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
function checkPassword(password, minLength = 8, minStrength = 4) {
  if (password.length === 0) {
    return false;
  }
  // check if password contains spaces
  if (password.includes(' ')) {
    return false;
  }
  let strength = 0;
  const conditions = [
    password.length >= minLength,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!@#\$%\^&\*]/.test(password)
  ];

  for (const condition of conditions) {
    strength += condition ? 1 : 0;
  }
  meter.classList.remove('d-none');
  if (strength < minStrength) {
    meter.style.width = `20%`;
    meter.style.backgroundColor = "red";
  } else if (strength === minStrength) {
    meter.style.width = `${strength * 20}%`;
    meter.style.backgroundColor = "orange";
  } else if (strength === 5) {
    meter.style.width = `${strength * 20}%`;
    meter.style.backgroundColor = "green";
  }
  return strength >= minStrength;
}



register.addEventListener('click', function(e) {
  e.preventDefault();
  let users = JSON.parse(localStorage.getItem('users')) || [];;
  const passwordInput = document.getElementById('password');
  let x = userCheck(users, inputs);
  let y = checkPassword(passwordInput.value);
  if (x && y) {
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
  }
  localStorage.setItem('users', JSON.stringify(users));
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
