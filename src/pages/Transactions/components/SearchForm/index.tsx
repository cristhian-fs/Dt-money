import { MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" name="query" id="query" placeholder="Busque por transações" />
      <button type="submit">
        <MagnifyingGlass size={16}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}