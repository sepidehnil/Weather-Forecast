export class HttpClient{
  constructor(url,apikey='') {
    this.baseUrl = url;
    this.apiKey = apikey;
  }
  

 async get(city='') {
   try {
     let response ;
     if (city === '') {
      response = await fetch(`${this.baseUrl}/users`)
     } else {
      response = await fetch(`${this.baseUrl}?q=${city}&units=metric&appid=${this.apiKey}`)
     }
     if(!response.ok) throw new Error(`can not find ${city} city ${error}`)
     const result = await response.json();
     return result
   } catch (error) {
     throw new Error(`something went wrong when getting data ${error}`)
    }
  }



  async post(user) {
    try {
      let response = await fetch(`${this.baseUrl}users`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body:JSON.stringify(user)
      });

      let result = await response.json();
      return result;

    } catch (error) {
      console.log(error);
    }

  }
}