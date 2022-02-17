import ContactItem from "./ContactItem";
import "./ContactsList.css";

const ContactsList = ({
  onlineUsers,
  offlineUsers,
  onContactSelect,
  selectedContact,
}) => {
  return (
    <div className="ContactsList">
      <ul className="contact-list">
        <div className="contacts-header">Online</div>
        {onlineUsers.map((user, index) => {
          if (user)
            return (
              <ContactItem
                key={index}
                index={index}
                isSelected={
                  selectedContact ? selectedContact.name === user.name : false
                }
                isOnline={true}
                onContactSelect={onContactSelect}
                user={user}
              />
            );
        })}
      </ul>
      <ul className="contact-list">
        <div className="contacts-header">Offline</div>
        {offlineUsers.map((user, index) => {
          if (user.name)
            return (
              <ContactItem
                key={index}
                index={index}
                isSelected={
                  selectedContact ? selectedContact.name === user.name : false
                }
                isOnline={false}
                onContactSelect={onContactSelect}
                user={user}
              />
            );
          return null;
        })}
      </ul>
    </div>
  );
};

export default ContactsList;
