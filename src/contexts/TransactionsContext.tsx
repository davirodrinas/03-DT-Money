import { Children, ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
    id: number;
    descriotion: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[];
}

interface TransactionsProvidesProps {
    Children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ Children }: TransactionsProvidesProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    async function loadTransactions() {
        const response = await fetch('http://localhost:3333/transactions')
        const data = await response.json();
            console.log(data)
        }

    useEffect(() => {    
        loadTransactions();
    }, [])

    return (
        <TransactionsContext.Provider value={ {transactions} }>
            {Children}
        </TransactionsContext.Provider>
    )
}