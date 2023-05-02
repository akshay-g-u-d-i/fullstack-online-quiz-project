import { useEffect, useState } from "react";

function Timer(props){

    const max = 30*60
    const [counter, setCounter] = useState(max);
 
    useEffect(() =>{
        if(counter > 0){
            setTimeout(()=>setCounter(counter - 1), 1000);
        }
    },[counter]);

    return(
        <span className="text-white"> ⏱️
            {(Math.floor(counter/60) <10)? '0'+ Math.floor(counter/60) : Math.floor(counter/60)}:{(counter%60 < 10)? '0' + counter%60: counter%60}
        </span>
    )
}

export default Timer;