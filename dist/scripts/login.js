// initAnimation()
import { Utilities } from "./utilities.js";
import { User } from "./user.js";
import { Catch } from "./catch.js";
import {HttpClient} from './httpClient.js'

const storage = new Catch();
const request = new HttpClient('https://64733d4bd784bccb4a3c602f.mockapi.io/auth/')
let users = [];
/* ======================================================= */

const loginBox = document.getElementById("login-box");
const signupBox = document.getElementById("signup-box");
const createAcoutBtn = document.getElementById("goToSignup");
const gotoLoginBtn = document.getElementById("gotoLogin");
const errorModal = document.getElementById("error-modal");

/* ======================================================= */
const loginBtn = document.getElementById('login-submit')
const loginbtText = document.getElementById('loginbt-text')
/* ======================================================== */
const signupBtn = document.getElementById('signupbtn');
const signupBtnText = document.getElementById('signuptext');






createAcoutBtn.addEventListener('click', () => {
  signupBox.classList.remove('hidden')
  loginBox.classList.add('hidden')
});

gotoLoginBtn.addEventListener('click', () => {
  signupBox.classList.add('hidden')
  loginBox.classList.remove('hidden')
})


loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  if (email == '' || !email.includes("@") || password == '') {
    console.log("input Invalid");
    handelErrorModal('Invalid input');
    return;
  }

  loginbtText.classList.add('hidden');
  loginLoadingAniamtion();

  getUsers().then(() => {
    
    document.getElementById('animation-wrapper').innerHTML = '';

    let user =checkAuth(email, password) 

    if (!!user) {
      storage.addUser(user)
      Utilities.changePage()
    } else {
      loginbtText.classList.remove('hidden');
      handelErrorModal('User not found !!!');
    }


  })










})


signupBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const userName = document.getElementById('signUp-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirmPassword = document.getElementById('signup-confirm-password').value;

  if (userName == '' ||  !email.includes("@") || email == '' || password == '' || confirmPassword == '') {
    handelErrorModal('please enter a valid input');
    return;
  }

  if (password != confirmPassword) {
    handelErrorModal('passwords must be the same');
    return;
  }

  signupBtnText.classList.add('hidden');
  signupLoadingAniamtion();

  getUsers().then(() => {
    
    document.getElementById('signup-animation-wrapper').innerHTML = '';

    let user =checkAuth(email, password)

    if (!!user) {
      loginbtText.classList.remove('hidden');
      handelErrorModal('This Email has already been registered !!');
    } else {

      const member = {
        name: userName,
        email: email,
        password:password
      }

      addUser(member).then(result => {
        signupBtnText.classList.remove('hidden');
        storage.addUser(member)
        Utilities.changePage();
      }).catch(error => {
        console.log(error);
        signupBtnText.classList.remove('hidden');
      })
        
    }


  })



})

function handelErrorModal(msg) {
  errorModal.classList.add('animate-moveUp');
  errorModal.classList.remove('animate-moveDown');
  errorModal.innerHTML = ` <p>${msg}</p>`;
  setTimeout(() => {
    errorModal.classList.remove('animate-moveUp');
    errorModal.classList.add('animate-moveDown');
  }, 4000);

}


function checkAuth(email, pass) {
  
  let member ;
  users.forEach(user => {
    if (user.email == email && user.password == pass) {
      member = user;
      return
    }
  })

  return member
}

async function getUsers() {
  let data = await request.get();
  users.splice(0);
  data.forEach(user => {
    users.push(new User(user));
  });

  return users;
}

async function addUser(user) {
  let data = await request.post(user);
  console.log(data);
  return data
}

function loginLoadingAniamtion() {
  document.getElementById('animation-wrapper').innerHTML = '';
  let animation = bodymovin.loadAnimation({

    container: document.getElementById('animation-wrapper'),
    
    path: './assets/animation/loading.json',
    
    renderer: 'svg',
    
    loop: true,
    
    autoplay: true,
    
    name: "Demo Animation",
    
    });        
}
function signupLoadingAniamtion() {
  document.getElementById('signup-animation-wrapper').innerHTML = '';
  let animation = bodymovin.loadAnimation({

    container: document.getElementById('signup-animation-wrapper'),
    
    path: './assets/animation/loading.json',
    
    renderer: 'svg',
    
    loop: true,
    
    autoplay: true,
    
    name: "Demo Animation",
    
    });        
}















// function initAnimation() {
//   let animation = bodymovin.loadAnimation({
    
//     container: document.getElementById('weather-state'),
    
//     path: '../../assets/animation/cloud.json',
    
//     renderer: 'svg',
    
//     loop: true,
    
//     autoplay: true,
    
//     name: "Demo Animation",
    
//   });   
         
// }


