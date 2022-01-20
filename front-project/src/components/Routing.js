import React from 'react'
import { Route, BrowserRouter  as Router, Switch, Redirect } from 'react-router-dom'
import Details from './Details'
import EditComment from './EditComment'
import EditWeather from './EditWeather'
import Homepage from './Homepage'
import NotFound from './NotFound'
import Table from './Table'
import WeatherForm from './WeatherForm'

const Routing = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Homepage} />
                    <Route exact path="/404" component={NotFound} />
                    <Route exact path="/table" component={Table} />
                    <Route exact path="/weather_form" component={WeatherForm} />
                    <Route exact path="/details/:id" component={Details} />
                    <Route exact path="/editWeather/:id" component={EditWeather} />
                    <Route exact path="/editComment/:weatherId/:commentId" component={EditComment} />
                    <Redirect to="/404" />
                </Switch>
            </Router>
        </div>
        
    )
}

export default Routing