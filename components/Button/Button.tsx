import styles from "./Button.module.css";

type ButtonProps = {
  type: "button" | "submit";
  onClick?: () => void;
  text: string;
};

const Button = ({ type = "button", onClick, text }: ButtonProps) => (
  <button type={type} className={styles.button} onClick={onClick}>
    {text}
  </button>
);

export default Button;
