import React, { useEffect, useState } from 'react'
import { backendlink } from '../helper'

export default function Analysisboard() {

    useEffect(() => {

        takentestdata()
        signupdata()

    }, [])
    
    const [atmptsize, setatmptsize] = useState(0)
    const [regsize, setregsize] = useState(0)

    const takentestdata = async () => {

        const req = await fetch( backendlink + "/api/getdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const res = await req.json();
        // console.log(res);

        if (res.success) {

            // console.log(userdata)
            setatmptsize(res.testdata.length)

        }
        else
        {
            console.log("Error in taken test data")
        }

    }

    

    const signupdata = async () => {

        const req = await fetch( backendlink+"/api/getregdata", {
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
        }


    }

    return (
        <div className='bg-dark rounded' style={{ height: "550px" }}>

            <div>
                <h4 className='text-white p-3'>Analysis Board</h4>
            </div>

            <div className='m-3'>
                <h5 className='text-success'>Number of students appeared for test: {(atmptsize < regsize) ? <span className='text-danger'>{atmptsize}</span> : <span className='text-success'>{atmptsize}</span>   }</h5>
                <h5 className='text-success'>Number of students signed up on website: <span className='text-danger'>{regsize}</span> </h5>
                <h5 className='text-success'>Appeared percentage: <span className='text-danger'>{((atmptsize/regsize) * 100).toFixed(2) } %</span> </h5>
            </div>

        </div>
    )
}
