import styles from './button.module.css';

export function Button({ children, onClick, type = "button", disabled = false, active = false, title }) {
    return (
        <button
            type={type}
            title={title}
            className={`${styles.btn} ${active ? styles.active : ''} ${disabled ? styles.disabled : ''}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}