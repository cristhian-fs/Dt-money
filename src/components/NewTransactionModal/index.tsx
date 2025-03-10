import * as Dialog from '@radix-ui/react-dialog'
import { NewTransactionButton } from '../Header/styles'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'

import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from 'react';
import { TransactionsContext } from '@/contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';

const createTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome'])
})

type TCreateTransactionInputs = z.infer<typeof createTransactionFormSchema>

export function NewTransactionModal() {

  const createTransaction = useContextSelector(TransactionsContext, context => context.createTransaction)
  const [open, setOpen] = useState(false)
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {isSubmitting}
  } = useForm<TCreateTransactionInputs>({
    resolver: zodResolver(createTransactionFormSchema)
  })

  async function handleCreateNewTransaction(data: TCreateTransactionInputs){
    const { description, price, category, type } = data

    createTransaction({ description, price, category, type })
    setOpen(false)
    reset()
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <NewTransactionButton>Nova transação</NewTransactionButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Overlay />
        <Content>
          <Dialog.Title>
            Nova transação
          </Dialog.Title>

          <CloseButton>
            <X size={24} />
          </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            {...register('description')}
            type="text" 
            placeholder="Descrição" 
            required 
          />
          <input
            {...register('price', { valueAsNumber: true})}
            type="number" 
            placeholder="Preço" 
            required 
          />
          <input
            {...register('category')}
            type="text" 
            placeholder="Categoria" 
            required 
          />
          
          <Controller 
            control={control}
            name="type"
            render={({ field } ) => {
              return (
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant='income' value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>
                  <TransactionTypeButton variant='outcome' value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />
          
          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
        </Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}