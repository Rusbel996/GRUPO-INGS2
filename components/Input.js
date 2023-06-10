import styles from "../styles/Input.module.css";

export const Input = ({
  title,
  type,
  name,
  id,
  onChange,
  onClick,
  icon,
  value,
  readOnly,
}) => {
  return (
    <div className={styles.box}>
      <span className={styles.title}>{title}</span>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          autoComplete="off"
          rows={5}
          readOnly={readOnly}
          className={styles.input}
        />
      ) : type === "file" ? (
        <input
          type="file"
          name={name}
          id={id}
          accept="image/*"
          onChange={onChange}
          value={value}
        />
      ) : type === "date" ? (
        <input
          type="date"
          name={name}
          id={id}
          onChange={onChange}
          value={value}
          className={styles.input}
        />
      ) : (
        <div className={styles.inputbox}>
          <input
            type={type}
            name={name}
            id={id}
            onChange={onChange}
            value={value}
            autoComplete="off"
            readOnly={readOnly}
            className={styles.input}
          />
          {icon && <span onClick={onClick} className={styles.icon}>{icon}</span>}
        </div>
      )}
    </div>
  );
};