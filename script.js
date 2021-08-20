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
const gameMenu = document.querySelector(".menu-container");
const startGameButton = document.querySelector(".button-start-game");
const gameview = document.querySelector(".game");
const nav = document.querySelector("nav");
const openInGameMenuButton = document.querySelector(".open-menu-button");
const showInGameMenu = document.querySelector(".in-game-option");
const BackToMenuButton = document.querySelector(".Back-to-menu-button");
const ResumeGameButton = document.querySelector(".Resume-game-button");
const StartNewGame = document.querySelector(".start-new-game");
const PauseGame = document.querySelector(".Pause-game");
let showform = false;
let showformSignIn = false;
let widthOfReso;
let heightOfReso;
let leftGameBorder;
let rightGameBorder;
let bottomGameBorder;
const showSignIn = () => {
  if (showformSignIn === false) {
    signInBox.style.display = "flex";
    showformSignIn = true;
    signUpBox.style.display = "none";
    showform = false;
  } else {
    signInBox.style.display = "none";
    showformSignIn = false;
  }
};
const showSignUp = () => {
  if (showform === false) {
    signUpBox.style.display = "flex";
    signInBox.style.display = "none";
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
    signInBtn.style.display = "none";
    signUpBtn.style.display = "none";
    signInBox.style.display = "none";
    logOutBtn.style.display = "flex";
    signUpBox.style.display = "none";
    gameMenu.style.display = "flex";
  } else {
    console.log("user log out");
    signInBtn.style.display = "inline";
    signUpBtn.style.display = "inline";
    logOutBtn.style.display = "none";
    gameMenu.style.display = "none";
  }
});
const showGame = () => {
  gameview.style.display = "flex";
  nav.style.display = "none";
  gameMenu.style.display = "none";
};
const showMenu = () => {
  showInGameMenu.style.display = "flex";
  openInGameMenuButton.style.display = "none";
};
const showMainMenu = () => {
  gameview.style.display = "none";
  gameMenu.style.display = "flex";
  nav.style.display = "flex";
};
const ResumeGame = () => {
  showInGameMenu.style.display = "none";
  openInGameMenuButton.style.display = "inline";
};
const getResolution = () => {
  widthOfReso = window.innerWidth;
  heightOfReso = window.innerHeight;
  leftGameBorder = widthOfReso * 0.18;
  rightGameBorder = widthOfReso * 0.8;
  bottomGameBorder = heightOfReso * 0.76;
  topGameBorder = heightOfReso * -0.02;
};
getResolution();
const addChickens = () => {
  let chicken = document.createElement("div");
  chicken.classList.add("chicken-style");
  gameview.appendChild(chicken);
  getResolution();
  let xChicken =
    Math.floor(Math.random() * (rightGameBorder - leftGameBorder)) +
    leftGameBorder;
  chicken.style.left = xChicken + "px";
  chicken.style.top = topGameBorder + "px";
  moveChickenX(chicken);
  moveChickenY(chicken);
};
const moveChickenY = (chicken) => {
  let moveIntervalY = setInterval(() => {
    let positionY = parseFloat(chicken.style.top);
    chicken.style.top = positionY + 1 + "px";
    let chickenPos = parseFloat(chicken.style.top);
    if (chickenPos > bottomGameBorder) {
      clearInterval(moveIntervalY);
      chicken.remove();
    }
  }, 15);
};
const moveChickenX = (chicken) => {
  let addChickenMoves = 0;
  let condition = Math.floor(Math.random() * (120 - 30)) + 30;
  let moveIntervalX = setInterval(() => {
    let chickenMoveXLeft = -2;
    let chickenMoveXRight = 2;
    addChickenMoves += 1;
    let position = parseFloat(chicken.style.left);
    if (addChickenMoves < condition) {
      chicken.style.left = position + chickenMoveXLeft + "px";
    } else if (addChickenMoves > condition) {
      chicken.style.left = position + chickenMoveXRight + "px";
    }
    if (addChickenMoves === condition * 2) {
      addChickenMoves = 0;
      condition = Math.floor(Math.random() * (120 - 30)) + 30;
    }
    let chickenPosX = parseFloat(chicken.style.left);
    if (chickenPosX < leftGameBorder) {
      chicken.style.left = position + "px";
    }
    if (chickenPosX > rightGameBorder) {
      chicken.style.left = position + 50+ "px";
    }
    let chickenPos = parseFloat(chicken.style.top);
    if (chickenPos > bottomGameBorder) {
      clearInterval(moveIntervalX);
      chicken.remove();
    }
  }, 15);
};
const gameIsStarted = () => {
  let gamestart = setInterval(() => {
    addChickens();
  }, 1000);
};

const hideMenuIfStartNewGame = () => {
  showInGameMenu.style.display = "none";
  openInGameMenuButton.style.display = "inline";
};

startGameButton.addEventListener("click", showGame);
signInBtn.addEventListener("click", showSignIn);
signUpBtn.addEventListener("click", showSignUp);
openInGameMenuButton.addEventListener("click", showMenu);
BackToMenuButton.addEventListener("click", showMainMenu);
ResumeGameButton.addEventListener("click", ResumeGame);
StartNewGame.addEventListener("click", gameIsStarted);
startGameButton.addEventListener("click", gameIsStarted);
StartNewGame.addEventListener("click", hideMenuIfStartNewGame);
