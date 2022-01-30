Trello.authorize(authorizeOptions);
let dateField = document.querySelector("#date-1643251044760");
let nameField = document.querySelector("#text-1643251049905");
let phoneField = document.querySelector("#text-1643251062289");
let emailField = document.querySelector("#text-1643251064078");
let messageField = document.querySelector("#text-1643251065818");
let submit = document.querySelector("#button-1643251037187");
let  o = {
     type: 'popup',
     name: 'Getting Started Application',
     scope: {
          read: 'true',
          write: 'true' },
     expiration: 'never',
     success: function() {
          console.log('Successful authentication');
     },
     error: function() {
          console.log('Failed authentication');
     }
}
let card = {
     name: "",
     desc: "",
     pos: "top",
     idList: '61f7164aea56070edecb617e',
     keepFromSource: 'all'
}
submit.addEventListener('click', async() => {
newCard.name = nameField.value + " requested a meeting on " + dateField.value;
newCard.desc = nameField.value + " included the message: "+ messageField.value + ". Contact them at: "+phoneField.value+ " or "+emailField.value;
await Trello.post('/cards/', card, function(){alert("Successfully requested a meeting")}, function(){alert("There was an error while requesting a meeting")});
});
