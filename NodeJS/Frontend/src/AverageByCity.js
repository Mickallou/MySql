import { useEffect, useState } from 'react';
import './Table.css'

export default function AverageByCity() {
    const [students, setStudents] = useState([]);
    const [min, setMin] = useState([]);
    const [max, setMax] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3890/students/average-by-city")
        .then(res => res.json())
        .then(data => {
            setStudents(data);
            const numbres = data.map((student) => +student.averageByCity);
            setMin(Math.min(...numbres));
            setMax(Math.max(...numbres));
        });
    }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>City</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.city}</td>
                        <td className={
                            // eslint-disable-next-line
                            student.averageByCity == min ? 'min' : student.averageByCity == max ? 'max' : ''
                        }>{student.averageByCity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    )
}