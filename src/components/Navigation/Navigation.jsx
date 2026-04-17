import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const getLinkClassName = ({ isActive }) =>
  isActive ? `${styles.link} ${styles.activeLink}` : styles.link;

export default function Navigation() {
  return (
    <nav>
      <NavLink to="/" end className={getLinkClassName}>
        Главная
      </NavLink>

      <NavLink to="/authors" className={getLinkClassName}>
        Авторы
      </NavLink>

      <NavLink to="/books" className={getLinkClassName}>
        Книги
      </NavLink>
    </nav>
  );
}
