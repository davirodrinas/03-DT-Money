import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleUp, X } from "phosphor-react";
import { useEffect } from "react";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const newTrasactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInputs = z.infer<typeof newTrasactionFormSchema>;

export function NewTransactionModal() {
    const {
        register, 
        handleSubmit,
        formState: { isSubmitting}
    } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTrasactionFormSchema),
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
        await new Promise(resolve => setTimeout(resolve, 2000));

        console.log(data)
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


                <TransactionType>
                    <TransactionTypeButton variant="income" value="income">
                        <ArrowCircleUp size={24}/>
                            Enrada
                    </TransactionTypeButton>

                    <TransactionTypeButton variant="outcome" value="outcome">
                        <ArrowCircleUp size={24}/>
                            Saida
                    </TransactionTypeButton>
                </TransactionType>

                <button type="submit" disabled={isSubmitting}>
                    Cadastrar
                </button>
            </form>

            
        </Content>
    </Dialog.Portal>
    )
}