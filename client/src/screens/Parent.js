import React, { useState } from 'react'
import Child from './Child';

export default function Parent() {
    const [name, setname] = useState("Akshay")
    let setsome = (name)=>{
        setname(name);
    }


  return (
    <div>
        <h1>Name is : {name}</h1>
        <Child setsome={setsome} />

    </div>
  )
}
