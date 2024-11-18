import React, { useState } from "react";
import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";
import "./BrandRegisterTable.css";
import useTransactionFilter from "../../hooks/useTransactionsTableFilter";
import TransactionFilter from "./TransactionTableFilter/TransactionTableFilter";
import {
  statusObject,
  TransactionStatus,
} from "./TransactionsTypes/TransactionTypes";
import { EmptyDataAlert } from "./EmptyDataAlert/EmptyAlert";
import ResgisterModal from "../ResgisterModal/ResgisterModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deleteBrand, fetchBrands } from "../../store/slices/brandSlice";
import { Brand } from "../../interfaces/brands/brands";
import useBrandRegister from "../../hooks/useBrandRegister";
import BrandRegisterTableBanner from "./BrandRegister/BrandRegisterTableBanner";

const BrandRegisterTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { displayedTransactions } = useBrandRegister();
  const { filteredTransactions, searchTerm, handleSearchChange } =
    useTransactionFilter(displayedTransactions);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<Brand | null>(
    null
  );

  const handleEditClick = (transaction: Brand) => {
    setTransactionToEdit(transaction);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (transactionId: string) => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta transacción?")
    ) {
      dispatch(deleteBrand(transactionId));
      dispatch(fetchBrands());
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setTransactionToEdit(null);
  };

  return (
    <div className="brand-container">
      <BrandRegisterTableBanner />

      <TransactionFilter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <table className="brand-table">
        <thead>
          <tr>
            <th className="brand-column">#</th>
            <th className="brand-column">Nombre de Marca</th>
            <th className="brand-column">Titular</th>
            <th className="brand-column">Estado</th>
            <th className="brand-column">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-data-alert">
                <EmptyDataAlert />
              </td>
            </tr>
          ) : (
            filteredTransactions?.map((brand, index) => {
              const status = brand.status as TransactionStatus;

              return (
                <tr key={brand.id}>
                  <td className="brand-column">{index + 1}</td>
                  <td className="brand-column">{brand.name}</td>
                  <td className="brand-column">{brand.owner}</td>
                  <td className="brand-column">
                    {statusObject[status]?.label}
                  </td>
                  <td>
                    <div className="brand-column-actions">
                      <HiOutlinePencil
                        className="action-icon"
                        onClick={() => handleEditClick(brand)}
                      />

                      <HiOutlineTrash
                        className="action-icon"
                        onClick={() => handleDeleteClick(brand.id)}
                      />
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>

      {isEditModalOpen && transactionToEdit && (
        <ResgisterModal
          open={isEditModalOpen}
          onClose={handleCloseEditModal}
          brand={transactionToEdit}
        />
      )}
    </div>
  );
};

export default BrandRegisterTable;
