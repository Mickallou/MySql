import { useEffect, useState } from 'react';
import './Table.css'

export default function AverageByCity() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3890/students/average-by-city")
        .then(res => res.json())
        .then(data => setStudents(data));
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
                        <td>{student.averageByCity}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    )
}