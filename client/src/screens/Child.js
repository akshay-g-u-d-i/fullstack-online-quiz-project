import React from 'react'

export default function Child(props) {

    let onclick = ()=>{
    props.setsome("Neeraj");
    }
  return (
    <div>
        <button onClick={onclick}>Change name</button>
    </div>
  )
}
