let storage = [];
let buttonStore = document.getElementById("saveButton");
let linkText = document.getElementById("linkValue");
let pushText = document.getElementById("textBuild");
let storePlace = JSON.parse(localStorage.getItem("storage"));

if(storePlace){
  storage = storePlace;
  callSave(storage);
}

function callSave(array){
  let textStorage = "";
  for(let i = 0; i < array.length; i++)
  {
    displayList.style.display = "block";
    textStorage += 
      `<li>
        <a target='_blank' href='${array[i]}'> 
          ${array[i]}
        </a>
      </li>`;
  }
  pushText.innerHTML = textStorage;
}

tabButton.addEventListener("click", function(){
  chrome.tabs.query({active: true, currentWindow: true}, function(array){
    storage.push(array[0].url);
    localStorage.setItem("storage", JSON.stringify(storage));
    callSave(storage);
  })
})

saveButton.addEventListener("click", function(){
  if(linkText.value != ""){
    storage.push(linkText.value);
    displayList.style.display = "block";
  }
  else{
    return false;
  }
  localStorage.setItem("storage", JSON.stringify(storage));
  callSave(storage);
  linkText.value = "";
})

resetButton.addEventListener("click", function(){
  displayList.style.display = "none";
  storage = [];
  linkText.value = "";
  pushText.textContent = "";
  localStorage.clear();
})

deleteButton.addEventListener("click", function(){
  storage.pop();
  localStorage.setItem("storage", JSON.stringify(storage));
  callSave(storage)

  if(storage == 0){
    displayList.style.display = "none";
  }
})