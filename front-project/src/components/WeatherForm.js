import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import { addDataForm } from '../actions/actions'
import { Field, Formik, Form, FieldArray } from "formik"
import { Button, MenuItem, Select, TextField } from '@material-ui/core'
import Navbar from './Navbar'


const WeatherForm = ({ addDataForm }) => {
    
    let today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    today = year + '-' + month + '-' + day
    
    return (
        <>
        <Navbar />
            <div className="weather-form" style={{display: "flex", justifyContent: "center", font: "Roboto"}}>
                <Formik 
                    initialValues={{
                        "name": "",
                        "weather_state": "",
                        "min_temp": 0,
                        "max_temp": 0,
                        "meas_date": today,
                        "comments": [{id: uuidv4(), text: ""}],
                    }}
                    validate={(values) => {
                            const errors = {}
                            const checkDate = values.meas_date.split("-")
                            const reg = /^[-]?[0-9]*\.?[0-9]+$/

                            if (values.name.length < 3 || values.name.length > 15) errors.name = "Name should be 3 to 20 characters"

                            if (reg.test(values.max_temp) === false) errors.max_temp = "Please use numbers only"
                            if (reg.test(values.min_temp) === false) errors.min_temp = "Please use numbers only"

                            if (values.weather_state === "") errors.weather_state = "Please choose something"

                            if (values.meas_date.length === 0) errors.meas_date = "Can't be empty!"
                            
                            if (checkDate[0] > year) errors.meas_date = "Are you a time traveller? Please select date before " + today
                            if (checkDate[0] === year.toString()) {
                                if (checkDate[1] > month) errors.meas_date = "Are you a time traveller? Please select date before " + today
                                if (checkDate[1] === month) {
                                    if (checkDate[2] > day) errors.meas_date = "Are you a time traveller? Please select date before " + today
                                }
                            }

                            return errors
                        }}

                    onSubmit={(data, { resetForm }) => {
                        const id = uuidv4()
                        addDataForm(id, data.name, data.weather_state, data.min_temp, data.max_temp, data.meas_date, data.comments)
                        resetForm()
                        alert("Added data successfully")
                    }}
                    >
                        {({values, errors, resetForm}) => (
                            <Form>
                                <div className="city-name-input">
                                    <h3>Name of the city:</h3>
                                    <Field name="name" type="input" placeholder="Gdańsk.." helperText={errors.name} validate error={!!errors.name} as={TextField} />
                                </div>
                                <div className="weather-state-input">
                                    <h3>Weather state:</h3>
                                    <Field name="weather_state" validate error={!!errors.weather_state} type="select" as={Select}>
                                        <MenuItem value="Heavy Cloud">Heavy Cloud</MenuItem>
                                        <MenuItem value="Light Cloud">Light Cloud</MenuItem>
                                        <MenuItem value="Heavy Rain">Heavy Rain</MenuItem>
                                        <MenuItem value="Light Rain">Light Rain</MenuItem>
                                        <MenuItem value="Sun">Sunny</MenuItem>
                                        <MenuItem value="Hail">Hail</MenuItem>
                                        <MenuItem value="Fog">Fog</MenuItem>
                                        <MenuItem value="Snow">Snow</MenuItem>
                                    </Field>
                                </div>
                                <div className="min-temp-input">
                                    <h3>Minimal temperature</h3>
                                    <Field name="min_temp" type="input" validate helperText={errors.min_temp} error={!!errors.min_temp} as={TextField} />
                                </div>
                                <div className="max-temp-input">
                                    <h3>Maximal temperature</h3>
                                    <Field name="max_temp" type="input" validate helperText={errors.max_temp} error={!!errors.max_temp} as={TextField} />
                                </div>
                                <div className="meas-date-input">
                                    <h3>Measurement date:</h3>
                                    <Field name="meas_date" type="date" validate helperText={errors.meas_date} error={!!errors.meas_date} as={TextField} />
                                </div>
                                <div className="comments-input">
                                    <h3>Comments:</h3>
                                    <FieldArray name="comments">
                                        {({remove, push}) => (
                                            <div>
                                                <Button color="primary" onClick={() => push({id: uuidv4(), text: ""})}>Add a comment</Button>
                                                {values.comments.length > 0 && values.comments.map((comment, index) => (
                                                    <div key={index}> 
                                                        <Field name={`comments.${index}.text`} required placeholder="Nice!" type="text" as={TextField}></Field>
                                                        <Button style={{height: 30}}color="secondary" variant="outlined" onClick={() => remove(index)}>X</Button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                                <div className="buttons" style={{marginTop: 15}}>
                                    <Button type="submit" color="primary" variant="contained">submit</Button>
                                    <Button style={{marginLeft: 10}}color="secondary" variant="contained" onClick={() => resetForm()}>reset</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </>
    )
}

const mapDisptachToProps = disptach => {
    return {
        addDataForm: (id, cityName, ws, min, max, dt, cmt) => disptach(addDataForm(id, cityName, ws, min, max, dt, cmt))
    }
}

export default connect(null, mapDisptachToProps)(WeatherForm)