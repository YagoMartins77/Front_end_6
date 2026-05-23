export default function Carrinho({ carrinho, removerItem, abrirModal }) {
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);

  return (
    <section id="carrinho" className="secao-carrinho">
      <h2>🛒 Seu Carrinho</h2>
      <ul id="lista-carrinho">
        {carrinho.length === 0 ? <p>Seu carrinho está vazio.</p> : null}
        
        {carrinho.map((item, index) => (
          <li key={index} className="item-carrinho">
            <span>{item.sabor} — R$ {item.preco.toFixed(2)}</span>
            <button className="btn-remover" onClick={() => removerItem(index)}>Remover</button>
          </li>
        ))}
      </ul>
      <div id="total">Total: R$ {total.toFixed(2)}</div>
      
      {carrinho.length > 0 && (
        <button className="btn-finalizar" onClick={abrirModal}>
          Finalizar Pedido
        </button>
      )}
    </section>
  );
}