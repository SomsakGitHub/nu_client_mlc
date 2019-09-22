const url = 'http://localhost:3001/api/user/getPartner'
    
export function fetchPartner(){
    return fetch(url).then(res => res.json());
  }