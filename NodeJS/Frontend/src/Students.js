import { useEffect, useState } from 'react';
import moment from 'moment';
import './Table.css'

export default function Students() {
    const [students, setStudents] = useState([]);
    
    useEffect(() => {
        fetch("http://localhost:3890/students")
        .then(res => res.json())
        .then(data => setStudents(data));
    }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Phone</th>
                    <th>City</th>
                    <th>Birthday</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.phone}</td>
                        <td>{student.city}</td>
                        <td>{moment(student.birthday).format('DD/MM/YYYY')}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
    )
}