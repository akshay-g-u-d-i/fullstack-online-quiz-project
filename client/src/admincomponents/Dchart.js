import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);



export default function Dchart(props) {

    const data = {
        labels: ['0 q', '1 q', '2 q', '3 q', '4 q', '5 q', '6 q', '7 q'],
        datasets: [
            {
                label: '# of Students',
                data: props.resarray,
                backgroundColor: [
                    'red',
                    'green',
                    'blue',
                    'orange',
                    'white',
                    'yellow',
                    'violet',
                    'pink'
                ]
            },
        ],
    };


    return (
        <div style={{ maxHeight: "400px" }}>
            <h5 className='text-white'>#Questions solved VS #Students <span className='text-muted mt-2'>Hover to see results</span></h5>
            <div> 
            <Doughnut data={data}/>
            
            </div>
        </div>
    )
}
