// components/Navbar.tsx
import React from "react";
import styles from "./Navbar.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.title}>Dashboard</div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchText}
          type="text"
          placeholder="Search..."
        />
        <AiOutlineSearch className={styles.searchIcon} />
      </div>
    </div>
  );
};

export default Navbar;
