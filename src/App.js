import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Divider, Input, List } from 'antd';
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
        <p style={{color:'black',fontWeight:"bold",fontSize:20}}>List Repositories Github</p>
        <div style={{ marginBottom:10 }}>
        <form onSubmit={onSearch}>
        <Search
            placeholder="Search github by user"
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
