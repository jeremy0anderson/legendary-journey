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
let workspaceCreated = false;
let boardCreated = false;
let memberAdded = false;
let listCreated = false;
let cardCreated = false;
class Post {
       //create a new workspace
     static newWorkspace = async () => {
          if (localStorage.getItem('new-workspace') && workspaceCreated === false) {
               localStorage.setItem('workspace-created', true);
               return workspaceCreated = true;
          } else if (!localStorage.getItem('new-workspace') && workspaceCreated === false) {
               this.organization = {displayName: "Schedule Request Test"}
               this.newOrg = await Trello.post('/organizations/', this.organization,
                    async function () {
                         await localStorage.setItem('workspace-created', true);
                         return workspaceCreated = true;
                    },
                    async function () {
                         await localStorage.setItem('workspace-created', false);
                         return workspaceCreated = false;
                    });
               if (workspaceCreated) {
                    localStorage.setItem("new-workspace", JSON.stringify(this.newOrg));
               } else if (workspaceCreated === false) {
                    console.log('workspace not created')
               }
          }
     }
     static newBoard = async () => {
          this.board = {
               name: "Schedule Requests",
               defaultLabels: true,
               defaultLists: true,
               idOrganization: JSON.parse(localStorage.getItem('new-workspace')).id,
               prefs_selfJoin: true,
          };
          if (workspaceCreated === true) {
               this.newB = await Trello.post('/boards/', this.board,
                    async function () {
                         await localStorage.setItem('board-created', true);
                         return boardCreated = true;
                    },
                    async function () {
                         await localStorage.setItem('board-created', false);
                         return boardCreated = false;
                    });
          } else if (workspaceCreated === false) {
               return;
          }
          if (boardCreated === true) {
               return localStorage.setItem('new-board', JSON.stringify(this.newB))
          } else if (boardCreated === false) {
               console.log('board not created')
          }
     }
     static addMemberToBoard = async () => {
          this.b = JSON.parse(localStorage.getItem('new-board')).id;
          this.selectOpts = document.querySelector("#meeting-people-options").value;
          switch (this.selectOpts) {
               //check the member that was selected by the user in the form, then add that member to the board that was created.
               case "Jeremy":
                    this. mA = await Trello.put('/boards/'+this.b+'/members/',{
                         id: "61ef6ffc84a63f48ffb809be",
                         type: "normal",
                         email: "jeremy.danderson@icloud.com"
                    }, function(){});
                    await localStorage.setItem('new-member-added', JSON.stringify(this.mA));
                    await localStorage.setItem('member-added', true);
                    return memberAdded = true;
               case "Ilan":
                    this. mA = await Trello.put('/boards/'+this.b+'/members/',{
                         id: "5bd35ff0e21f261f75ec12fb",
                         type: "normal",
                         email: "ilantimerman@outlook.com"
                    }, function(){});
                    await localStorage.setItem('new-member-added', JSON.stringify(this.mA));
                    await localStorage.setItem('member-added', true);
                    return memberAdded = true;

               case "Chelsie":
                    this. mA = await Trello.put('/boards/'+this.b+'/members/',{
                         id: "61ef6568b6c5c80e598b9fe8",
                         type: "normal",
                         email: "chelsiesindar@gmail.com"
                    }, function(){});
                    await localStorage.setItem('new-member-added', JSON.stringify(this.mA));
                    await localStorage.setItem('member-added', true);
                    return memberAdded = true;
               case "Brandon":
                    this. mA = await Trello.put('/boards/'+this.b+'/members/',{
                         id: "61ef722e8214360407ecea4d",
                         type: "normal",
                         email: "brandonpeterson.006@gmail.com"
                    }, function(){});
                    await localStorage.setItem('new-member-added', JSON.stringify(this.mA));
                    await localStorage.setItem('member-added', true);
                    return memberAdded = true;
               case "Nick":
                    this. mA = await Trello.put('/boards/'+this.b+'/members/',{
                         id: "61ef70115e38db2c9f587211",
                         type: "normal",
                         email: "tatom.tech@gmail.com"
                    }, function(){});
                    await localStorage.setItem('new-member-added', JSON.stringify(this.mA));
                    await localStorage.setItem('member-added', true);
                    return memberAdded = true;
               default:
                    break;
          }
     }
     static newList = async () => {
          this.list = await Trello.post("/boards/" + JSON.parse(localStorage.getItem('new-board')).id + "/lists/", {name: "Schedule Requests"}, async function(){await localStorage.setItem('list-created', true)}, async function(){await localStorage.setItem('list-created', false)});
          await localStorage.setItem('list-created', true);
          await localStorage.setItem('new-list', JSON.stringify(this.list));
          return listCreated = true;
     }
     static newCard = async()=>{
          this.card = {
               name: nameField.value,
               desc: messageField.value,
               pos: "top",
               idList: JSON.parse(localStorage.getItem('new-list')).id,
               id: '',
               keepFromSource: "all",
               due: dateField.value,
               dueCompleted: false
          }
          this.newC = await Trello.post('/cards/', this.card, async function(){await localStorage.setItem('card-created', true)}, async function(){await localStorage.setItem('card-created',false)});
          this.card.id=this.newC.id;
          await localStorage.setItem('new-card', JSON.stringify(this.newC));
          return cardCreated = true;
     }
     //localStorage.setItem('new-board', JSON.stringify(Post.newB));
     // this.board = {
     //      name: "Schedule Requests",
     //      defaultLabels: true,
     //      defaultLists: true,
     //      idOrganization: JSON.parse(localStorage.getItem('new-workspace')).id,
     //      prefs_selfJoin: true,
     // }
     // this.newB = await Trello.post('/boards/', this.board,  async function(){
     // });

}
class Get {
     //verify
     static organizations = async()=>{
          this.org = await Trello.get('members/me/organizations');
          for (let i = 0; i < Get.org.length; i++) {
               console.log(Get.org[i]);
               if (Get.org[i].displayName.includes("Schedule Requests")){
                    localStorage.setItem("organization", JSON.stringify(Get.org))
                    break;
               } else if (Get.org[i].displayName.includes("Schedule Requests") === false){
                    await Post.newOrganization();
               }
          }
     }
     static boards = async() =>{
          this.b = await Trello.get('members/me/boards');
          for (let b = 0; b < Get.b.length; b++) {
               if (Get.b[b].name.includes('Schedule Requests')){

                    localStorage.setItem('user-boards')
                    break;
               } else { await Post.newBoard();
               }
          }
     }
     static members = async() =>{
          this.m = await Trello.get('members/61ef6ffc84a63f48ffb809be');
          if (this.m.responseText === "The requested resource was not found."){
               await Post.addMemberToBoard();
          } else {
               localStorage.setItem('member-added', JSON.stringify(this.m));
          }
     }

}
dialog.open = false;
if (localStorage.getItem('new-workspace') && localStorage.getItem('new-card')){
     submit.disabled = true;
     viewRequests.disabled = false;
     submit.textContent = "Already have a Trello Workspace with: "+localStorage.getItem('user-added-to-workspace');
} else if (!localStorage.getItem('new-workspace') && !localStorage.getItem('new-card')){
     submit.disabled = false;
     viewRequests.disabled = true;
     submit.textContent = "Submit";
}
Trello.authorize(o);
submitEdit.addEventListener('click', async() => {
     localStorage.setItem('name', editName.value); localStorage.setItem('phone', editPhone.value); localStorage.setItem('email', editEmail.value); localStorage.setItem('message', editMessage.value); localStorage.setItem('date', editDate.value);
     await Post.updateCard(Post.nc);
     dialog.open = false;
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
               await Post.newWorkspace();
               await Post.newBoard();
               await Post.addMemberToBoard();
               await Post.newList();
               await Post.newCard();
               console.log(workspaceCreated);
               console.log(boardCreated);
               localStorage.setItem('user-added-to-workspace', Post.selectOpts);
               localStorage.setItem('name', nameField.value); localStorage.setItem('phone', phoneField.value); localStorage.setItem('email', emailField.value); localStorage.setItem('message', messageField.value); localStorage.setItem('date', dateField.value);
               form.reset();
});
