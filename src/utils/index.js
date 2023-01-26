// { the * exports it as an object with elemets declared as variables}
// {
//   API_ROOT,
//   API_URLS,
//   LOCALSTORAGE_TOKEN_KEY
// }
export * from './constants';


//store user data in localstorage to avoid loggin him out
export const setItemInLocalStorage =(key,value)=>{
  if(!key || !value){
    return console.error('Can not store in LS');
  }
  const valueToStore = 
  typeof value !== "string" ? JSON.stringify(value):value;

  localStorage.setItem(key, valueToStore);
}


// Get Item to load the logged in user
export const getItemFromLocalStorage =(key)=>{
    if(!key){
      return console.error('Can not get value from LS');
    }

    return localStorage.getItem(key);
}

//remove Item from Local Storage upon logout
export const removeItemFromLocalStorage =(key)=>{
    if(!key){
      return console.error('Cannot remove the value from LS');
    }
    localStorage.removeItem(key);
  }


//our body from form will be converted like this 
export const getFormBody = (params) => {
    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); //aakash 123 =>
 
        formBody.push(encodedKey + '=' + encodedValue);
    }

    return formBody.join('&'); //'username=aakash&password=123213'
}