import React from 'react';
import { InputFind } from './PhonebookContact.styled';

export const ContactFilter = ({ filter, onChange }) => {
  return (
    <InputFind>
      <h3>Find contacts by name</h3>
      <input type="text" value={filter} onChange={onChange} />
    </InputFind>
  );
};