const url = 'http://localhost:3001/api/settingProgramForm/getSettingBgForm'
    
export function fetchGetSettingBgForm(){
    return fetch(url).then(res => res.json())    
  }
