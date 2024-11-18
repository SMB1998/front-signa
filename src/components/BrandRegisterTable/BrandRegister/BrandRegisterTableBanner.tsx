import React, { useState } from "react";
import "./BrandRegisterTableBanner.css";
import { HiPlus } from "react-icons/hi";
import RegisterModal from "../../ResgisterModal/ResgisterModal";

const BrandRegisterTableBanner: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="transaction-banner">
      <h3 className="banner-text">{`Registro de marca`}</h3>
      <button className="custom-button" onClick={handleOpenModal}>
        <HiPlus className="icon" /> Agregar Marca
      </button>
      {isModalOpen && (
        <RegisterModal
          open={isModalOpen}
          onClose={handleCloseModal}
          brand={{ id: "", name: "", owner: "", status: "" }}
        />
      )}
    </div>
  );
};

export default BrandRegisterTableBanner;
