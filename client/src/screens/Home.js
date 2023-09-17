import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Captions from '../components/Leaderboard'
import Dashboard from '../components/Dashboard'
import Analysisboard from '../admincomponents/Analysisboard'
import Performanceboard from '../admincomponents/Performanceboard'
import Carousel from '../components/Carousel'


//React rendering according to data --pending


export default function Home() {

  const [data, setdata] = useState()

  const getdata = (data) => {
    setdata(data)
  }


  const auth = localStorage.getItem('authTkn')
  var role = localStorage.getItem('userrole')

  // setrole(localStorage.getItem('userrole'))



  return (
    <>
    <div className='mt-4 pt-4'>

      <div><Navbar getdata={getdata}/> </div>
      
      <div className="container-fluid">

        {(role === null) &&
          <div className=' row mt-5'>
            {/* <div className='mb-2 bg-secondary text-white p-1 ps-5'><p className='d-inline text-warning'>Announcement </p>: The interactive puzzle is live! <Link to='/login' className='text-danger'>Click here</Link> to participate.</div> */}
            <div className="col-xl-8 col-lg-8 col-sm-12 rounded mt-3">
              <Carousel />
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-12 rounded text-white ms-5">
              <Captions />
            </div>
          </div>
        }

        {(role === 'user') &&
          <div className='row mt-5'>
            
            <div className="col-xl-9 col-lg-9 col-sm-12 rounded my-3">
              <Dashboard />
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-12 rounded my-3 text-white">
              <Captions />
            </div>
          </div>
        }

        {(role === 'admin') &&
          <div className='row mt-5'>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 rounded my-3">
              <Analysisboard />
            </div>

            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 rounded my-3 text-white">
              <Performanceboard />
            </div>
          </div>
        }


      </div>

    </div>
  
    <div className='mt-5'><Footer /></div> 
    </>
)

}
