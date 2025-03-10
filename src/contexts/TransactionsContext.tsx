import { api } from "@/lib/axios";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";

export interface Transactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TCreateTransactionInputs {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionsContextType {
  transactions: Transactions[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: TCreateTransactionInputs) => Promise<void>;
}

interface TransactionsProviderProps{
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);


export function TransactionProvider({children}: TransactionsProviderProps){
   const [transactions, setTransactions] = useState<Transactions[]>([])
  
   const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get('transactions', {
      params: {
        q: query,
      }
    })

    setTransactions(response.data)
  }, [])

    const createTransaction = useCallback(async(data: TCreateTransactionInputs) => {
      const { description, price, category, type } = data

      const response = await api.post('/transactions', {
        description, 
        price, 
        category, 
        type,
        createdAt: new Date()
      })

      setTransactions(prev => [response.data, ...prev])
    },[])
  
    useEffect(() => {
      fetchTransactions()
    }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{transactions, fetchTransactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  )
}