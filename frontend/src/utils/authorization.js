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
    localStorage.setItem('jwt', data.userToken);
    return data;
  })
};

export function getContent(token){
  return fetch('http://localhost:3005/users/me', 
  {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
  },
  }).then((res)=>{
    return res.json();
  }).then((data)=>{
    return data;
  })
  .catch((err)=>{
    console.log(err);
  })
};