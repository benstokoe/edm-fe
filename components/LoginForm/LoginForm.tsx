import { useForm } from "react-hook-form";
import Button from "@/components/Button/Button";

import styles from "./LoginForm.module.css";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

export type LoginFormFields = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const { handleLogIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>();

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(handleLogIn)}>
        <div className={styles.inputContainer}>
          <label htmlFor="username" className={styles.label}>
            Username
          </label>
          <input
            {...register("username", { required: true })}
            id="username"
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
          </div>
          <input
            {...register("password", { required: true, min: 8 })}
            className={styles.input}
            type="password"
          />
        </div>

        <Button type="submit" text="Log in" />
      </form>
    </div>
  );
};

export default LoginForm;
