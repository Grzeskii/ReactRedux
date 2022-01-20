import React from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, CardContent, TextField, Typography } from '@material-ui/core'
import { commentEdit } from '../actions/actions'
import Navbar from './Navbar'
import { Field, Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles'

const EditComment = ({reduxState, commentEdit}) => {
    
    const { weatherId, commentId } = useParams()
    const history = useHistory()

    const detailsElement = reduxState.weather.flat().find(element => element.id === weatherId)

    const commentToEdit = detailsElement.comments.find(comment => comment.id === commentId)

    const useStyles = makeStyles({
        root: {
          minWidth: 275,
          maxWidth: 700,
          marginBottom: 5,
        },
        title: {
          fontSize: 20,
        },
        details: {
            display: "flex",
            justifyContent: "center",
            fontFamily: "Roboto"
        },
        cityName: {
            fontSize: 50,
        },
        listStyle: {
            fontSize: 20,
        }
    })

    const classes = useStyles()

    return (
        <>
        {(detailsElement === undefined && commentToEdit === undefined) ? 
        <div>
            <h1>Whoops, that's a wrong ID!</h1>
            <Button color="primary" variant="contained" onClick={() => history.push('/table')}>back to table</Button>
        </div>
        
        :
        <>
            <Navbar />
            <div className={classes.details}>
                <div>
                    <h1 className={classes.cityName}>{detailsElement.name}, {detailsElement.weather_state}</h1>
                    <ul className={classes.listStyle}>
                        <li>Measured at {detailsElement.meas_date}</li>
                        <li>Maximal temperature of {detailsElement.max_temp}</li>
                        <li>Minimal temperature of {detailsElement.min_temp}</li>
                    </ul>
                    <h1>Comment to edit: </h1>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} variant="h6" component="h3">{commentToEdit.text}</Typography>
                        </CardContent>
                    </Card>
                    <h1>New comment: </h1>
                    <Formik
                    initialValues={{"comment": ""}}
                    validate={(values) => {
                        const errors = {}
                        if (values.comment.trim().length === 0) errors.comment = "Can't be empty"
                        return errors
                    }}
                    onSubmit={(data, { resetForm }) => {
                        commentEdit(weatherId, commentId, data.comment)
                        resetForm()
                        history.push(`/details/${weatherId}`)
                    }}>
                        {({values, errors}) => (
                            <Form>
                                <div>
                                    <Field style={{width: 400}}  name="comment" type="input" placeholder="What a nice city..." helperText={errors.comment} validate error={!!errors.comment} as={TextField} />
                                    <Button type="submit" color="primary" variant="outlined" style={{height: 33}}>submit</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            </>
        } 
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        reduxState: state
    }
}

const mapDisptachToProps = disptach => {
    return {
        commentEdit: (idWeather, idComment, text) => disptach(commentEdit(idWeather, idComment, text))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(EditComment)