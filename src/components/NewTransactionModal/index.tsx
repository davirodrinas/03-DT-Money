import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleUp, X } from "phosphor-react";
import { useContext, useEffect } from "react";
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../contexts/TransactionsContext";

const newTrasactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTrasactionFormSchema>;

export function NewTransactionModal() {
    const { createTransaction } = useContext(TransactionsContext)

    const {
        control,
        register, 
        handleSubmit,
        formState: { isSubmitting},
        reset,
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTrasactionFormSchema),
        defaultValues: {
            type: 'income'
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        const { description, price, category, type} = data;
        await createTransaction({
            description,
            price,
            category,
            type,
        })

        reset();
    }

    useEffect(() => {
        fetch('http://localhost:3000/transactions').then(response => {
            console.log(response)
        })
    }, [])

    fetch('http://localhost:3000/transactions').then(response => {
        console.log(response)
    })

    return (
        <Dialog.Portal>
        <Overlay />

        <Content>
            <Dialog.Title>
                Nova transação</Dialog.Title>
            <CloseButton>
                <X size={24}/>
            </CloseButton> 

            <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                <input 
                type="text" 
                placeholder="Descrição" 
                required
                {...register('description')}
                />
                <input 
                type="number" 
                placeholder="Preço" 
                required
                {...register('price', {valueAsNumber: true})}
                />
                <input 
                type="text" 
                placeholder="Categoria" 
                required
                {...register('category')}
                />


                <Controller 
                    control={control}
                    name="type"
                    render={({ field }) => {
                        return (
                        <TransactionType onValueChange={field.onChange} value={field.value}>
                          <TransactionTypeButton variant="income" value="income">
                            <ArrowCircleUp size={24}/>
                                Enrada
                            </TransactionTypeButton>

                          <TransactionTypeButton variant="outcome" value="outcome">
                            <ArrowCircleUp size={24}/>
                                Saida
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
    )
}