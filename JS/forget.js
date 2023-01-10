let span = document.getElementsByTagName('span');
let reterivePass = document.getElementById('register');
let emailRetierve = document.getElementById('emailRetierve');
let defaultBlue = "#006494"
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

  reterivePass.addEventListener('click', function () {
    let enteredEmail = emailRetierve.value;
    let users = JSON.parse(localStorage.getItem("users"));

    if(enteredEmail === "" || enteredEmail === null){
        emailRetierve.style.border = "solid 1px red";
        emailRetierve.value = "You must enter something"
    }
    else{
        for(let i = 0; i < users.length; i++){
            if(users[i].email === enteredEmail){
                emailRetierve.style.border = "solid 1px green";
                emailRetierve.value = `Your password is: ${users[i].password}`
                break;
            }
        }
    }
});
