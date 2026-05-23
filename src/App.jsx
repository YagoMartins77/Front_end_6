import { useState, useEffect } from 'react';
import './App.css';
import Cabecalho from './components/Cabecalho';
import Cardapio from './components/Cardapio';
import Carrinho from './components/Carrinho';
import ModalCheckout from './components/ModalCheckout';
import Contato from './components/Contato';

function App() {
  // Inicializa o carrinho buscando do LocalStorage
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem("carrinho-fatec");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Atualiza o LocalStorage sempre que o carrinho mudar
  useEffect(() => {
    localStorage.setItem("carrinho-fatec", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarAoCarrinho = (pizza) => {
    setCarrinho([...carrinho, pizza]);
  };

  const removerItem = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(index, 1);
    setCarrinho(novoCarrinho);
  };

  const confirmarPedido = () => {
    alert("Pedido confirmado com sucesso! 🍕🔥");
    setCarrinho([]); // Limpa o carrinho
    setIsModalOpen(false); // Fecha o modal
  };

  return (
    <div>
      <Cabecalho />
      <main>
        <Cardapio adicionarAoCarrinho={adicionarAoCarrinho} />
        <Carrinho 
          carrinho={carrinho} 
          removerItem={removerItem} 
          abrirModal={() => setIsModalOpen(true)} 
        />
        <Contato />
      </main>
      
      <ModalCheckout 
        carrinho={carrinho} 
        isOpen={isModalOpen} 
        fecharModal={() => setIsModalOpen(false)}
        confirmarPedido={confirmarPedido}
      />

      <footer className="rodape-principal">
        <p>&copy; 2026 Pizzaria Fatec Pompéia. Todos os direitos reservados.</p>
        <p>Desenvolvido pelos alunos de Sistemas Inteligentes.</p>
      </footer>
    </div>
  );
}

export default App;