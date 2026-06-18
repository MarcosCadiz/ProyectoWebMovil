import { OutlineButton } from '../../components/ui/AppButton';

function HighlightedDescription({ description, highlight }) {
  if (!highlight || !description.includes(highlight)) {
    return description;
  }

  const [before, after] = description.split(highlight);

  return (
    <>
      {before}<strong>{highlight}</strong>{after}
    </>
  );
}

export default function NotificationItem({ notification }) {
  return (
    <article className={`notification-item ${notification.unread ? 'unread' : ''}`}>
      <span className={`noti-icon ${notification.iconClass}`}>{notification.icon}</span>
      <div>
        <h2>{notification.title}</h2>
        <p>
          <HighlightedDescription description={notification.description} highlight={notification.highlight} />
        </p>
        <time>{notification.time}</time>
      </div>
      <div className="notification-actions">
        <OutlineButton to={notification.to}>{notification.action}</OutlineButton>
        {notification.helpTo ? (
          <OutlineButton className="notification-help-button" to={notification.helpTo}>
            Consultar ayuda
          </OutlineButton>
        ) : null}
      </div>
    </article>
  );
}
