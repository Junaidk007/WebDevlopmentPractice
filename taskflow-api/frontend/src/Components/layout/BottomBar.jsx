import { Link, useNavigate } from 'react-router-dom';
import { useMyContext } from '../../Context/context';

function BottomBar() {
    const navigate = useNavigate();
    const { logout } = useMyContext();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bar p-0">
            <div className="bar-item d-flex">
                <Link to="/" aria-label="Home">
                    <i className="fa-solid fa-house"></i>
                </Link>

                <button type="button" className="bar-action" aria-label="Tasks">
                    <i className="fa-solid fa-list"></i>
                </button>

                <button type="button" className="bar-action bar-primary" aria-label="Add task">
                    <i className="fa-solid fa-circle-plus"></i>
                </button>

                <button type="button" className="bar-action" aria-label="User profile">
                    <i className="fa-solid fa-user"></i>
                </button>

                <button type="button" className="bar-action" aria-label="Logout" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                </button>
            </div>
        </div>
    );
}

export default BottomBar;
