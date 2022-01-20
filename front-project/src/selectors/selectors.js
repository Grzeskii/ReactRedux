import {createSelector} from 'reselect'

const getWeather = state => state.weather.flat() 
const getKeyword = state => state.keyword 

export const getWeatherFilteredByName = createSelector(
    getWeather,
    getKeyword,
    (weather, keyword) => {
        if (keyword !== "") return weather.filter(weatherItem => weatherItem.name.toLowerCase().includes(keyword.toLowerCase()))
        return weather
    }
)
