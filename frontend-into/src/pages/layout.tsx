import Navbar from "@/components/Navbar/Navbar";
import React, { ReactNode } from "react";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <ProSidebarProvider>
      <div
        style={{
          display: "flex",
          height: "100vh",
        }}
      >
        <Sidebar defaultCollapsed={true} collapsedWidth="63px" width="100px">
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
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
          <Navbar />
          <div style={{ backgroundColor: "#F9F9FB" }}>{children}</div>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default Layout;
