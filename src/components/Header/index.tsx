import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoDTMoney from '@/assets/logo.svg'

export function Header(){
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDTMoney} alt="" />
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </HeaderContent>
    </HeaderContainer>
  )
}