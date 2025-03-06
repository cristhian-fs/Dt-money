import { createContext, ReactNode, useEffect, useState } from "react";

export interface Transactions {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transactions[];
}

interface TransactionsProviderProps{
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);


export function TransactionProvider({children}: TransactionsProviderProps){
   const [transactions, setTransactions] = useState<Transactions[]>([])
  
    async function loadTransactions(){
      const response = await fetch('http://localhost:3333/transactions')
      const data = await response.json()
      setTransactions(data)
    }
  
    useEffect(() => {
      loadTransactions()
    }, [])
  return (
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}