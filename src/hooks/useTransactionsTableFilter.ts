import { useState } from "react";
import { Brand } from "../interfaces/brands/brands";

const useTransactionFilter = (transactions: Brand[]) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    Object.keys(transaction).some((key) => {
      const value = transaction[key];
      const valueAsString = value ? value.toString().toLowerCase() : "";
      return valueAsString.includes(searchTerm.toLowerCase());
    })
  );

  return { filteredTransactions, searchTerm, handleSearchChange };
};

export default useTransactionFilter;
