export function fetchUserById(key){
    return fetch(`http://localhost:3001/api/user/getUser/${key}`).then(res => res.json())
  }