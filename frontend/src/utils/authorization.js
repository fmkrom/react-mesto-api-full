const basicBackendUrl = 'http://localhost:3005';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

export function userRegister(email, password){  
  return fetch(`${basicBackendUrl}/signup`,{
    method: 'POST',
    'credentials': 'include',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email, password})
  }).then(checkResponse);
};

export function userLogin(email, password){
  return fetch(`${basicBackendUrl}/signin`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email, password})
  }).then(checkResponse)
  .then((data)=>{
    // console.log('This is registered user data in frontend authorization: ', data);
    localStorage.setItem('jwt', data.userToken);
  })
};

export function checkToken(token){
  return fetch((`${basicBackendUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })
  ).then(checkResponse)
};