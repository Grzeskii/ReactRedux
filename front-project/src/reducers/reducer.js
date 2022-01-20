const initialState = {
    weather: [],
    keyword: ""
}

export const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case "WEATHER_SUCCESS":
            return {
                ...state,
                weather: [...state.weather, action.payload.data]
            }
        case "ADD_DATA_FORM":
            return {
                ...state,
                weather: [...state.weather, action.payload]
            }
        case "DELETE_ROW": 
            return {
                ...state,
                weather: [...state.weather].flat().filter(element => element.id !== action.id)
            }
        case "SET_KEYWORD":
            return {
                ...state,
                keyword: action.searchText
            }
        case "SORT_MIN_TEMP":
            return {
                ...state,
                weather: [...state.weather].flat().sort((a, b) => (a.min_temp < b.min_temp) ? 1 : -1)
            }
        case "SORT_MAX_TEMP":
            return {
                ...state,
                weather: [...state.weather].flat().sort((a, b) => (a.max_temp < b.max_temp) ? 1 : -1)
            }
        case "DELETE_COMMENT":
            let comments = [...state.weather].flat().find(el => el.id === action.idWeather).comments.filter(cmt => cmt.id !== action.idComment)
            return {
                ...state,
                weather: [...state.weather].flat().map(element => {
                    if (element.id === action.idWeather) return {...element, comments: comments}
                    return element
                })
            }
        case "EDIT_COMMENT":
            let newComments = [...state.weather].flat().find(el => el.id === action.idWeather).comments.map(comment => {
                if (comment.id === action.idComment) return {...comment, text: action.text}
                return comment
            })
            return {
                ...state,
                weather: [...state.weather].flat().map(element => {
                    if (element.id === action.idWeather) return {...element, comments: newComments}
                    return element
                })
            }
        case "WEATHER_EDIT":
            return {
                ...state,
                weather: [...state.weather].flat().map(element => {
                    if (element.id === action.payload.id) return {...action.payload}
                    return element
                })
            }
        default:
            return state
    }
}