import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core'
import { deleteComment } from '../actions/actions'
import Navbar from './Navbar'


const Details = ({reduxState, deleteComment}) => {
    
    const { id } = useParams()
    const history = useHistory()

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
      

    const detailsElement = reduxState.weather.flat().find(element => element.id === id)

    return (
        <>
        {(detailsElement === undefined) ? 
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
                    <h1>Comments:</h1>
                    {(detailsElement.comments.length === 0) ? <h3>No comments to display</h3> 
                    :
                    detailsElement.comments.map(comment => {
                        if (comment.text !== "") return (
                            <div className="comments" key={comment.id}> 
                                <Card className={classes.root}>
                                    <CardContent>
                                        <Typography className={classes.title} variant="h6" component="h3">{comment.text}</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="text" color="secondary" onClick={() => deleteComment(detailsElement.id, comment.id)}>delete</Button>
                                        <Button variant="text" color="primary" onClick={() => history.push(`/editComment/${id}/${comment.id}`)}>edit</Button>
                                    </CardActions>
                                </Card>
                            </div>
                        )
                        return null    
                    })}
                    <Button color="primary" variant="contained" onClick={() => history.push('/table')}>back to table</Button>
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
        deleteComment: (idWeather, idComment) => disptach(deleteComment(idWeather, idComment))
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Details)