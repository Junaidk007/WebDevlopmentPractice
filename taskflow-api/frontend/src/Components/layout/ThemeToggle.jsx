import { useMyContext } from '../../Context/context';
import './themeToggle.css';

function ThemeToggle() {
    const { theme, toggleTheme } = useMyContext();
    
    return (
        <button 
            type="button" 
            className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`} 
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            <div className="toggle-thumb">
                <i className={`fa-solid ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
            </div>
        </button>
    );
}

export default ThemeToggle;
