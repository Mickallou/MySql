import {Route, Routes} from 'react-router-dom';
import Students from './Students';  
import Average from './Average';
import AverageByCity from './AverageByCity';
import StudentGrades from './StudentGardes';
import './index.css'
import Dashboard from './Dashboard';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path='/average' element={<Average />} />
            <Route path='/average-by-city' element={<AverageByCity />} />
            <Route path='/student/:studentID/grade' element={<StudentGrades />} />
        </Routes>
    )
}