import React, { useContext, useEffect, useState } from 'react'
import './Dashboard.css'
import { GeneralContext } from './App';


const Dashboard = () => {
    const [data, setData] = useState()
    const { setLoading } = useContext(GeneralContext)

    useEffect(() => {
            setLoading(true)
            const url = 'http://localhost:3890/dashboard'

            Promise.all([
                fetch(`${url}/students/amount`).then(res => res.text()),
                fetch(`${url}/cities/amount`).then(res => res.text()),
                fetch(`${url}/tests/amount`).then(res => res.text()),
                fetch(`${url}/tests/avg`).then(res => res.text()),
                fetch(`${url}/students/the-best`).then(res => res.json()),
                fetch(`${url}/cities/the-best`).then(res => res.json()),
                fetch(`${url}/students/birthday`).then(res => res.json()),
            ])
                .then(result => {
                    setData(result)
                })
                .finally(() =>
                    setLoading(false)
                )
    }, [setLoading]);

    return (
        <div className='frame'>
            { data &&
            <div className='Dashboard'>
                <div className='card'>
                    <header>Students</header>
                    <div>{data[0]}</div>
                </div>
                <div className='card'>
                    <header>Cities</header>
                    <div>{data[1]}</div>
                </div>
                <div className='card'>
                    <header>Tests</header>
                    <div>{data[2]}</div>
                </div>

                <div className='card'>
                    <header>Average Grade</header>
                    <div>{data[3]}</div>
                </div>
                <div className='card'>
                    <header>Best Students</header>
                    <div>{data[4].firstName} {data[4].lastName}
                    <br/><small>{data[4].grade}</small>
                    </div>
                </div>
                <div className='card'>
                    <header>Best Cities</header>
                    <div>{data[5].city}</div>
                </div>
                <div className='card'>
                    <header>Birthday</header>
                    <ul>
                    {
                        data[6].map(s => 
                            <li key={s.id}>{s.firstName} {s.lastName} ({s.age})</li>
                        )
                    }
                    </ul>
                </div>           
            </div>
            }
        </div>
    )
}

export default Dashboard
