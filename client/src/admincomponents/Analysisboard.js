import React, { useEffect, useState } from 'react'
import { backendlink } from '../helper'
import Dchart from './Dchart'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Analysisboard() {

    useEffect(() => {

        takentestdata()
        signupdata()

    }, [])

    const [spin, setspin] = useState(false)
    const [atmptsize, setatmptsize] = useState(0)
    const [regsize, setregsize] = useState(0)
    const [resarray, setresarray] = useState([])
    const [minutes, setminutes] = useState(0)
    const [seconds, setseconds] = useState(0)
    // const [atmptdata, setatmptdata] = useState({
    //     0: 0,
    //     1: 0, 
    //     2: 0,
    //     3: 0,
    //     4: 0,
    //     5: 0,
    //     6: 0,
    //     7: 0
    // })
    
    const takentestdata = async () => {

        setspin(true)

        const req = await fetch(backendlink + "/api/getdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const res = await req.json();
        // console.log(res);

        if (res.success) {

            const arr = [0,0,0,0,0,0,0,0]
            let millisecs = 0

            for (let key of res.testdata)
            {
                millisecs += key.duration
                let curno = key.score/10
                arr[curno] += 1
            }
            millisecs = (millisecs)/res.testdata.length
            setminutes(Math.floor(millisecs/60000))
            setseconds(Math.floor(millisecs/1000) - Math.floor(millisecs/60000)*60)
            setresarray(arr)
            setatmptsize(res.testdata.length)
            setspin(false)

        }
        else {
            alert("Error in taken test data")
            setspin(false)
        }

    }



    const signupdata = async () => {

        setspin(true)

        const req = await fetch(backendlink + "/api/getregdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const res = await req.json();
        // console.log(res);

        if (res.success) {

            // userdata = res.testdata
            setregsize(res.size)
            setspin(false)
        }
        else {
            alert('Error in fetching data. Please try again')
            setspin(false)
        }


    }

    return (
        <div className='bg-dark rounded pb-5' style={{height:"650px"}}>

            <div>
                <h4 className='text-white p-3'>Analysis Board</h4>
                <h6 className='text-muted ms-3'>(Scroll down to view Performance Board)</h6>
            </div>

            {(spin === false) ?

                <div className='row'>

                    <div className='m-3 ms-3 col-7'>
                        <h5 className='text-success'>Number of students appeared for test: {(atmptsize < regsize) ? <span className='text-danger'>{atmptsize}</span> : <span className='text-success'>{atmptsize}</span>}</h5>
                        <h5 className='text-success'>Number of students signed up on website: <span className='text-danger'>{regsize}</span> </h5>
                        <h5 className='text-success'>Appeared percentage: <span className='text-danger'>{((atmptsize / regsize) * 100).toFixed(2)} %</span> </h5>
                        <hr className='text-white' />
                        <h5 className='text-success'>Number of students who found treasure: <span className='text-danger'>{resarray[7]} </span> </h5>
                        <h5 className='text-success'>Number of students who lost on penultimate step of finding treasure: <span className='text-danger'>{resarray[6]} </span> </h5>
                        <hr className='text-white' />
                        <h5 className='text-white'>Average time spent in playing game: <span className='text-danger'> {(minutes<10)? ('0'+minutes) : (minutes)}:{(seconds<10)? ('0'+seconds): (seconds)}</span></h5>
                        

                    </div>

                    <div className='col-4'>
                        <Dchart resarray = {resarray} />
                    </div>

                </div> :

                <LoadingSpinner />

            }

        </div>
    )
}
