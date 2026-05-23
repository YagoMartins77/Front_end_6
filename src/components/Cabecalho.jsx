export default function Cabecalho() {
  return (
    <header className="cabecalho-principal">
      <div className="logo">
        <h2>🍕 Fatec Pizza</h2>
      </div>
      <nav className="menu">
        <ul>
          <li><a href="#inicio">Início</a></li>
          <li><a href="#cardapio">Cardápio</a></li>
          <li><a href="#contato">Contato</a></li>
        </ul>
      </nav>
    </header>
  );
}