import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { findTramite } from '../../services/tramiteWorkspace';

const quickQuestions = [
  {
    id: 'status',
    label: 'Que significa el estado actual?',
    answer: (tramite) => tramite
      ? `La solicitud ${tramite.id} figura como "${tramite.status}". ${tramite.observations || 'No registra observaciones adicionales.'}`
      : 'Selecciona un tramite desde Mis Solicitudes para consultar su estado actual.',
  },
  {
    id: 'documents',
    label: 'Que documentos tengo asociados?',
    answer: (tramite) => {
      if (!tramite) return 'Abre la ayuda desde el detalle de una solicitud para consultar sus documentos.';
      if (!tramite.documents?.length) return `La solicitud ${tramite.id} no tiene documentos asociados.`;
      return `La solicitud ${tramite.id} tiene ${tramite.documents.length} documento(s): ${tramite.documents.map((doc) => `${doc.name} (${doc.status})`).join(', ')}.`;
    },
  },
  {
    id: 'observations',
    label: 'Como respondo una observacion?',
    answer: (tramite) => {
      const context = tramite ? `Para ${tramite.id}, la observacion vigente es: ${tramite.observations || 'sin detalle adicional'}. ` : '';
      return `${context}Ingresa a Redaccion de Tramites y Documentos, adjunta el archivo corregido y envia nuevamente la solicitud.`;
    },
  },
  {
    id: 'deadline',
    label: 'Cuanto demora la revision?',
    answer: (tramite) => {
      const progress = tramite?.progress || 20;
      return `El plazo depende del tipo de tramite y de las observaciones pendientes. Como referencia demo, el expediente se encuentra en ${progress}% de avance y la proxima actualizacion se estima dentro de 5 dias habiles.`;
    },
  },
  {
    id: 'download',
    label: 'Donde descargo mis documentos?',
    answer: (tramite) => tramite
      ? `En el detalle de ${tramite.id} puedes descargar el resumen del expediente, cada documento demo y el certificado cuando el tramite este aprobado.`
      : 'Entra a Mis Solicitudes, selecciona Ver Detalles y usa los botones de descarga del expediente.',
  },
];

function buildInitialMessages(tramite) {
  return [
    {
      id: 'welcome',
      from: 'Asistente DOM',
      time: 'Ahora',
      text: tramite
        ? `Hola. Estoy revisando el contexto de ${tramite.id}: ${tramite.title}. Puedes usar una pregunta rapida o escribir tu consulta.`
        : 'Hola. Puedo ayudarte con estados, documentos, observaciones, plazos y descargas de tus solicitudes.',
    },
  ];
}

export default function ChatPanel() {
  const [searchParams] = useSearchParams();
  const tramiteId = searchParams.get('tramite');
  const tramite = tramiteId ? findTramite(tramiteId) : null;
  const [messages, setMessages] = useState(() => buildInitialMessages(tramite));
  const [draft, setDraft] = useState('');

  const contextLabel = useMemo(
    () => tramite ? `${tramite.id} - ${tramite.title}` : 'Consulta general',
    [tramite],
  );

  function appendExchange(question, answer) {
    const timestamp = Date.now();
    setMessages((current) => [
      ...current,
      { id: `user-${timestamp}`, from: 'Tu', time: 'Ahora', mine: true, text: question },
      { id: `dom-${timestamp}`, from: 'Asistente DOM', time: 'Ahora', text: answer },
    ]);
  }

  function askQuickQuestion(question) {
    appendExchange(question.label, question.answer(tramite));
  }

  function submitQuestion(event) {
    event.preventDefault();
    const question = draft.trim();

    if (!question) return;

    appendExchange(
      question,
      tramite
        ? `Registre tu consulta para la solicitud ${tramite.id}. En esta demo, te recomendamos revisar el detalle del expediente o utilizar una de las preguntas rapidas para obtener una respuesta especifica.`
        : 'Registre tu consulta. Para una respuesta asociada a un expediente, abre Ayuda DOM desde el detalle de una solicitud.',
    );
    setDraft('');
  }

  return (
    <main className="help-layout">
      <section className="help-context">
        <div>
          <span>Contexto de atencion</span>
          <h1>Ayuda DOM</h1>
          <p>{contextLabel}</p>
        </div>
        <Link className="text-link" to={tramite ? `/mis-solicitudes/${encodeURIComponent(tramite.id)}` : paths.requests}>
          {tramite ? 'Volver al detalle' : 'Ver Mis Solicitudes'}
        </Link>
      </section>

      <div className="help-grid">
        <aside className="quick-questions">
          <h2>Preguntas frecuentes</h2>
          <p>Selecciona una pregunta para obtener una respuesta demo inmediata.</p>
          <div>
            {quickQuestions.map((question) => (
              <button key={question.id} type="button" onClick={() => askQuickQuestion(question)}>
                {question.label}
              </button>
            ))}
          </div>
        </aside>

        <section className="chat-card">
          <header className="chat-header">
            <h2>Orientacion sobre tramites</h2>
            <p>Las respuestas son demostrativas y no reemplazan una resolucion oficial DOM.</p>
          </header>
          <div className="chat-messages" aria-live="polite">
            {messages.map((message) => (
              <article className={`message ${message.mine ? 'mine' : ''}`} key={message.id}>
                <div className="message-meta">{message.from} - {message.time}</div>
                <div className="bubble">{message.text}</div>
              </article>
            ))}
          </div>
          <form className="chat-input" onSubmit={submitQuestion}>
            <textarea
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Escribe una consulta breve..."
            />
            <button type="submit">Enviar</button>
          </form>
        </section>
      </div>
    </main>
  );
}
