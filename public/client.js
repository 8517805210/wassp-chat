console.log("hello");

const socket = io();
let uname;
let textarea = document.querySelector("#textarea");

let messageArea = document.querySelector(".message_area");

do {
  console.log("hello");
  uname = prompt("please enter your name");
} while (!uname);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log("enter clicked");
    sendMessage(e.target.value);

  }
});

function sendMessage(mgs) {
  let msgobj = {
    user: uname,
    message: mgs.trim(),
  };

  //append

  appendMessage(msgobj, "outgoing");

  textarea.value="";
  scrollToBottom();
  
  //send to server
  
  //we can give any name as i gave message and second parameter should be an object
  socket.emit('message',msgobj)

}

function appendMessage(mgs, type) {
  let mainDiv = document.createElement("div");

  let className = type;
  /*
    by seperating comma we can put any number of class name inside the add method
    */
  mainDiv.classList.add(className, "message");
 
  let markup = `
        <h4>${mgs.user}</h4>
        <p>${mgs.message}</p>
       
        `;
  
  mainDiv.innerHTML = markup;


  messageArea.appendChild(mainDiv);
}





//Receiving messages 

socket.on('message',(msg)=>{
  
    appendMessage(msg,'incoming');
    scrollToBottom();

})

function scrollToBottom()
{

    messageArea.scrollTop=messageArea.scrollHeight;
}