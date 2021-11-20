import React from 'react'
import {api} from '../services/api';

const TransactionsContext = React.createContext();

export function TransactionsProvider({ children }) {

  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    // TO DO - Implemente aqui um get para quando carregar a tela, trazer a listagem de transacoes
    getList()
  }, []);
  
  async function getList() {
      const responseApi = await api.get('/transactions');
      setTransactions(responseApi.data.transactions);
  };
  
  async function createTransaction(transactionInput) {
    // TO DO - Implemente aqui o post para salvar transacao, endpoint POST /transactions
    await api.post('/transactions', transactionInput);
    const update = await api.get('/transactions');
    setTransactions(update.data.transactions);
  };

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = React.useContext(TransactionsContext);
  return context;
}