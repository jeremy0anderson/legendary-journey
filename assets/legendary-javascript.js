let dateField = document.querySelector("#date-1643251044760");
let nameField = document.querySelector("#text-1643251049905");
let phoneField = document.querySelector("#text-1643251062289");
let emailField = document.querySelector("#text-1643251064078");
let messageField = document.querySelector("#text-1643251065818");
let submit = document.querySelector("#button-1643251037187");
let dialog = document.querySelector('#view-meeting');
let closeDialog = document.querySelector("#close-dialog-btn");
let editRequest = document.querySelector('#edit-request-btn'), editName= document.querySelector("#edit-name") , editPhone = document.querySelector("#edit-phone"), editEmail = document.querySelector("#edit-email"), editMessage = document.querySelector("#edit-message"), editDate = document.querySelector("#edit-date") ;
let editFields = [editName, editPhone, editEmail, editMessage, editDate];
let fields = [nameField, phoneField, emailField, messageField, dateField];
let viewRequests = document.querySelector('#view-requests-btn');
let submitEdit = document.querySelector('#submit-edit-btn');
let dialogButtons = document.querySelector('#edit-fields-btn-containers');
let form = document.querySelector("#request-form");
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
let requestCard = {
     name:'',
     desc:"",
     pos:"top",
     idList:"61f89d5125d25c8cde4bce52",
     id: '',
     email: '',
     keepFromSource:"all",
     due:"",
     dueCompleted: false
}
class Post{
     static nc= {
          name: nameField.value,
          desc:"",
          pos:"top",
          idList:"61f89d5125d25c8cde4bce52",
          id: '',
          email: '',
          keepFromSource:"all",
          due:"",
          dueCompleted: false
     }
     static newCard = async(card) => {
          card.due=dateField.value;
          card.name = nameField.value + " requested a meeting on " + dateField.value;
          card.desc = nameField.value + " included the message: "+ messageField.value + ". Contact them at: "+phoneField.value;
          card.email = emailField.value;
          this.pc = await Trello.post('/cards/', card, function(){alert("Successfully requested a meeting")}, function(){alert("There was an error while requesting a meeting")});
          card.id = this.pc.id;
          card.idList = this.pc.idList;
          localStorage.setItem('request-card-id', card.id);
          this.nc = card;return requestCard = card;
     }
     static updateCard = async(card) => {
          card.name = editName.value + " requested a meeting on " + editDate.value;
          card.desc = editName.value + " also included the message: "+ editMessage.value + ". Contact them at: "+editPhone.value;
          card.email = editEmail.value;
          card.id = this.pc.id;
          this.uc = await Trello.put('/cards/'+JSON.parse(localStorage.getItem('request-details')).id, card, function(){alert('successfully updated request')}, function(){});
          localStorage.setItem('request-details', JSON.stringify(this.uc));
          this.nc=card;
     }
}
class Get {
     static cards = async() =>{
          this.cardInfo = await Trello.cards.get(Post.nc.id);
     }

}
dialog.open = false;
if (localStorage.getItem('request-card-id') !== JSON.parse(localStorage.getItem('request-details')).id){
     viewRequest.style.display="inline-flex";
} else viewRequests.style.display = "none";
Trello.authorize(o);
submitEdit.addEventListener('click', async() => {
     localStorage.setItem('name', editName.value); localStorage.setItem('phone', editPhone.value); localStorage.setItem('email', editEmail.value); localStorage.setItem('message', editMessage.value); localStorage.setItem('date', editDate.value);
     await Post.updateCard(requestCard);
     dialog.open = false;
     editRequest.style.display = "none";
     
});
viewRequests.addEventListener('click', function(){
     dialog.open = true;
     for (let i = 0; i < editFields.length; i++) {
          editFields[i].disabled = true;
          editFields[i].value = fields[i].value;
     }
     submitEdit.style.display = "none";
      editPhone.value = localStorage.getItem('phone');
      editEmail.value = localStorage.getItem('email');
      editMessage.value = localStorage.getItem('message');
      editDate.value = localStorage.getItem('date');
});
closeDialog.addEventListener('click', function(){
     dialog.open = false;
     editRequest.style.display = "inline-flex";
     submitEdit.style.display = "none";
     
});
editRequest.addEventListener('click', function(){
     for (let i = 0; i < editFields.length; i++) {
          editFields[i].disabled = false;
          editName.value = localStorage.getItem('name');
          editPhone.value = localStorage.getItem('phone');
          editEmail.value = localStorage.getItem('email');
          editMessage.value = localStorage.getItem('message');
          editDate.value = localStorage.getItem('date');
          submitEdit.style.display = "inline-flex";
          editRequest.style.display = "none";
     }
})
submit.addEventListener('click', async()=>{
     await Post.newCard(requestCard);
     localStorage.setItem('name', nameField.value); localStorage.setItem('phone', phoneField.value); localStorage.setItem('email', emailField.value); localStorage.setItem('message', messageField.value); localStorage.setItem('date', dateField.value);
     form.reset();
});

