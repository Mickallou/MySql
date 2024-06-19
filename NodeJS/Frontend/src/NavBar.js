import {Link} from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li><Link to='/' >Home</Link></li>
                <li><Link to='/students' >Students</Link></li>
                <li><Link to='/average' >Average by Students</Link></li>
                <li><Link to='/average-by-city' >Average by City</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar
