import React, { useEffect, useState } from 'react'
import Row from './Row';
import { backendlink } from '../helper';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Performanceboard() {

    useEffect(() => {

        getfrombackend()

    }, [])
    
 
    const [userdata, setuserdata] = useState(null)

    const getfrombackend = async () => {

        const req = await fetch(backendlink+"/api/getdata", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })

        const res = await req.json();

        if (res.success) {
            
            console.log("first time")
            // userdata = res.testdata
            setuserdata(res.testdata)
            // console.log(userdata)
            
        }

    }

    


    return (
        <div className='bg-dark rounded' style={{ height: "550px" }}>

            <div>
                <h4 className='text-white p-3'>Performance Board</h4>
            </div>

            <div className='row m-2'>
                <div className="col-1 fs-5 ">Rank</div>
                <div className="col-4 fs-5 ">Name</div>
                <div className="col-4 fs-5 ">Email</div>
                <div className="col-1 fs-5 text-center">Score</div>
                <div className='col-2 fs-5 text-center'>Duration</div>
            </div>

            <div style={{ height: "400px", overflow: "auto" }}>
                {
                    (userdata !== null)?
                    userdata.map((useritem, idx) => {
                        return <div> <Row duration = {useritem.duration} index = {idx} name={useritem.name} email={useritem.email} score={useritem.score} /> </div>
                    }):
                    <LoadingSpinner />
                }

            </div>

        </div>
    )
}
