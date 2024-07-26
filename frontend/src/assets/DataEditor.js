import React from 'react'
import axios from "axios";

function DataEditor() {

  const fetchData = async(id) => {
    const response = await axios.put('http://localhost:8000/word:{`id`}')
  }
  return (
    <div className='container'>
      <h1 className='title'>Data Editor</h1>
    </div>
  )
}

export default DataEditor