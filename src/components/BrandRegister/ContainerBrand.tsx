import { FC, useState } from "react";
import "./ContainerBrand.css";
import TransactionsTable from "../BrandRegisterTable/BrandRegisterTable";
import { LoadingTransactions } from "./LoadingTransactions/LoadingTransactions";
import Sidebar from "../SideBar/SideBar";
import Navbar from "../Navbar/Navbar";
import useBrandRegister from "../../hooks/useBrandRegister";

export const ContainerBrand: FC = () => {
  const { isLoaded } = useBrandRegister();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  if (!isLoaded) {
    return <LoadingTransactions />;
  }

  return (
    <div className="dashboard-transactions-container">
      <div className="layout">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={handleSidebarToggle}
        />
        <div className={`content ${isSidebarCollapsed ? "collapsed" : ""}`}>
          <Navbar />
          <div className="main-content">
            <TransactionsTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContainerBrand;
