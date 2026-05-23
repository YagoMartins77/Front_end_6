import { useState } from 'react';

export default function Contato() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let novosErros = {};
    let valido = true;

    if (!nome.trim()) {
      novosErros.nome = "Por favor, preencha o seu nome.";
      valido = false;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      novosErros.email = "O campo e-mail é obrigatório.";
      valido = false;
    } else if (!regexEmail.test(email)) {
      novosErros.email = "Digite um e-mail válido.";
      valido = false;
    }

    if (!mensagem.trim()) {
      novosErros.mensagem = "Por favor, escreva uma mensagem.";
      valido = false;
    } else if (mensagem.length < 10) {
      novosErros.mensagem = "Sua mensagem precisa ter pelo menos 10 caracteres.";
      valido = false;
    }

    setErros(novosErros);

    if (valido) {
      alert("Mensagem enviada com sucesso!");
      setNome('');
      setEmail('');
      setMensagem('');
      setErros({});
    }
  };

  return (
    <section id="contato" className="secao-contato">
      <h2>📞 Fale Conosco</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grupo-form">
          <label htmlFor="nome">Nome:</label>
          <input 
            type="text" 
            id="nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            className={erros.nome ? "input-erro" : ""}
          />
          <span className="erro-msg">{erros.nome}</span>
        </div>
        
        <div className="grupo-form">
          <label htmlFor="email">E-mail:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className={erros.email ? "input-erro" : ""}
          />
          <span className="erro-msg">{erros.email}</span>
        </div>
        
        <div className="grupo-form">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea 
            id="mensagem" 
            rows="4" 
            value={mensagem} 
            onChange={(e) => setMensagem(e.target.value)}
            className={erros.mensagem ? "input-erro" : ""}
          ></textarea>
          <span className="erro-msg">{erros.mensagem}</span>
        </div>
        
        <button type="submit" className="btn-enviar">Enviar Mensagem</button>
      </form>
    </section>
  );
}