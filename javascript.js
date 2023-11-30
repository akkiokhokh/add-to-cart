
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,onValue,remove 
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-7ae06-default-rtdb.firebaseio.com/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoopingListDB = ref(database, "shoopinglist");
// selecting elements via querySelector

const CartBtn = document.querySelector(".CartBtn");
const inputEl = document.querySelector("#input-el");
const ulEl = document.querySelector("#ulel");

CartBtn.addEventListener("click", () => {
  let storeinputval = inputEl.value;
  push(shoopingListDB, storeinputval);

  clearoutInput();
 // appendInputval(storeinputval);
});

function clearoutInput() {
  inputEl.value = "";
}

// function appendInputval(inputval) {
//   ulEl.innerHTML += ` <li>${inputval}</li>`;
// }

// ulEl.addEventListener("click", (details) => {
//   const clickedinput = details.target;
//   clickedinput.remove();
// });

// Onvalue function ruuning when we change Database

onValue(shoopingListDB , function (snapshot){
 


  if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    clearShoopingListEl()
    for(let i = 0; i < itemsArray.length; i++){
     
      const currentItems = itemsArray[i]


      appendShoopingListEl(currentItems)
  }
}else {
   ulEl.innerHTML= `Bhukki lag rahi kuch toh add kadi mumma`
}
 
})

function clearShoopingListEl(){
  ulEl.innerHTML = ''
}

function appendShoopingListEl(items){
let itemsID = items[0]
let itemsValue = items[1]

 //ulEl.innerHTML += `<li>${itemsValue}</li>` // you cannot use addeventlister using this 
const newEl = document.createElement("li")
    
newEl.textContent = itemsValue;

console.log(itemsID)
newEl.addEventListener('click' , function(){
  let exactLocationOfItemInDB = ref(database, `shoopinglist/${itemsID}` )
        


  remove(exactLocationOfItemInDB)
 
})

ulEl.append(newEl)
}