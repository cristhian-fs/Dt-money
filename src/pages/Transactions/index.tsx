import { Header } from "@/components/Header"
import { Summary } from "@/components/Summary"
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles"
import { SearchForm } from "./components/SearchForm"
import { useContext } from "react"
import { TransactionsContext, type Transactions } from "@/contexts/TransactionsContext"



export function Transactions(){

  const { transactions } = useContext(TransactionsContext)

  return (
    <>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => (
               <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                <td>
                  <PriceHighlight variant={transaction.type}>{transaction.price}</PriceHighlight>
                </td>
                <td>{transaction.category}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </>
  )
}