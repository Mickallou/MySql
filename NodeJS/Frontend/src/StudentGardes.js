import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { GeneralContext } from "./App";

export function duplicateObj(objectOrArray) {
    return JSON.parse(JSON.stringify(objectOrArray))
}

const StudentGardes = () => {
    const {studentID} = useParams();
    const [student, setStudent] = useState(null);
    const [initialStudent, setInitialStudent] = useState();
    const { setLoading } = useContext(GeneralContext)
    const [tests, setTests] = useState([]);
    const [isModal, setIsModal] = useState(false);
    const [newTest, setNewTest] = useState({
        testId: '',
        grade: ''
    }) 

    useEffect(() => {
        setLoading(true)
        fetch(`http://localhost:3890/students/${studentID}`)
            .then(response => response.json())
            .then(data => {
                setStudent(data);
                setInitialStudent(duplicateObj(data));
            })
            .finally(() => setLoading(false));

        fetch('http://localhost:3890/tests')
            .then(response => response.json())
            .then(data => setTests(data))
    }, [studentID, setLoading])

    const gradeChange = (index, ev) => {
        const {value} = ev.target;
        student.grades[index].grade = +value;
        setStudent({...student})
    }

    const save = () =>{
        const data = student.grades.filter(g => +initialStudent.grades.find(x => x.id === g.id).grade !== +g.grade);
        setLoading(true)
        fetch(`http://localhost:3890/students/${studentID}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
        .then(() =>{
            setLoading(false)
            setInitialStudent(duplicateObj(student));
        });
    }

    const handleChange = (ev) => {
        const { value, name } = ev.target;
        setNewTest({
            ...newTest, 
            [name]: value,
        })
    }

    const add = () => {
    const obj = {
        ...newTest,
        studentID,
    } 
        setLoading(true)
        fetch(`http://localhost:3890/students/test`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj),
        })
        .then(res => res.json())
        .then(data =>{
            const test = tests.find(t => t.id === +data.testId)
            data.name = test?.name || '';
            student.grades.push(data);
            setStudent({ ...student });
            initialStudent.grades.push(duplicateObj(data))
            setInitialStudent({...initialStudent})
            setIsModal(false)
            })
        .finally(() => {
            setLoading(false)
        })
    }    

    const remove = (testId, index) => {
        if (!window.confirm('Are you sure you want to remove this test')){
            return
        }
        setLoading(true)
        
        fetch(`http://localhost:3890/students/${studentID}/test/${testId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setLoading(false)

            student.grades.splice(index, 1);
            setStudent({ ...student });
            initialStudent.grades.splice(index, 1);
            setInitialStudent({ ...initialStudent });
        })
    }
    return (
        <div>
            {student && (
                <div>
                    <header className="student">
                        <h2>Name of Students : {student.user.firstName} {student.user.lastName}</h2>
                        <button className="save" onClick={save}>Save</button>
                    </header>
                    <button className="save" onClick={() => setIsModal(true)}>New Grade</button><br />
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>   
                                <th>Test</th>
                                <th>Grade</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {student.grades.map((student, index) => (
                                <tr key={student.index}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td><input className="grade" type='number' value={student.grade} onChange={ev => gradeChange(index, ev)}></input></td>
                                    <td><button onClick={() => remove(student.id, index)}>X</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                </div>
            )
            }
            { isModal &&
                <div className="modal-frame">
                <div className="modal">
                    <header>
                        <button className="close" onClick={() => setIsModal(false)}>X</button>
                        <h2>Test</h2>
                    </header>
                    <section >
                        <label>Tests: </label>
                        <select value={newTest.testId} name="testId" onChange={handleChange}>
                            <option value=''></option>
                            {tests.filter(t => !student.grades.map(g => g.testId).includes(t.id)).map(test => (
                                <option key={test.id} value={test.id}>{test.name}</option>
                            ))}
                        </select>

                        <label>Grade:</label>
                        <input className="gradeModal" type="number" name="grade" min={0} max={100}  value={newTest.grade} onChange={handleChange}/>
                    </section>

                    <footer>
                        <button onClick={add} className="save">Add</button>
                    </footer>
                </div>
            </div>}
        </div>
    )
}

export default StudentGardes
