// components/Navbar.tsx
import React from "react";
import styles from "./Navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.searchBox}>
        <div className={styles.searchIcon}>
          <AiOutlineSearch />
        </div>
        <input
          className={styles.inputText}
          type="text"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default Navbar;
