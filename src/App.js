import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    
    const [list, setList] = useState([])
    const [dataSearch, setDataSearch] = useState("")

    const handleChange = (event) => {
        setDataSearch(event)
    }

    const onSearch = (e) => {
        e.preventDefault();
        axios.get(`https://api.github.com/users/${dataSearch}/repos`).then(result => {
            console.log(result)
            setList(result.data)
           
        }).catch(err => {
            setList(null)
        })
    }

    return (
        <div className="" style={{padding:20}}>
        <p style={{color:'black',fontWeight:"bold"}}>List Repositories github</p>
        <div style={{ marginBottom:10 }}>
        <form onSubmit={onSearch}>
        <input type="text" name="search" onChange={(e) =>handleChange(e.target.value)} />
        <button type="submit">Search</button>
        </form>
        </div>
        {
            (list.length > 0) ? list.map((data) => {
                return(
                    <li>{data.name}</li>
                )
            }) : <p>Data not found!</p>
        }
        </div>
    );
}

export default App;
