import React, { useState } from 'react'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import { addDataForm, deleteRow, setKeyword, sortByMinTemp, sortByMaxTemp, getWeatherData } from '../actions/actions'
import { Button} from '@material-ui/core'
import MaterialTable from 'material-table'
import { useHistory } from 'react-router-dom'
import { getWeatherFilteredByName } from '../selectors/selectors'


const Table = ({reduxState, getWeatherData, deleteRow, setKeyword, sortByMinTemp, sortByMaxTemp}) => {
    
    let today = new Date()
    const day = String(today.getDate()).padStart(2, '0')
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    today = year + '-' + month + '-' + day

    const history = useHistory()

    const materialTableColumns = [
        {title: 'Name', field: 'name'},
        {title: 'Weather State', field: 'weather_state'},
        {title: 'Min. Temperature', field: 'min_temp'},
        {title: 'Max. Temperature', field: 'max_temp'},
        {title: 'Measurement Date', field: 'meas_date'},
        {title: 'Details', field: 'delete', render: rowData => <Button
        variant="contained" 
        onClick={(e) => {
            e.preventDefault()
            history.push(`/details/${rowData.id}`)
        }}>details</Button>},{title: 'Edit', field: 'edit', render: rowData => <Button
        variant="contained" 
        onClick={(e) => {
            e.preventDefault()
            history.push(`/editWeather/${rowData.id}`)
        }}>edit</Button>}]

    const uppperButtonStyle = {
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
    }

    const [searchText, setSearchText] = useState("")

    return (
        <div>
            <Navbar />
            <Button color="primary" variant="contained" style={uppperButtonStyle} onClick={() => getWeatherData()}>get sample data</Button>
            <Button color="primary" variant="contained" style={uppperButtonStyle} onClick={() => history.push("/weather_form")}>add your own data</Button>
            <input value={searchText} onChange={(e) => setSearchText(e.target.value)} style={{height: 30, marginRight: 5, marginTop: 5, marginBottom: 5}}></input>
            <Button color="primary" variant="contained" style={uppperButtonStyle} onClick={() => {setKeyword(searchText); setSearchText("")}}>search by name</Button>
            <Button color="secondary" variant="contained" style={uppperButtonStyle} onClick={() => setKeyword("")}>reset</Button>
            <Button color="primary" variant="contained" style={uppperButtonStyle} onClick={() => sortByMinTemp()}>sort by min. temp</Button>
            <Button color="primary" variant="contained" style={uppperButtonStyle} onClick={() => sortByMaxTemp()}>sort by max. temp</Button>
            <MaterialTable
                columns={materialTableColumns}
                data={reduxState}
                title="Weather"
                options={{
                    filtering: false,
                    grouping: false,
                    sorting: false,
                    search: false,
                }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete',
                        onClick: (event, rowData) => deleteRow(rowData.id)
                    }
                ]} /> 
        </div>
    )
}

const mapStateToProps = state => {
    return {
        reduxState: getWeatherFilteredByName(state)
    }
}

const mapDisptachToProps = dispatch => {
    return {
        getWeatherData: () => {
            dispatch(getWeatherData())
        },
        addDataForm: (id, cityName, ws, min, max, dt, cmt) => dispatch(addDataForm(id, cityName, ws, min, max, dt, cmt)),
        deleteRow: (id) => dispatch(deleteRow(id)),
        setKeyword: (searchText) => dispatch(setKeyword(searchText)),
        sortByMinTemp: () => dispatch(sortByMinTemp()),
        sortByMaxTemp: () => dispatch(sortByMaxTemp()),
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(Table)