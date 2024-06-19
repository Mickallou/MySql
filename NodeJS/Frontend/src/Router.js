import {Route, Routes} from 'react-router-dom';
import Students from './Students';  
import Average from './Average';
import AverageByCity from './AverageByCity';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<p>Hello World</p>} />
            <Route path="/students" element={<Students />} />
            <Route path='/average' element={<Average />} />
            <Route path='/average-by-city' element={<AverageByCity />} />
        </Routes>
    )
}