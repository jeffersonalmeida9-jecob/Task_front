import { NavLink } from 'react-router';
import styles from "../css's/Sidebar.module.css";
import { useAuth } from '../contexts/AuthContext';

function Sidebar() {
    const { logado, logout } = useAuth();
    const linkClass = ({ isActive }) => isActive ? styles.link + ' ' + styles.ativo : styles.link;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h1>TaskFlow - Kanban</h1>
            </div>
            <nav className={styles.nav}>
                {logado && <NavLink to='/' className={linkClass}>kanban</NavLink>}
                <NavLink to='/sobre' className={linkClass}>Sobre</NavLink>
                {!logado && <NavLink to='/Login' className={linkClass}>Login</NavLink>}
            </nav>
            {logado && (<button className={styles.btnLogout} onClick={logout}>Sair</button>)}
        </aside>
    );
};
export default Sidebar;

