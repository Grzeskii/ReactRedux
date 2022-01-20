import React from 'react'
import { Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
    
    const history = useHistory()

    return (
        <div>
            <h2>The page you are looking doesn't exist 😔</h2>
            <Button variant="outlined" onClick={() => history.push("/")}>Back to home!</Button>
        </div>
        
    )
}

export default NotFound