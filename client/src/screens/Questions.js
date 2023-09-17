import React, { useEffect, useState } from 'react'
import qp from '../questionpaper'
import Timer from '../componentsuser/Timer'
import { useNavigate } from 'react-router-dom'
import { backendlink } from '../helper'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Questions() {
    // const [currtime, setcurrtime] = useState(0)
    // useEffect(() => {
    //   let timeid= setTimeout(()=>{
    //     setcurrtime(currtime+1)
    //   },1000)

    //   return ()=>{
    //     clearTimeout(timeid)
    //   }
    // })
    

    const [spin, setspin] = useState(false)

    let navigate = useNavigate()

    let seconds = 0
    let minutes = 0


    const [qno, setqno] = useState(0)
    const [correct, setcorrect] = useState(true)
    const [score, setscore] = useState(0)
    let duration = 0
    const maxi = qp.length

    const handleselect = (select) => {
        // setopt(label.target.value)
        // console.log(qp[qno].ans)
        // console.log(select)

        if (select === qp[qno].ans) {
            setcorrect(true)
            setscore(score + 1)
            setqno(qno + 1)
        }
        else {
            setcorrect(false)
        }
    }



    const handleclick = (e) => {
        // console.log(e)
        // console.log(score*10)
        setspin(true)
        saveanswers()
    }

    const savetime = () => {

        const starttime = localStorage.getItem('starttime')
        duration = (Date.now() - starttime);
        seconds = Math.trunc(duration / 1000)
        minutes = Math.floor(seconds / 60)
        seconds = seconds - minutes * 60
    }

    const goback = () => {

        setqno(qno)
        setcorrect(true)

    }


    const saveanswers = async () => {

        const name = localStorage.getItem('username')
        const email = localStorage.getItem('useremail')

        // console.log(starttime)
        // console.log(endtime)

        const req = await fetch(backendlink + "/api/submitanswers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': name,
                'email': email,
                'score': score * 10,
                'duration': duration
            })
        })

        const res = await req.json();

        if (res.success) {
            setspin(false)
            alert("Answers submitted succesfully.")
            navigate('/')
        }

        else {
            setspin(false)
            alert("You have already taken the test")
            navigate('/')
        }


    }



    return (
        <div style={{ minHeight: "700px", backgroundColor: "#022451" }}>
            {(localStorage.getItem('authTkn') !== null) &&
                <div >
                    
                    {(qno<maxi) &&
                    <div className="text-white bg-dark p-4">{(correct!==false) && <div className='d-inline me-5'><b>Question {qno+1}</b></div>} Remaining time: <Timer time= {Date.now() - localStorage.getItem('starttime')} /></div>
                    }
                    {(qno==maxi) &&
                    <div className="text-white bg-dark text-center mx-auto p-4"> Congratulations!! You've solved all questions.</div>
                    }

                    {(spin === false) ?
                        <div className="row">

                            {(qno < maxi && correct !== false) ?

                                <div>

                                    <div className="col-6 mx-auto bg-dark text-white mt-5 pt-3 pb-3 rounded shadow-lg">

                                        <div className=" m-3 px-3 rounded">
                                            <p className='fs-5'>{qp[qno].q}</p>

                                            {(qno === 1 && <img src={require('../images/question2.jpg')} alt='not found' width={"100%"} />)}
                                            {(qno === 3 && <img src={require('../images/question4.jpg')} alt='not found' width={"25%"} />)}
                                            {(qno === 4 && <img src={require('../images/question5.jpg')} alt='not found' width={"100%"} />)}


                                        </div>

                                        <div className='container text-center'>

                                            <div className=" col-5 mt-4 mb-4 ms-3 btn btn-success" onClick={() => handleselect("a")}> {qp[qno].a} </div>
                                            <div className=" col-5 mt-4 mb-4 ms-5 btn btn-success" onClick={() => handleselect("b")}> {qp[qno].b} </div>

                                        </div>

                                        <div className='container text-center'>

                                            <div className=" col-5  mb-4 ms-3 btn btn-success" onClick={() => handleselect("c")}> {qp[qno].c} </div>
                                            <div className=" col-5  mb-4 ms-5 btn btn-success" onClick={() => handleselect("d")}> {qp[qno].d} </div>

                                        </div>

                                        {/* {
                                        (correct === true) && <div>You moved one step ahead! Now solve this one!</div>


                                    } */}


                                    </div>

                                </div>

                                :

                                (correct === false) ?
                                    <div className="col-6 mx-auto bg-dark mt-5 p-5 rounded shadow-lg row">


                                        {savetime()}

                                        {(qno < 4) ?
                                            <>
                                                <div className="col-lg-6 col-xl-6 col-sm-12">
                                                    <h3 className='text-danger'>No way ahead! ❌</h3>
                                                    <hr />
                                                    <div className='btn btn-success d-block mt-5 mb-3' onClick={goback}> Take U-Turn</div>
                                                    <div className='btn btn-danger d-block' onClick={handleclick}>Submit</div>

                                                </div>

                                                <div className="col-lg-6 col-xl-6 col-sm-12 mt-5">

                                                    <img src={require('../images/deadend.jpg')} alt=" not found" width={"100%"} />

                                                </div>
                                            </> :

                                            <>
                                                <div className="col-lg-6 col-xl-6 col-sm-12 text-white">

                                                    <h3 className='text-danger'>OOPS!! DEADEND💀!!</h3>

                                                    <hr />
                                                    <h5>Here are the results:</h5>
                                                    <h6>Total questions: {maxi}</h6>
                                                    <h6>Correctly answered: {score}</h6>
                                                    <h6>Time taken: {(minutes < 10) ? ('0' + minutes) : (minutes)}:{(seconds < 10) ? ('0' + seconds) : (seconds)}</h6>
                                                    <h6>Total score: {score * 10}</h6>

                                                    <hr />
                                                    <div className='btn btn-success d-block' onClick={handleclick}>Submit</div>

                                                    <hr />

                                                </div>

                                                <div className="col-lg-6 col-xl-6 col-sm-12 mt-5">

                                                    <img src={require('../images/deadend.jpg')} alt=" not found" width={"100%"} />

                                                </div>
                                            </>

                                        }


                                    </div>

                                    :

                                    <div className="col-6 mx-auto bg-light mt-5 p-5 rounded shadow-lg row bg-dark">

                                        {savetime()}

                                        <div className="col-lg-6 col-xl-6 col-sm-12 text-white">

                                            <h3 className='text-success'>Treasure🪙 is yours!!</h3>
                                            <hr />
                                            <h5>Here are the results:</h5>
                                            <h6>Total questions: {maxi}</h6>
                                            <h6>Correctly answered: {score}</h6>
                                            <h6>Time taken: {(minutes < 10) ? ('0' + minutes) : (minutes)}:{(seconds < 10) ? ('0' + seconds) : (seconds)}</h6>
                                            <h6>Total score: {score * 10}</h6>

                                            <hr />
                                            <div className='btn btn-success d-block' onClick={handleclick}>Submit</div>

                                            <hr />

                                        </div>

                                        <div className="col-lg-6 col-xl-6 col-sm-12 mt-5">

                                            <img src={require('../images/tresure.jpg')} alt=" not found" width={"100%"} />

                                        </div>

                                    </div>

                            }

                        </div> :

                        <div><LoadingSpinner /></div>

                    }




                </div>




            }
            {(localStorage.getItem('authTkn') === null) && <div>The page you are expecting works only on login, please login and try.</div>}

        </div>
    )
}
