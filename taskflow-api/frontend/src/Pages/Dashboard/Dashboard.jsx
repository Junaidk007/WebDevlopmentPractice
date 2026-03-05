import './dashboard.css';
import Navbar from '../../Components/layout/Navbar';
import BottomBar from '../../Components/layout/BottomBar';
import TaskDisplay from '../../Components/tasks/TaskDisplay';

function Dashboard() {
    return (
        <div className="container-fluid dashboard-shell">
            <div className="row g-0 dashboard-row">
                {/* Left sidebar navigation for desktop/tablet */}
                <div className="col-0 col-sm-3 col-md-3 col-lg-3 col-xl-2 sideNav p-0">
                    <Navbar />
                </div>

                {/* Main board area */}
                <div className="col-sm-9 col-md-9 col-lg-9 col-xl-10 dashboard-main p-0">
                    <div className="content">
                        {/* Header: title + filter actions */}
                        <div className="dashboard-header">
                            <div>
                                <p className="dashboard-kicker">Workspace</p>
                                {/* <h2 className="m-0">User Dashboard</h2> */}
                            </div>

                            <div className="dashboard-filter-wrap">
                                {/* Desktop filter pills */}
                                <div className="function">
                                    <button className="filter-pill" type="button">By Status</button>
                                    <button className="filter-pill" type="button">By Priority</button>
                                    <button className="filter-pill" type="button">Task Due</button>
                                    <button className="filter-pill" type="button">Total Task</button>
                                </div>

                                {/* Mobile filter dropdown */}
                                <div className="dropdown dashboard-dropdown">
                                    <button
                                        className="dashboard-menu-btn"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        aria-label="Open dashboard filters"
                                    >
                                        <i className="fa-solid fa-sliders"></i>
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><a className="dropdown-item" href="">By Status</a></li>
                                        <li><a className="dropdown-item" href="">By Priority</a></li>
                                        <li><a className="dropdown-item" href="">Task Due</a></li>
                                        <li><a className="dropdown-item" href="">Total Task</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Kanban columns + task cards */}
                        <TaskDisplay />
                    </div>
                </div>

                {/* Bottom navigation visible on small screens */}
                <BottomBar />
            </div>
        </div>
    );
}

export default Dashboard;
