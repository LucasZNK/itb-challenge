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
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Sidebar
          defaultCollapsed={true}
          collapsedWidth="63px"
          width="100px"
          style={{ height: "100%" }}
          hidden={isHidden}
          backgroundColor="white"
        >
          <Menu>
            <MenuItem className="menu1">
              <h2>QUICKPAY</h2>
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            backgroundColor: "#F9F9FB",
          }}
        >
          <Navbar />
          <div>{children}</div>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default Layout;
