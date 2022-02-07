import "./Contacts.css";

const Contacts = ({
  username,
  onlineUsers,
  offlineUsers,
  onContactSelect,
  selectedContact,
}) => {
  return (
    <div className="Contacts">
      <div className="contacts-header">Welcome {username}!</div>
      <ul className="contact-list">
        <div className="contacts-header">Online</div>
        {onlineUsers.map((user, index) => {
          return (
            <li
              key={index}
              className={
                selectedContact === user
                  ? "selected-online"
                  : "online-list-item"
              }
              onClick={() => onContactSelect(user)}
            >
              {user.name}
            </li>
          );
        })}
      </ul>
      <ul className="contact-list">
        <div className="contacts-header">Offline</div>
        {offlineUsers.map((user, index) => {
          if (user.name)
            return (
              <li
                key={index}
                className={
                  selectedContact === user
                    ? "selected-offline"
                    : "offline-list-item"
                }
                onClick={() => onContactSelect(user)}
              >
                {user.name}
              </li>
            );
          return null;
        })}
      </ul>
    </div>
  );
};

export default Contacts;
