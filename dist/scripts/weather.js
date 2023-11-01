export class Weather{

  constructor(data) {
    this.id = data.id;
    this.city = data?.name;
    this.description = data.weather?.at(0)?.description;
    this.state = data.weather?.at(0)?.main;
    this.temp = data.main?.temp;
    this.feelsLike = data.main?.feels_like;
    this.pressure = data.main?.pressure;
    this.humidity = data.main?.humidity;
    this.wind = data.wind?.speed;
    this.clouds = data.clouds?.all;
    
  }


  getdate() {
    const now = new Date()
    const listOfTheDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const listOfTheMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',  'Dec']
    
    const monthDate = now.getDate();
    const month = now.getMonth();
    const week = now.getDay();
    let year = now.getFullYear();
    year = `${year}`.split('')
    year = [year.at(-2), year.at(-1)].join('');
    const hour = now.getHours();
    const minutes = now.getMinutes();
    console.log(`${hour}:${minutes}-${listOfTheDays.at(week)} ${monthDate} ${listOfTheMonth.at(month)} ${year}`);
    return `${hour}:${minutes}-${listOfTheDays.at(week)} ${monthDate} ${listOfTheMonth.at(month)} ${year}`

  }


  


}