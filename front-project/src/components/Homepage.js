import { Typography } from '@material-ui/core'
import React from 'react'
import Navbar from './Navbar'

const Homepage = () => {
    return (
        <div>
            <Navbar />
            <Typography variant="h2">Welcome to my frontend project :)</Typography>
            <Typography variant="h2">It contains:</Typography>
            <ul style={{listStyleType: "none"}}>
                <li><Typography variant="h4">A form using custom validation</Typography></li>
                <li><Typography variant="h4">Material table with custom sorting / searching / deleting</Typography></li>
                <li><Typography variant="h4">Detailed view for every entry in the table</Typography></li>
            </ul>
            <Typography variant="h6">Made by Grzegorz Rzeski</Typography>
        </div>
    )
}

export default Homepage