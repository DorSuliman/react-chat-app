import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";
import "./ContactsList.css";

const ContactsList = ({ onContactSelect }) => {
  const users = useSelector((state) => state.allUsers);
  const selectedContact = useSelector((state) => state.selectedContact);

  return (
    <div className="ContactsList">
      <ul className="contact-list">
        <div className="contacts-header">Online</div>
        {users.map((user, index) => {
          if (user.name && user.isOnline) {
            return (
              <ContactItem
                key={index}
                index={index}
                isSelected={
                  selectedContact ? selectedContact.name === user.name : false
                }
                onContactSelect={onContactSelect}
                user={user}
              />
            );
          }
        })}
      </ul>
      <ul className="contact-list">
        <div className="contacts-header">Offline</div>
        {users.map((user, index) => {
          if (user.name && !user.isOnline) {
            return (
              <ContactItem
                key={index}
                index={index}
                isSelected={
                  selectedContact ? selectedContact.name === user.name : false
                }
                onContactSelect={onContactSelect}
                user={user}
              />
            );
          }
          return null;
        })}
      </ul>
    </div>
  );
};

export default ContactsList;
