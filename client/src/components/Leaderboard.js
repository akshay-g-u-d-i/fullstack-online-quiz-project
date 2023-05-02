import React, { useEffect, useState } from 'react'
import Row from '../componentsuser/Row'
import { backendlink } from '../helper';
import LoadingSpinner from './LoadingSpinner';

//Yet Another Extra Feature implemented using ML, NLP.

export default function Leaderboard() {

  const [userdata, setuserdata] = useState(null)

  useEffect(() => {
    getfrombackend();
  }, [])

 
  const getfrombackend = async () => {

    const req = await fetch(backendlink+"/api/getdata", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }

    })

    const res = await req.json();
    // console.log(res);

    if (res.success) {

      // userdata = res.testdata
      setuserdata(res.testdata)
      // console.log(userdata)

    }
    else {
      console.log("error")
    }

  }


  return (
    <div className='rounded shadow-lg p-2 ' style={{ height: "550px" }}>
      <h5 className='m-3 text-success'>Leaderboard</h5>

      {(localStorage.getItem('authTkn') !== null)?
      <div>

        <div className="row m-2 text-primary">
          <div className='col-2'>Rank</div>
          <div className="col-7">Name</div>
          <div className="col-3">Score</div>
        </div>

        <div style={{ height: "430px", overflow: "auto" }} >

          {
            (userdata !== null) ?
              userdata.map((useritem, idx) => {
                return <Row index={idx} name={useritem.name} score={useritem.score} />
              }) :
              <LoadingSpinner />

          }

        </div>

      </div>:

      <div className='text-muted text-center'>Login to view the Leaderboard</div>

        }
    </div>
  )
}
