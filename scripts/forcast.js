// const form = document.querySelector('form');
// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     const cityName = form.city.value.trim();   // Trim function used to trim the space entered by the user.
//     form.reset();                              // To reset the form page.
//     console.log(cityName);
//     cityLocation(cityName).then((data)=>{
//         console.log(data);
//         return cityWeather(data.Key);
//     }).then((data2)=>{
//         console.log(data2);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });

const form = document.querySelector('form');
const editBox = document.querySelector('.details');
const card = document.querySelector('.card');
const time = document.querySelector('.time');
const body = document.querySelector('body');
const forcastbox = document.querySelector('.again');
const icon = document.querySelector('.coloredicon');

const forcastShow = (data)=>{
    const forcast = data.allDayWeather;
    //console.log(forcast);
    const day1 = forcast[0];
    // const tempC = (day1.Temperature.Minimum.Value - 32)*(1.8);
    // console.log(tempC);
    //console.log(day1);
    const day2 = forcast[1];
    const day3 = forcast[2];
    const day4 = forcast[3];
    const day5 = forcast[4];
    let html1 =`<div class="col">&#8595; ${day1.Temperature.Minimum.Value}&deg;F - ${day1.Temperature.Maximum.Value}&deg;F &#8593;</div><br>
                <div class="row">Day &#8594; ${day1.Day.IconPhrase} <br> Night &#8594; ${day1.Night.IconPhrase}</div><br>
                <div class="col">&#8595; ${day2.Temperature.Minimum.Value}&deg;F - ${day2.Temperature.Maximum.Value}&deg;F &#8593;</div><br>
                <div class="row">Day &#8594; ${day2.Day.IconPhrase} <br> Night &#8594; ${day2.Night.IconPhrase}</div><br>
                <div class="col">&#8595; ${day3.Temperature.Minimum.Value}&deg;F - ${day3.Temperature.Maximum.Value}&deg;F &#8593;</div><br>
                <div class="row">Day &#8594; ${day3.Day.IconPhrase} <br> Night &#8594; ${day3.Night.IconPhrase}</div><br>
                <div class="col">&#8595; ${day4.Temperature.Minimum.Value}&deg;F - ${day4.Temperature.Maximum.Value}&deg;F &#8593;</div><br>
                <div class="row">Day &#8594; ${day4.Day.IconPhrase} <br> Night &#8594; ${day4.Night.IconPhrase}</div><br>
                <div class="col">&#8595; ${day5.Temperature.Minimum.Value}&deg;F - ${day5.Temperature.Maximum.Value}&deg;F &#8593;</div><br>
                <div class="row">Day &#8594; ${day5.Day.IconPhrase} <br> Night &#8594; ${day5.Night.IconPhrase}</div></hr>`;
    forcastbox.innerHTML = html1;
    card.classList.remove('d-none');
}



const updateUI = (data)=>{
    const cityDetails = data.cityDetails;
    const currentWeather = data.currentWeather;
    // OR return {cityDetails, currentWeather} = data;

    // To paste Dynamic HTML content throught JavaScript ...

    let html = `<h5 class="my-3">${cityDetails.EnglishName}</h5>
                <div class="my-3">${currentWeather.WeatherText}</div>
                <div class="display-4 my-4">
                <span>${currentWeather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
                </div>`;
    editBox.innerHTML = html;

    card.classList.remove('d-none');          // To make content visible.

    // To paste weather Icons acc to weatherIcon number ...

    let iconScr = `images/icon/${currentWeather.WeatherIcon}.png`;
    icon.setAttribute('src', iconScr);

    // To paste the picture of day and night acc to weather data ...

    let bodySRC = null;
    if(currentWeather.IsDayTime){
        bodySRC = 'images/daypic.jpg';
    }else{
        bodySRC = 'images/nightpic.jpg';
    }
    time.setAttribute('src', bodySRC);
    //body.style.backgroundImage = url(`${bodySRC}`);
}

const updateCity = async (cityName)=>{
    const cityDetails = await cityLocation(cityName);
    //console.log(cityDetails);
    const currentWeather = await cityWeather(cityDetails.Key);
    const allDayWeather = await weatherForcast(cityDetails.Key);
    //console.log(allDayWeather);
    return {
        cityDetails:cityDetails,
        currentWeather:currentWeather,
        allDayWeather:allDayWeather
    }
    // OR return {cityDetails, currentWeather};
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const cityName = form.city.value.trim();   // Trim function used to trim the space entered by the user.
    form.reset();                              // To reset the form page.
    //console.log(cityName);
    updateCity(cityName)
    .then(data=>{
        updateUI(data);
        forcastShow(data)})   
    .catch(err=>console.log(err));
    localStorage.setItem('localScity' , cityName);
    //console.log(localStorage.getItem('localScity'));
});
if(localStorage.getItem('localScity')){
    updateCity(localStorage.getItem('localScity'))
    .then(data=>{
        updateUI(data);
        forcastShow(data)})
    .catch(err=>console.log(err));
}


