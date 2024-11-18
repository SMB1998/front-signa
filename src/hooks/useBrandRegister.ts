import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AppDispatch } from "../store/store";
import { Brand } from "../interfaces/brands/brands";
import { fetchBrands } from "../store/slices/brandSlice";

interface Filters {
  [key: string]: string | number | boolean;
}

const useBrandRegister = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();

  const [tempFilters, setTempFilters] = useState<Filters>({});

  const allTransactions = useSelector(
    (state: any) => state.transactions.brands
  );
  const [displayedTransactions, setDisplayedTransactions] = useState<Brand[]>(
    []
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (allTransactions?.length === 0 && !isLoaded) {
      setIsLoaded(false);
      dispatch(fetchBrands())
        .then((response: any) => {
          const allFetchedTransactions = response.payload;
          if (allFetchedTransactions) {
            setDisplayedTransactions(allFetchedTransactions);
          }
          setIsLoaded(true); // Marca como cargado
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          setDisplayedTransactions([]);
          setIsLoaded(true);
        });
    } else {
      setDisplayedTransactions(allTransactions);
    }
  }, [dispatch, allTransactions, isLoaded]);

  useEffect(() => {
    const loadedFilters: Filters = {};
    searchParams.forEach((value, key) => {
      loadedFilters[key] =
        value === "true" ? true : value === "false" ? false : value;
    });

    setTempFilters(loadedFilters);
  }, [searchParams]);

  const handleFilterChange = (name: string, value: string | boolean) => {
    setTempFilters((prev) => ({ ...prev, [name]: value }));
  };

  return {
    filters: tempFilters,
    displayedTransactions,
    handleFilterChange,
    isLoaded,
  };
};

export default useBrandRegister;
