import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Table.css'
import { GeneralContext } from './App';

export default function Average() {
    const [students, setStudents] = useState([]);
    const [min, setMin] = useState([]);
    const [max, setMax] = useState([]);
    const navigate = useNavigate();
    const { setLoading } = useContext(GeneralContext)


    
    useEffect(() => {
        setLoading(true)
        fetch("http://localhost:3890/students/average")
        .then(res => res.json())
        .then(data => {
            setStudents(data);
            const numbres = data.map((student) => +student.average);
            setMin(Math.min(...numbres));
            setMax(Math.max(...numbres));
        })
        .finally(() => setLoading(false))

    }, [setLoading]);
    return (
        <>
            {
                students.length !== 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Full Name</th>
                            <th>Grade</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{student.firstName} {student.lastName}</td>
                                <td className={
                                    // eslint-disable-next-line
                                    student.average == min ? 'min' : student.average == max ? 'max' : ''
                                }>{student.average}</td>
                                <td>
                                    <button className='edit' onClick={() => navigate(`/student/${student.id}/grade`)}>✍🏻</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }        
        </>
    )
}