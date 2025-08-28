import api from "@/lib/apiClient";
import { useCallback, useEffect, useState } from "react";

const useTransactions = (userId: string) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const fetchTransactions = useCallback(async () => {
    try {
      const { data } = await api.get(`transactions/${userId}`);
      console.log(data);
      setTransactions(data.data);
    } catch (error) {
      console.error("Error while fetching the transactions", error);
    }
  }, [userId]);
  const deleteTransaction = async (transactionId: string) => {
    try {
      await api.delete(`/transactions/${transactionId}`);
    } catch (error) {
      console.error("Error while deleting the transaction", error);
    }
  };
  const getSummary = useCallback(async () => {
    try {
      const { data } = await api.get(`/transactions/summary/${userId}`);
      console.log(data);
      setSummary(data.data);
    } catch (error) {
      console.error("Error while fetching  the transaction summary", error);
    }
  }, [userId]);
  const loadData = useCallback(async () => {
    if (!userId) return;
    setIsLoading(true);
    try {
      // can be run in parallel
      await Promise.all([fetchTransactions(), getSummary()]);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchTransactions, getSummary]);
  const addTransactions = async (transactionData) => {
    try {
      const { data } = await api.post("/transactions", { ...transactionData });
      setTransactions((prev) => [...prev, data.data[0]]);
    } catch (error) {
      console.error("Error while fetching  the transaction summary", error);
    }
  };
  useEffect(() => {
    loadData();
  }, [userId]);
  console.log(summary);
  return {
    fetchTransactions,
    deleteTransaction,
    getSummary,
    addTransactions,
    transactions,
    isLoading,
    summary,
  };
};
export default useTransactions;
