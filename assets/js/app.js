// return this.b = t.get("/members/me/boards?fields=name,url" + ktString);

// var myList = '61f0c0ae12a9ec5da77fa41e';
//
// var creationSuccess = function (data) {
//      console.log('Card created successfully.');
//      console.log(JSON.stringify(data, null, 2));
// };
//
// var newCard = {
//      name: 'New Test Card',
//      desc: 'This is the description of our new card.',
//      // Place this card at the top of our list
//      idList: myList,
//      pos: 'top'
// };
//Trello.setToken('5db31192089c2bf4aced4bfee6921e11066d0da1582451379dfe2f43ace0ed50');
let authOptions = {type: "popup", name: "legendary-journey", persist: true, interactive: true, scope: {read: true, write: true, account: true}, expiration: "30days", success: function () {console.log("success!");}, error: function () {console.log("Failed!")}};
let user = {};
class AuthorizeApp{
    constructor({options}){
        Trello.authorize(options);
        //console.log(Trello.authorized());
        user = {
            key: Trello.key(),
            token: Trello.token()
        }
        user.key=Trello.key(); user.token = Trello.token();
        return user;
    }
}
//class verifies that they key and token values returned from authorization are valid so each fetch() works properly.
class RequestUrlHandler{
    constructor(key, token){
        //check to see if the key value for user is the same as Trello.key();
        switch(key){
            case !Trello.key() || undefined || null:
                console.log("invalid key");
                return {string:"invalid key"}
            case Trello.key():
                //if the key matches Trello.key(), check to see if there is a token value.
                //Then verify that the token for user is equal to Trello.token();
                switch(token){
                    case !Trello.token() || undefined || null:
                        console.log("invalid token");
                        return {string:"invalid token"}
                    case Trello.token():
                        this.string = {string:"&key="+key+"&token="+token};
                }
        }
        return this.string;
    }
}
let authString;
let loginButton = document.querySelector('#sFormBtn');
//when the login button is clicked, wait for trello key/token verification. then pass the values of each through the url simplifier.
loginButton.addEventListener('click', async() => {
    await new AuthorizeApp(authOptions);
//return a string that can contains the authorization values required to get each GET/POST/ETC requests methods for readability/simplicity
// placed at start/login to ensure API calls don't return errors.
    authString = new RequestUrlHandler(user.key, user.token).string;
    console.log(authString);
    return authString;

});
