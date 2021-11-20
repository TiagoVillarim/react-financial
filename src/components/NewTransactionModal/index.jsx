import React, { useEffect } from 'react'
import Modal from 'react-modal'
import './styles'
import { Container, RadioBox, TransactionTypeContainer } from './styles'
import closeImg from '../../assets/close.svg';
import incomingImg from '../../assets/income.svg';
import outcomingImg from '../../assets/outcome.svg';
import { useTransactions } from '../../contexts/useTransactions';

export function NewTransactionModal({ isOpen, onRequestClose }) {

  const { transactions, createTransaction } = useTransactions();

  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [category, setCategory] = React.useState('');
  const [type, setType] = React.useState('deposit');

  async function handleCreateNewTransaction(event) {
    // TO DO - Implementar o envio dos dados dos formulario para cadastro na listagem
    event.preventDefault();
    const requestBody = {
      title: title,
      amount: amount,
      category: category,
      type: type,
      createdAt: new Date()
    }
    await createTransaction(requestBody);
    onRequestClose()

    setTitle('');
    setAmount(0);
    setCategory('');
    setType('deposit')
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >

      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar Transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          placeholder="Valor"
          type="number"
          value={amount}
          onChange={event => setAmount(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType('deposit')}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomingImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType('withdraw')}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomingImg} alt="Entrada" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit" disabled={title < 1 && category < 1}>Cadastrar</button>

      </Container>
    </Modal>
  );
}