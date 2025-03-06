import { NewTransactionModal } from "../NewTransactionModal";
import { HeaderContainer, HeaderContent } from "./styles";

import logoDTMoney from '@/assets/logo.svg'

export function Header(){
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoDTMoney} alt="" />
        <NewTransactionModal />
      </HeaderContent>
    </HeaderContainer>
  )
}