import React, { ReactNode, useState, useEffect } from "react";
import Navbar from "@/components/Navbar/Navbar";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import styles from "./layout.module.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isHidden, setIsHidden] = useState(false);

  const updateSidebarVisibility = () => {
    if (window.innerWidth <= 630) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  };

  useEffect(() => {
    updateSidebarVisibility();
    window.addEventListener("resize", updateSidebarVisibility);

    return () => {
      window.removeEventListener("resize", updateSidebarVisibility);
    };
  }, []);

  return (
    <ProSidebarProvider>
      <div className={styles.sidebarContainer}>
        <Sidebar
          defaultCollapsed={true}
          collapsedWidth="63px"
          width="100px"
          className={styles.sidebar}
          hidden={isHidden}
        >
          <Menu>
            <MenuItem className="menu1">
              <h2>Into the blocks</h2>
            </MenuItem>
            <MenuItem> Dashboard </MenuItem>
            <MenuItem> Invoices </MenuItem>
            <MenuItem> Charts </MenuItem>
            <MenuItem> Wallets </MenuItem>
            <MenuItem> Transactions </MenuItem>
            <MenuItem> Settings </MenuItem>
            <MenuItem> Logout </MenuItem>
          </Menu>
        </Sidebar>
        <div className={styles.mainContent}>
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default Layout;
