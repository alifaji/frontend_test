import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Input, List } from 'antd';
import 'antd/dist/antd.css';
const { Search } = Input;

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
        <div className="App" style={{padding:20}}>
        <p style={{color:'black',fontWeight:"bold"}}>List Repositories github</p>
        <div style={{ marginBottom:10 }}>
        <form onSubmit={onSearch}>
        {/* <input type="text" name="search" onChange={(e) =>handleChange(e.target.value)} />
        <button type="submit">Search</button> */}
        
        <Search
            placeholder="input search text"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            onChange={(e) => handleChange(e.target.value)}
        />
        
        </form>
        </div>
        {
            (list.length > 0) ? 
                    // <li>{data.name}</li>
                    <List
                        bordered
                        dataSource={list}
                        renderItem={item => (
                            <List.Item>
                                {item.name}
                            </List.Item>
                        )}
                        />
             : <p>Data not found!</p>
        }
        </div>
    );
}

export default App;
