export default function Cardapio({ adicionarAoCarrinho }) {
  const pizzas = [
    { id: 1, sabor: "Calabresa Clássica", ingredientes: "Massa fina, molho de tomate, muita calabresa e cebola fatiada.", preco: 45.0, imagem: "/Foto pizza calabresa copy.png" },
    { id: 2, sabor: "Margherita Especial", ingredientes: "Mussarela fresca, tomate, manjericão e um fio de azeite.", preco: 50.0, imagem: "/Foto pizza Margherita.png" },
    { id: 3, sabor: "Frango com Catupiry", ingredientes: "Frango desfiado temperado coberto com autêntico Catupiry.", preco: 55.0, imagem: "/Foto pizzza frango.png" }
  ];

  return (
    <section id="cardapio" className="conteudo-principal">
      <h1 className="titulo-pagina">Nosso Cardápio</h1>
      <div className="grade-de-pizzas">
        {pizzas.map((pizza) => (
          <article key={pizza.id} className="cartao-pizza">
            <img src={pizza.imagem} alt={`Foto da Pizza de ${pizza.sabor}`} />
            <h2 className="sabor-nome">{pizza.sabor}</h2>
            <p className="sabor-ingredientes">{pizza.ingredientes}</p>
            <p className="sabor-preco">R$ {pizza.preco.toFixed(2)}</p>
            <button className="botao-pedir" onClick={() => adicionarAoCarrinho(pizza)}>
              Pedir Agora
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}