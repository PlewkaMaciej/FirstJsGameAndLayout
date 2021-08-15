firebase.initializeApp(firebaseConfig);
const signUpBtn = document.querySelector(".signUpBtn");
const signInBtn = document.querySelector(".signInBtn");
const logOutBtn = document.querySelector(".logOutBtn");
const signUpBox = document.querySelector(".containerSignUp");
const signInBox = document.querySelector(".containerSignIn");
const userSignUpEmail = document.querySelector("#SignUpEmail");
const userSignUpPassword = document.querySelector("#SignUpPassword");
const CreateAccBtn = document.querySelector(".buttonCreateAcc");
const userLogInEmail = document.querySelector("#SignInEmail");
const userLogInPassword = document.querySelector("#SignInPassword");
const buttonLogIn = document.querySelector(".buttonLogIn");
const gameMenu = document.querySelector(".menu-container")
const startGameButton = document.querySelector(".button-start-game")
let showform = false;
let showformSignIn = false;
const showSignIn = () => {
    if (showformSignIn === false) {
      signInBox.style.display = "flex";
      showformSignIn = true;
      signUpBox.style.display="none";
      showform = false;
    } else {
        signInBox.style.display = "none";
      showformSignIn = false;
    }
  };
  const showSignUp = () => {
    if (showform === false) {
      signUpBox.style.display = "flex";
      signInBox.style.display="none";
      showform = true;
      showformSignIn = false;
    } else {
        signUpBox.style.display = "none";
      showform = false;
    }
  };
const addUser = () => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(
      userSignUpEmail.value,
      userSignUpPassword.value
    )
    .then((token) => {});
};
CreateAccBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addUser();
});
const logOutUser = () => {
  if (confirm("Are u sure u want to log out?")) {
    firebase
      .auth()
      .signOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  }
};
logOutBtn.addEventListener("click", logOutUser);
const logInUser = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(userLogInEmail.value, userLogInPassword.value)
    .then((token) => {});
};
buttonLogIn.addEventListener("click", (e) => {
  e.preventDefault();
  logInUser();
});
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(user);
    alert("uzytkownik zalogowal sie");
    signInBtn.style.display = "none";
    signUpBtn.style.display = "none";
    signInBox.style.display = "none";
    logOutBtn.style.display = "flex";
    signUpBox.style.display = "none";
  } else {
    console.log("user log out");
    signInBtn.style.display = "inline";
    signUpBtn.style.display = "inline";
    logOutBtn.style.display = "none";
  }
});
signInBtn.addEventListener("click", showSignIn);
signUpBtn.addEventListener("click", showSignUp);