import React from "react";

const ContactItem = ({ index, isSelected, isOnline, onContactSelect, user }) => {
  return (
    <li
      key={index}
      className={
        isOnline
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
