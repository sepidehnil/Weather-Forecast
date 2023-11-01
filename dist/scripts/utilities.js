export class Utilities{
    
  static changePage() {

    let params = window.location.href.split("/");
    let page = params.pop();
    params = params.join('/');
    page = page.split('.html')[0];
    page +='.html';

    console.log(params);
    switch (page) {
      case 'login.html':
        window.location =`${params}/index.html`
        break;
      case 'index.html':
      case '.html':
       window.location =`${params}/login.html`
        break;
      }

    
  }

  

  static findCurrentStateFromDesc(state) {
    let animationJson = '';
    let currentImg= '';
    const animates = [
      {
        name: 'cloud.json',
        img: 'n5.jpg',
        synonym:["cloud",'hazy','misty','murky','foggy']
      },
      {
        name: 'moon.json',
        img: 'moon.jpg',
        synonym:["moon",'night']
      },
      {
        name: 'partlycloudy.json',
        img: 'partlyCloud.jpg',
        synonym:["partly",'partly cloudy']
      },
      {
        name: 'rainy.json',
        img: 'n13.jpg',
        synonym:["rain",'drizzle']
      },
      {
        name: 'snow.json',
        img: 'snow.jpg',
        synonym:["snow",'blizz','snowfall']
      },
      {
        name: 'storm.json',
        img: 'storm.jpg',
        synonym:["flurry.",'storm','cyclone']
      },
      {
        name: 'sunny.json',
        img: 'n6.jpg',
        synonym:["sun.",'clear','sky']
      },
      {
        name: 'thunderstorm.json',
        img: 'storm.jpg',
        synonym:["thunderstorm.",'thunder']
      },
      {
        name: 'windy.json',
        img: 'wind.jpg',
        synonym:["wind.",'gale','blast']
      },
    ]

    animates.forEach(anim => {
      
      anim.synonym.forEach(syn => {
        if (state.toLowerCase().includes(syn)) {
          animationJson = anim.name;
          currentImg = anim.img;
          return
        }
      })
      
    })



    return {animationJson,currentImg};

  }

  


}