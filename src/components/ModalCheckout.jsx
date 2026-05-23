export default function ModalCheckout({ carrinho, isOpen, fecharModal, confirmarPedido }) {
  if (!isOpen) return null; // Se não estiver aberto, não renderiza nada no DOM

  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <div className="modal-overlay" style={{ display: 'flex' }}>
      <div className="modal">
        <h3>📋 Resumo do Pedido</h3>
        <ul className="modal-lista">
          {carrinho.map((item, index) => (
            <li key={index}>{item.sabor} — R$ {item.preco.toFixed(2)}</li>
          ))}
        </ul>
        <div className="modal-resumo-valores">
          <p><strong>Quantidade Total:</strong> {carrinho.length} itens</p>
          <p><strong>Soma Final:</strong> R$ {total.toFixed(2)}</p>
        </div>
        <div className="modal-botoes">
          <button className="btn-fechar" onClick={fecharModal}>Fechar Modal</button>
          <button className="btn-confirmar" onClick={confirmarPedido}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}