const app = document.querySelector('#app');
const navUser = document.querySelector('#navUser');
const navTodos = document.querySelector('#navTodos');
const navUsername = document.querySelector('#navUsername');

displayStartScreen();

function displayStartScreen() {
  displayNavUserBtn();
  let isUserLoggedIn = checkUserLoggedIn();
  if (isUserLoggedIn) {
    app.innerHTML = `You are logged in dude`;
  } else {
    displayLogin('');
  }
}

function checkUserLoggedIn() {
  let userId = localStorage.getItem('userId');
  if (userId) {
    return true;
  } else {
    return false;
  }
}

// This function handles the login/logout button in the navbar
// AND it also changes the eventlisteners to different functions depending on whether user is logged in or out
// AND it displays username with eventlistener if user is logged in, clears it if logged out
function displayNavUserBtn() {
  let isLoggedIn = checkUserLoggedIn();
  if (isLoggedIn) {
    navUser.textContent = 'Log Out';
    navUsername.textContent = `Logged in as: ${localStorage.getItem(
      'userName'
    )}`;
    navUser.removeEventListener('click', () => {
      displayLogin('');
    });
    navUser.addEventListener('click', logoutUser);
    navUsername.addEventListener('click', displayUserInfo);
  } else {
    navUser.textContent = 'Log In / Create Account';
    navUsername.textContent = '';
    navUser.removeEventListener('click', logoutUser);
    navUser.addEventListener('click', () => {
      displayLogin('');
    });
  }
}

// *********************LOGIN SECTION*******************

function displayLogin(message) {
  let loginPage = `
    <h2>Login:</h2>

    ${message}
       
        <label class="formLabel">
            <span>User name: </span>
            <input type="text" name="userName" class="textfield" id="userNameInput" />
        </label>

        <label class="formLabel marginT1rem">
            <span>Email: </span>
            <input type="email" name="userEmail" class="textfield" id="emailInput" />
        </label>
        
       
        
        <button class="marginT1rem" id="loginBtn">Log In</button>
          
        <a href="#" class="paddingT4rem" id="createAccountLink">Not a member? Create Account</a>
    `;

  app.innerHTML = loginPage;

  document
    .querySelector('#createAccountLink')
    .addEventListener('click', displayCreateUser);

  document.querySelector('#loginBtn').addEventListener('click', loginUser);
}

function loginUser() {
  let userEmail = document.querySelector('#emailInput');
  let userName = document.querySelector('#userNameInput');

  let user = {
    userName: userName.value,
    userEmail: userEmail.value,
  };
  fetch('http://localhost:3000/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data[0].userId) {
        localStorage.setItem('userId', data[0].userId);
        localStorage.setItem('userName', data[0].userName);

        // TODO: store id to localstorage, display confirmation, change nav etc
        displayNavUserBtn();
        displayStartScreen();
      } else {
        let errorMsg = data.message;
        displayLogin(errorMsg);
      }
    });
}

function logoutUser() {
  localStorage.clear();
  displayLogin('');
  displayNavUserBtn();
}

function displayCreateUser() {
  let newUserPage = `
    <h2>Create Account:</h2>
       
        <label class="formLabel marginT1rem">
            <span>User name: </span>
            <input type="text" name="userName" class="textfield" id="nameInput" />
        </label>

        <label class="formLabel">
            <span>Email: </span>
            <input type="email" name="userEmail" class="textfield" id="emailInput" />
        </label>
        
        <button class="marginT1rem" id="createAccountBtn">Create Account</button>
    `;

  app.innerHTML = newUserPage;

  document
    .querySelector('#createAccountBtn')
    .addEventListener('click', createNewUser);
}

function createNewUser() {
  let userEmail = document.querySelector('#emailInput');
  let userName = document.querySelector('#nameInput');

  let user = {
    userName: userName.value,
    userEmail: userEmail.value,
  };

  //and logic here so it can't be sent with bad info or other stuff, regex etc yololo

  fetch('http://localhost:3000/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.insertId) {
        app.innerHTML = `
        <h2>Account successfully created!</h2>
        <p>Welcome to our site new member!</p>
        <p>Just log in with your new user name and email and make a bunch of todo's</p> 
        
        `;
      } else {
        let errorMsg = data.message;
        displayLogin(errorMsg);
      }
    });
}

// ***************USER SECTION
function displayUserInfo() {
  let id = localStorage.getItem('userId');
  if (id) {
    fetch(`http://localhost:3000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let user = data[0];
        console.log(data[0]);
        if (user.userId) {
          let displayUserInfo = `
          <h2>${user.userName}</h2>
          <div class="productListItem">
          <p>Username: ${user.userName}</p>
          <p>Email: ${user.userEmail}</p>
          <p>Your unique and very special customer ID: ${user.userId}</p>
          <p></p>
          <button id="viewOrdersBtn">View your orders</button>

          </div>
          `;

          app.innerHTML = displayUserInfo;

          //   document
          //     .querySelector('#viewOrdersBtn')
          //     .addEventListener('click', displayOrders);
        } else {
          console.log('Could not find user');
        }
      });
  }
}
