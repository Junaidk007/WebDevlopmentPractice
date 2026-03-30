import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../../Context/context';
import ThemeToggle from './ThemeToggle';
import './navbar.css';

const menuItems = [
    { id: 'home', icon: 'fa-house', label: 'Home', route: '/' },
    { id: 'tasks', icon: 'fa-list', label: 'Tasks' },
    { id: 'user', icon: 'fa-user', label: 'User' }
];

function Navbar() {
    const navigate = useNavigate();
    const { logout } = useMyContext();

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <div className="sidebar-shell">
            <div className="nav">
                {/* Brand area */}
                <div className="navbar-brand pt-4 ps-3">
                    <h4 className="fs-3 m-0" style={{ color: 'var(--text-main)' }}>TaskFlow</h4>
                    <p className="brand-caption" style={{ color: 'var(--text-muted)' }}>Plan smart. Ship on time.</p>
                </div>

                {/* Main navigation links */}
                <div className="nav-ul">
                    <div className="navbar-nav">
                        {menuItems.map((item) => (
                            item.route ? (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="nav-link menu-item nav-btn"
                                    onClick={() => navigate(item.route)}
                                >
                                    <i className={`fa-solid ${item.icon}`}></i>{item.label}
                                </button>
                            ) : (
                                <button key={item.id} type="button" className="nav-link menu-item nav-btn">
                                    <i className={`fa-solid ${item.icon}`}></i>{item.label}
                                </button>
                            )
                        ))}
                    </div>
                </div>
                
                <div className="logout">
                    <div style={{ padding: '0 0.75rem 1rem' }}>
                        <ThemeToggle />
                    </div>
                    <button type="button" className="nav-link menu-item logout-link nav-btn" onClick={handleLogout}>
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
