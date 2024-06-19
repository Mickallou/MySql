import { useEffect, useState } from 'react';
import './Table.css'

export default function Average() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3890/students/average")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Full Name</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.firstName} {student.lastName}</td>
                        <td>{student.average}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    )
}