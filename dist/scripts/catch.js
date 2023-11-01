
export class Catch{
  store = '';
  constructor() {
    this.store = localStorage.getItem("login") || '[]';
  }

  checkAuth() {
    const user = JSON.parse(this.store);


    if (user.email  && user.password ) {
      return true;
    }
    
    return false;
  }

  addUser(user) {
    localStorage.setItem("login", JSON.stringify(user));
  }

  getUser() {
    const result = localStorage.getItem("login") || '{}';
    const user = JSON.parse(result);
    return user;
  }

  addCity(city) {
    const result = localStorage.getItem("Cities") || '[]';
    let list = JSON.parse(result);
    list.push(city)
    list = new Set(list);
    list = [...list]
    localStorage.setItem("Cities", JSON.stringify(list));
  }

  clear() {
    localStorage.clear()
  }

  removeCity(city) {
    const result = localStorage.getItem("Cities") || '[]';
    let list = JSON.parse(result);
    list.forEach((item,index) => {
      if (item == city) {
         list.splice(index, 1);
      }
    });
    
    localStorage.setItem("Cities", JSON.stringify(list));
  }

  getCities(char='') {
    const result = localStorage.getItem("Cities") || '[]';
    let list = JSON.parse(result);
    let filterCities = [];
    if (char != '') {
      list.forEach(city => {
        
        
        if (city.toLowerCase().startsWith(char.toLowerCase())) {
          console.log(city);
          filterCities.push(city);
        }
      })
  
      list =[...filterCities]
    }
    return list;
  }

}