import { ReactNode, useContext } from "react";
import styles from "./Layout.module.css";

import { Inter } from "next/font/google";
import { AuthContext } from "@/contexts/AuthContext";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { loggedIn, user, handleLogOut } = useContext(AuthContext);

  return (
    <main className={inter.className}>
      <header className={styles.header}>
        <p>Best app</p>

        {!loggedIn ? (
          <Link href="/account/login">Log in</Link>
        ) : (
          <div>
            <p>{user?.role}</p>
            <button onClick={handleLogOut}>Log out</button>
          </div>
        )}
      </header>

      <div className={styles.container}>{children}</div>
    </main>
  );
};

export default Layout;
