import React from 'react'

//Not necessary for this project

export default function Carousel() {
    return (
        <div className='container-fluid'>
            <h5  className='text-dark text-center fst-italic'>Salient features of the website</h5>
            <div id="carouselExampleFade" className="carousel slide carousel-fade   " data-bs-ride="carousel" >
                <div className="carousel-inner" id = "carousel">
                    
                    <div className="carousel-item">
                        <img src={require('../images/admindb.jpg')} className=" d-block mx-auto" style={{width:"100%"}} alt="..." />
                    </div>
                    <div className="carousel-item active">
                        <img src= {require('../images/userdb.jpg')} className="d-block mx-auto" alt="..." style={{width:"100%"}} />
                    </div>
                    <div className="carousel-item">
                        <img src={require('../images/treasurehunt.jpg')} className="d-block mx-auto" alt="..." style={{width:"100%"}} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-dark rounded" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-dark rounded" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}
