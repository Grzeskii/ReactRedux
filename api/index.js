const express = require('express')
const cors = require('cors')
const app = express()
const { v4: uuidv4 } = require('uuid')
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    next()
})

const data = {
    "data": [
        {
            "id": uuidv4(),
            "name": "New York",
            "min_temp": -2.2,
            "max_temp": 4.8,
            "weather_state": "Heavy Cloud",
            "meas_date": "2020-11-05",
            "comments": 
                [
                    {
                        "id": uuidv4(),
                        "text": "Great city!"
                    },
                    {
                        "id": uuidv4(),
                        "text": "This has to be the best place I've ever been to :D"
                    },
                    {
                        "id": uuidv4(),
                        "text": "Kinda boring..."
                    },
            ]
        },
            {
                "id": uuidv4(),
                "name": "London",
                "min_temp": -5.2,
                "max_temp": 3,
                "weather_state": "Light Rain",
                "meas_date": "2021-02-01",
                "comments": 
                    [
                        {
                            "id": uuidv4(),
                            "text": "Great city!"
                        },
                        {
                            "id": uuidv4(),
                            "text": "This has to be the best place I've ever been to :D"
                        },
                        {
                            "id": uuidv4(),
                            "text": "Kinda boring..."
                        },
                ]
            },
                {
                    "id": uuidv4(),
                    "name": "Warsaw",
                    "min_temp": -10.5,
                    "max_temp": -4.2,
                    "weather_state": "Light Cloud",
                    "meas_date": "2020-11-16",
                    "comments": 
                        [
                            {
                                "id": uuidv4(),
                                "text": "Great city!"
                            },
                            {
                                "id": uuidv4(),
                                "text": "This has to be the best place I've ever been to :D"
                            },
                            {
                                "id": uuidv4(),
                                "text": "Kinda boring..."
                            },
                    ]
                },        
                {
                    "id": uuidv4(),
                    "name": "Toronto",
                    "min_temp": -1.9,
                    "max_temp": 2.5,
                    "weather_state": "Light Rain",
                    "meas_date": "2020-12-24",
                    "comments": 
                        [
                            {
                                "id": uuidv4(),
                                "text": "Great city!"
                            },
                            {
                                "id": uuidv4(),
                                "text": "This has to be the best place I've ever been to :D"
                            },
                            {
                                "id": uuidv4(),
                                "text": "Kinda boring..."
                            },
                    ]
                },       
                {
                    "id": uuidv4(),
                    "name": "Moscow",
                    "min_temp": -17.3,
                    "max_temp": -8.5,
                    "weather_state": "Hail",
                    "meas_date": "2021-01-05",
                    "comments": 
                        [
                            {
                                "id": uuidv4(),
                                "text": "Great city!"
                            },
                            {
                                "id": uuidv4(),
                                "text": "This has to be the best place I've ever been to :D"
                            },
                            {
                                "id": uuidv4(),
                                "text": "Kinda boring..."
                            },
                    ]
                }
    ]
}   

app.get("/weather", (req, res) => {
    return res.send(data)
})

app.listen(3150, () => {
    console.log("Server listening on port 3150..")
})