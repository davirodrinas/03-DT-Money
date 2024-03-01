import * as Dialog from "@radix-ui/react-dialog";
import { Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleUp, X } from "phosphor-react";


export function NewTransactionModal() {
    return (
        <Dialog.Portal>
        <Overlay />

        <Content>
            <Dialog.Title>Nova transação</Dialog.Title>

            <Dialog.Close>
                <X size={24}/>
            </Dialog.Close> 

            <form action="">
                <input type="text" placeholder="Descrição" required/>
                <input type="number" placeholder="Proço" required/>
                <input type="text" placeholder="Categoria" required/>


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

                <button type="submit">
                    Cadastrar
                </button>
            </form>

            
        </Content>
    </Dialog.Portal>
    )
}