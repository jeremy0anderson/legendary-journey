// let bO, cO, ktString, btns = document.querySelector('#buttons'), getBIds = document.querySelector("#getBoardsBtn"), getCIds = document.querySelector("#getCardsBtn"), loginBtn = document.querySelector("#sFormBtn"), idButtons = [getCIds, getBIds];
let opts = {
    type: "popup",
    name: "Trello-Client",
    persist: true,
    interactive: true,
    scope: {
        read: true,
        write: true,
        account: true
    },
    expiration: "30days",
    success: function () {
        alert("success!");
    },
    error: function () {
    }
}
//         let board = async() =>{
//             //let auth = await Trello.authorize(opts);
//              let r = await Trello.get("/members/me/cards?fields=name,url" + ktString);
//              console.log(r.responseJSON);
function initial(){
    let token = localStorage.getItem('trello_token');
    //check for token on page load
    if (localStorage.getItem("trello_token")){
        console.log("token already in local storage");
        Trello.setToken(token)
    }else if (localStorage.getItem("trello_token") && Trello.token() === null){
        Trello.authorize(opts);
    }
}
initial();
// board();
// var myList = 'INSERT YOUR IDLIST HERE';
//
// var creationSuccess = function (data) {
//     console.log('Card created successfully.');
//     console.log(JSON.stringify(data, null, 2));
// };
//
// var newCard = {
//     name: 'New Test Card',
//     desc: 'This is the description of our new card.',
//     // Place this card at the top of our list
//     idList: myList,
//     pos: 'top'
// };
//
// window.Trello.post('/cards/', newCard, creationSuccess);
// class Get {
//     static bR;
//     static boardIDs(){
//         this.bR = Get.boardIDs.responseJSON;
//         for (let i = 0; i < this.bR.length; i++) {
//             console.log(this.bR[i].id);
//         }
//     }
//
// }
let t = Trello;
let bO, cO, ktString, btns = document.querySelector('#buttons'), getBIds = document.querySelector("#getBoardsBtn"), getCIds = document.querySelector("#getCardsBtn"), loginBtn = document.querySelector("#sFormBtn"), idButtons = [getCIds, getBIds];
let isAuthorized, token = localStorage.getItem('trello_token'); let vA={};
class GetUser {
    static b;

    static c;
    static cR;
    static o;
    static oR;
    static boardObjects() {
        return this.b = t.get("/members/me/boards?fields=name,url" + ktString);
    }
    static cardObjects() {
        return this.c = t.get("/members/me/cards?fields=name,url" + ktString);
    }
    static organizationObjects() {
        return this.o = t.get("https:api.trello.com/1/members/me/organizations?fields=name,url"+ktString);
    }
}
GetUser.boardObjects();
GetUser.cardObjects();
function getResponseObjects(){
    bO = GetUser.b.responseJSON;
    for (let b = 0; b < bO.length; b++) {
        console.log(bO[b].id);
    }
    cO = GetUser.c.responseJSON;
    for (let c = 0; c < cO.length; c++){
        console.log(cO[c].id);
    }
}
getResponseObjects();
class A {
    static opts = {
        type: "popup",
        name: "Trello-Client",
        persist: true,
        interactive: true,
        scope: {
            read: true,
            write: true,
            account: true
        },
        expiration: "30days",
        success: function () {
            alert("success!");
        },
        error: function () {

        }
    }
    static async login(){
        Trello.authorize(A.opts);
        if (Trello.token() !== token && token !== null) {
            Trello.setToken(token);
            return ktString = "&key=" + t.key() + "&token=" + Trello.token();
        }
    }
}
A.login().then(r => console.log(r));
class Get {
    static bR;
    static boardIDs(){
        this.bR = GetUser.b.responseJSON;
        for (let i = 0; i < this.bR.length; i++) {
            console.log(this.bR[i].id);
        }
    }

}
function verifyAuth(token) {
    switch (token){
        case null:
            isAuthorized = false;
            return vA = {
                authorized: isAuthorized,
                token: token
            };
        case this.token:
            isAuthorized = true;
            vA.authorized = isAuthorized;
            Trello.setToken(this.token);
            return vA = {
                authorized: isAuthorized,
                token: Trello.token()
            };
    }
}
// class Authorize {
//     define parameters for authorization request with trello
//     static  authOpts = {
//         type: "popup",
//         name: "legendary-journey",
//         persist: true,
//         interactive: true,
//         scope: {
//             read: true,
//             write: true,
//             account: true
//         },
//         expiration: "30days",
//         success: function () {
//             alert("success!");
//         },
//         error: function () {
//         }
//     };
// method to check if authorization is needed or not -- if yes, send user to trello login -- if no, return already authorized
//     static user() {
//         let t = Trello;
//         switch (isAuthorized) {
//            // if not authorized, check for valid token
//             case false:
//                 switch (Trello.token()) {
//                     if token is valid, return true for authorization.
//                                                            case token:
//                         Trello.setToken(token);
//                         ktString = "&key=" + t.key() + "&token=" + Trello.token();
//                         isAuthorized = true;
//                         vA.authorized = isAuthorized; vA.token = Trello.token();
//                         return vA;
//                         if token is invalid, return false authorization
//                     case !token:
//                         let authOpts = {
//                             type: "popup",
//                             name: "legendary-journey",
//                             persist: true,
//                             interactive: true,
//                             scope: {
//                                 read: true,
//                                 write: true,
//                                 account: true
//                             },
//                             expiration: "30days",
//                             success: function () {
//                                 alert("success!");
//                             },
//                             error: function () {
//                             }
//                         };
//                         Trello.authorize(this.authOpts);
//                         Trello.setToken(token)
//                         ktString = "&key=" + t.key() + "&token=" + t.token();
//                         isAuthorized = true; vA.authorized = isAuthorized; vA.token = Trello.token();
//                         return vA;
//                     case true:
//                         switch (Trello.token()) {
//                             case token:
//                                 return isAuthorized;
//                             case !token:
//                                 return !isAuthorized;
//                         }
//                 }
//         }
//     }
// }
//

//add event listener that sends user to login/authorize the app to get data from their trello account.
loginBtn.addEventListener("click", A.login);
loginBtn.addEventListener("click", function(){
    if (Trello.token() === null){
        Trello.authorize(Authorize.authOpts);
    }
    GetUser.boardObjects();
    GetUser.cardObjects();
    if (isAuthorized){
        loginBtn.disabled = true;
        for (let i = 0; i < idButtons.length; i++) {
            btns.appendChild(idButtons[i])
        }

    }
});

getBIds.addEventListener("click", function(){
    bO = GetUser.b.responseJSON;
    console.log("there are "+ bO.length+ " boards.")
    for (let i = 0; i < bO.length; i++) {
        console.log("the ID for the board '" +bO[i].name +"' is: " + bO[i].id);
    }
});
getCIds.addEventListener("click", function(){
    cO = GetUser.c.responseJSON;
    console.log("there are "+ cO.length+ " cards.")
    for (let i = 0; i < cO.length; i++) {
        console.log("the ID for the card '" +cO[i].name +"' is: " + cO[i].id);
    }
});
var myList = '61f0c0ae12a9ec5da77fa41e';

var creationSuccess = function (data) {
    console.log('Card created successfully.');
    console.log(JSON.stringify(data, null, 2));
};

var newCard = {
    name: 'New Test Card',
    desc: 'This is the description of our new card.',
    //Place this card at the top of our list
    idList: myList,
    pos: 'top'
};
class GetObject{
    board(){
        const boardResponse = t.get("/members/me/boards?fields=name,url" + ktString);
        let bR = boardResponse.responseJSON;
        for (let b = 0; b < bR.length; b++) {
            console.log("there are " + (b+1) + " boards for this user.");
            console.log("The id of the board: "+ "'" + bR[b].name+ "' " + "is " +  bR[b].id);
        }
    }
}
let gO = new GetObject();
gO.board();
