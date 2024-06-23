import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const StudentGardes = () => {
    const {studentID} = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3890/students/${studentID}`)
            .then(response => response.json())
            .then(data => setStudent(data))
    }, [studentID])

    return (
        <div>
            {student && (
                <div>
                    <h2>Name of Students : {student.user.firstName} {student.user.lastName}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>   
                                <th>Test</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.grades.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.grade}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )
            }
        </div>
    )
}

export default StudentGardes
