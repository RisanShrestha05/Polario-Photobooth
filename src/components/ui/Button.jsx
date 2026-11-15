import styles from './Button.module.css';

/** variant: primary | accent | secondary | ghost */
export default function Button({ variant = 'primary', icon, iconRight, children, className = '', ...rest }) {
  return (
    <button type="button" className={`${styles.btn} ${styles[variant]} ${className}`} {...rest}>
      {icon}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
