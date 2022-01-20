import { createAction } from 'redux-api-middleware'

export const getWeatherData = () => createAction({
    endpoint: 'http://localhost:3150/weather',
    method: 'GET',
    types: ['WEATHER_REQUEST', 'WEATHER_SUCCESS', 'WEATHER_FAILURE']
})

export const addDataForm = (id, cityName, ws, min, max, dt, cmt) => {
    return {
        type: "ADD_DATA_FORM",
        payload: {
            id: id,
            name: cityName,
            weather_state: ws,
            min_temp: min,
            max_temp: max,
            meas_date: dt,
            comments: cmt,
        }
    }
}

export const deleteRow = (id) => {
    return {
        type: "DELETE_ROW",
        id: id
    }
}

export const setKeyword = (searchText) => {
    return {
        type: "SET_KEYWORD",
        searchText: searchText
    }
}

export const sortByMinTemp = () => {
    return {
        type: "SORT_MIN_TEMP"
    }
}

export const sortByMaxTemp = () => {
    return {
        type: "SORT_MAX_TEMP"
    }
}

export const deleteComment = (idWeather, idComment) => {
    return {
        type: "DELETE_COMMENT",
        idWeather: idWeather,
        idComment: idComment,
    }
}

export const commentEdit = (idWeather, idComment, text) => {
    return {
        type: "EDIT_COMMENT",
        idWeather: idWeather,
        idComment: idComment,
        text: text
    }
}

export const weatherEdit = (id, cityName, ws, min, max, dt, cmt) => {
    return {
        type: "WEATHER_EDIT",
        payload: {
            id: id,
            name: cityName,
            weather_state: ws,
            min_temp: min,
            max_temp: max,
            meas_date: dt,
            comments: cmt,
        }
    }
}
