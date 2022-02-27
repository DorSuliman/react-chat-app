import React from "react";
import "./ContactItem.css";

const ContactItem = ({ index, isSelected, onContactSelect, user }) => {
  return (
    <li
      key={index}
      className={
        user.isOnline
          ? isSelected
            ? "selected-online"
            : "online-list-item"
          : isSelected
          ? "selected-offline"
          : "offline-list-item"
      }
      onClick={() => !isSelected && onContactSelect(user)}
    >
      {user.name}
    </li>
  );
};

export default ContactItem;
