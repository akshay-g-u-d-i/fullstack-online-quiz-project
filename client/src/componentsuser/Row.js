import React from 'react'

export default function Row(props) {
    console.log(localStorage.getItem('leaderboarddata'))
  return (
    <div className='bg-light shadow-lg row m-2 p-2 rounded text-dark'>
        <div className='col-2'>{props.index + 1}</div>
        <div className="col-7">{props.name}</div>
        <div className="col-3 text-center">{props.score}</div>
        
    </div>
  ) 
}
