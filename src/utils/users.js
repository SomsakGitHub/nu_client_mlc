const url = 'http://localhost:3001/api/user/getUser'
    
export function fetchUsers(){
    return fetch(url).then(res => res.json())
  }