import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "@/contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const searchFormSchema = z.object({
  query: z.string()
})

type TSearchFormInputs = z.infer<typeof searchFormSchema>

export function SearchForm() {

  const fetchTransactions = useContextSelector(TransactionsContext, context => context.fetchTransactions)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<TSearchFormInputs>({
    resolver: zodResolver(searchFormSchema)
  })

  function handleSearchTransaction(data: TSearchFormInputs){
    fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransaction)}>
      <input {...register('query')} type="text" placeholder="Busque por transações" />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={16}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}