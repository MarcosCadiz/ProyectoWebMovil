import { chatMessages } from '../../data/mockData';

export default function ChatPanel() {
  return (
    <main className="container-center">
      <section className="chat-card">
        <header className="chat-header">
          <h1>Historial y Mensajería: Solicitud #44831</h1>
          <p>Trámite: Regularización de Vivienda | Estado: Observado</p>
        </header>
        <div className="chat-messages">
          {chatMessages.map((message) => (
            <article className={`message ${message.mine ? 'mine' : ''}`} key={`${message.from}-${message.time}`}>
              <div className="message-meta">{message.from} • {message.time}</div>
              <div className="bubble">{message.text}</div>
            </article>
          ))}
        </div>
        <form className="chat-input">
          <textarea placeholder="Escribe un mensaje al funcionario aquí..." />
          <button type="submit">Enviar</button>
        </form>
      </section>
    </main>
  );
}
