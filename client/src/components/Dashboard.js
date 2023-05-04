import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  let navigate = useNavigate();

  const handletest = () => {
    if(window.confirm('The test will start on clicking ok button.')){
    localStorage.setItem('starttime', Date.now())
    navigate('/questions')
    }
  }


  return (
    <div className='shadow-lg rounded' style={{ height: "550px" }}>

      <div>

        {(localStorage.getItem('authTkn') !== null) && <h4 className='text-success p-3'>Test Instructions</h4>}
        {(localStorage.getItem('authTkn') === null) && <h4 className='text-success p-3'>Bulletin</h4>}

      </div>

      <div className="container-fluid">
        {(localStorage.getItem('authTkn') !== null) &&
          // <li><h5><div className='btn btn-info p-1' onClick={handletest}>Click here to enter the test</div></h5></li>
          <div>
            <ul>
              <li>This is a Treasure Hunt game</li>
              <li>Time limit: <span className='text-danger'>30 minutes</span></li>
              <li>You can take test any number of times, but only<span className='text-danger'> the first submission is used for evaluation</span> </li>
              <li>There are several deadends throughout the test, beware of them</li>
              <li>Once you are ready to start, click the below button (Start Game) to start the game.</li>
              <li className='text-danger mt-2'> <h5>Click the submit button once your test has ended </h5></li>


            </ul>

            <div className='btn btn-success p-1 mt-3 ms-3 px-3' onClick={handletest}>Start Game</div>


          </div>



        }
        {/* {(localStorage.getItem('authTkn') === null) && <li><h5><Link to='/login' className='text-danger'>Click here to take the test</Link></h5></li>} */}


      </div>

    </div>
  );
}
