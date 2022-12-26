let span = document.getElementsByTagName('span');
let show = document.getElementById('show');
let inputs = document.getElementsByTagName('input');
let meter = document.getElementsByClassName('meter')[0];
let register = document.getElementById('register');
let header = document.getElementById('header');
let strength = 0;
let isMouseDown = false;
let users = [];
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
      else if (inputs[0].value.length < 3) {
        inputs[0].style.border = '1px solid red';
        inputs[0].value = 'username must be at least 3 characters';
        return false;
      }
    }
    return true;
  }
  
  function checkPasswordPolicy(inputs) {
      const password = inputs[2].value;
      let strength = 0;
    
      if (password.length >= 8) {
        strength++;
      }
      if (/[A-Z]/.test(password)) {
        strength++;
      }
      if (/[a-z]/.test(password)) {
        strength++;
      }
      if (/[0-9]/.test(password)) {
        strength++;
      }
      if (/[!@#\$%\^&\*]/.test(password)) {
        strength++;
      }
    
      meter.classList.remove('d-none');
      meter.style.width = `${strength * 20}%`;
      if (strength <= 2) {
        meter.style.backgroundColor = 'red';
      } else if (strength <= 4) {
        meter.style.backgroundColor = 'yellow';
      } else {
        meter.style.backgroundColor = 'green';
      }
      if (strength < 4) {
        return false;
      }
        return true;
    }
register.addEventListener('click', function(event) {
        event.preventDefault();
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                inputs[i].style.border = '1px solid red';
            }
        }
        if (userCheck(users, inputs) && checkPasswordPolicy(inputs)) {
            users.push({
                username: inputs[0].value.toLowerCase(),
                email: inputs[1].value.toLowerCase(),
                password: inputs[2].value
            });
            localStorage.setItem('users', JSON.stringify(users));
            header.textContent = 'Registration Successful';
            header.style.color = 'green';
            for (let i = 0; i < inputs.length - 1; i++) {
                if (inputs[i].value === '') {
                  inputs[i].style.border = '1px solid red';
                } else {
                    inputs[i].style.border = 'none';
                }
              }
              
        } else {
            header.textContent = 'Registration Failed';
            header.style.color = 'red';
            return false;
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