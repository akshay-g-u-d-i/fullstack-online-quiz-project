import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { backendlink } from '../helper';
import LoadingSpinner from '../components/LoadingSpinner';

//Component embedding pending
//Backend integration pending

export default function Signup() {

    const [spin, setspin] = useState(false)
    const [user, setuser] = useState({
        fullname: "",
        email: "",
        password: ""
    })
    let navigate = useNavigate();
    const [repassword, setrepassword] = useState("")

    const handleformchange = (label) => {
        setuser(
            {
                ...user,
                [label.target.id]: label.target.value
            }
        )
    }

    const handlerepassword = (label) => {
        setrepassword(label.target.value)
    }

    const handlesubmit = async (event) => {

        setspin(true)

        event.preventDefault();

        console.log(user.fullname)
        console.log(user.password)
        console.log(user.email)

        const req = await fetch(backendlink + "/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': user.fullname,
                'email': user.email,
                'password': user.password
            })
        })

        const res = await req.json();

        if (res.success) {
            setspin(false)
            alert("Account creation successful. Login with new credentials.")
            navigate('/login')
        }

        else {
            setspin(false)
            alert("Account already exists. Login with existing credentials.")
            navigate('/login')
        }


    }




    return (
        <div className=' mt-5 pt-5' >

            <div><Navbar getdata={(data) => { }} /></div>

            {(spin === false) ?

                <div className="row">



                    <div className="container-fluid row">

                        <div className="col-xl-8 col-lg-8 col-sm-12  rounded ms-4 mt-4">
                            <Carousel />
                        </div>

                        <div className="col-xl-3 col-lg-3 col-sm-12 mx-auto bg-light rounded mt-1 shadow-lg" style={{ maxHeight: "560px" }}>
                            <h5 className='text-dark ps-4 pt-4'>Sign up</h5>
                            <form className='p-4'>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label text-success">Full Name</label>
                                    <input type="text" className="form-control" id="fullname" aria-describedby="emailHelp" value={user.fullname} onChange={handleformchange} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label text-success">Email address</label>
                                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} onChange={handleformchange} />
                                    {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label text-success">Password</label>
                                    <input type="password" className="form-control" id="password" value={user.password} onChange={handleformchange} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label text-success">Re-enter password</label>
                                    <input type="text" className="form-control" id="repassword" value={repassword} onChange={handlerepassword} />
                                </div>

                                {
                                    repassword === user.password && repassword !== "" ? <div className='text-primary'>Passwords matched!</div> : repassword !== "" ? <div className='text-danger d-inline'>Passwords don't match</div> : ""
                                }

                                <div type="submit" className="btn btn-success mt-4 d-block" onClick={handlesubmit}>Sign up</div>
                                <div className='d-block text-center text-decoration-none mt-3 text-dark'>
                                    Already have an account? <Link to='/login'  >Login here</Link>
                                </div>
                            </form>

                        </div>



                    </div>

                    <div><Footer /></div>

                </div> :

                <LoadingSpinner />

            }


        </div >
    );
};
