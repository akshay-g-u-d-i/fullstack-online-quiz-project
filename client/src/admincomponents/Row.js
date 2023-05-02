import React from 'react'

export default function Row(props) {
 
    let seconds = Math.trunc(props.duration/1000)
    let minutes = Math.floor(seconds/60)
    seconds = seconds - minutes*60

  return (
    <div className='row bg-white rounded m-2 p-3'>

        <div className="col-1 text-dark">{props.index + 1}</div>
        <div className="col-4 text-dark"> {props.name}  </div>
        <div className="col-4 text-dark"> {props.email}  </div>
        <div className="col-2 text-dark text-center"> {props.score}  </div>
        <div className="col-1 text-dark text-center"> {(minutes<10)? ('0'+minutes) : (minutes)}:{(seconds<10)? ('0'+seconds): (seconds)}  </div>


    </div>
  )
}
