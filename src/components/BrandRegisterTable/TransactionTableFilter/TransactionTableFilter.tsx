import React from "react";
import { FaSearch } from "react-icons/fa";
import "./TransactionTableFilter.css";

interface TransactionFilterProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TransactionTableFilter: React.FC<TransactionFilterProps> = ({
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className="search-container">
      <div className="input-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default TransactionTableFilter;
