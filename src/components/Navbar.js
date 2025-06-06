import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/employee-login">Employee Login</Link>
        </nav>
    );
};

export default Navbar;