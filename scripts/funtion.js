// To fetch data through APIs ...
// const request = async ()=> {
//     let response = await fetch('saraa.json');
//     if(response.status === 200){
//         let data = await response.json()
//         return data;
//     }else{
//         throw new Error("Couldn't fetch data.");
//     }
// } 
// request()
// .then((data1)=>{
//     console.log(data1);
//     return
// }).catch((err)=>{
//     console.log(err.message);
// })



const ApiKey = "9IxuLqnlpKOjx31mwSvOczgPEN20qnsF";

// City Details ...

const cityLocation = async (city)=>{
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${ApiKey}&q=${city}`
    const response = await fetch(base + query);
    let data = await response.json();
    return data[0];
}

// Current Weather ...

const cityWeather = async (cityKey)=>{
    const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
    const query = `${cityKey}?apikey=${ApiKey}`;
    const response = await fetch(base + query);
    let data = await response.json();
    return data[0];
}

// %-Days Weather Forcast ...

const weatherForcast = async (cityKey)=>{
    const base = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/';
    const query = `${cityKey}?apikey=${ApiKey}`;
    const response = await fetch(base + query);
    let data = await response.json();
    //console.log(data.DailyForecasts);
    return (data.DailyForecasts);
}





