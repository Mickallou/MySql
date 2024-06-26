import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function duplicateObj(objectOrArray) {
    return JSON.parse(JSON.stringify(objectOrArray))
}

const StudentGardes = () => {
    const {studentID} = useParams();
    const [student, setStudent] = useState(null);
    const [initialStudent, setInitialStudent] = useState();
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        fetch(`http://localhost:3890/students/${studentID}`)
            .then(response => response.json())
            .then(data => {
                setStudent(data);
                setInitialStudent(duplicateObj(data));
                setLoader(false)
            })
    }, [studentID])

    function gradeChange(index, ev) {
        const {value} = ev.target;
        student.grades[index].grade = +value;
        setStudent({...student})
    }

    const save = () =>{
        const data = student.grades.filter(g => initialStudent.grades.find(x => x.id === g.id).grade !== g.grade);
        setLoader(true)
        fetch(`http://localhost:3890/students/${studentID}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(() =>{
            setLoader(false)
            setInitialStudent(duplicateObj(student));
        });
    }
    

    return (
        <div>
            {
                loader &&
                <div className="loaderFrame">
                    <div className="loader"></div>
                </div>

            }
            {student && (
                <div>
                    <header className="student">
                        <h2>Name of Students : {student.user.firstName} {student.user.lastName}</h2>
                        <button className="save" onClick={save}>Save</button>
                    </header>
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
                                    <td><input className="grade" type='number' value={student.grade} onChange={ev => gradeChange(index, ev)}></input></td>
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
