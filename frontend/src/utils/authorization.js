import BASE_URL from '../utils/contants.js';

const checkResponse = (res) => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

export function userRegister(email, password){  
  return fetch(`${BASE_URL}/signup`,{
    method: 'POST',
    // mode: 'no-cors',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({email, password})
  }).then(checkResponse);
};

export function userLogin(email, password){
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    // mode: 'no-cors',
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
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    // mode: 'no-cors',
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