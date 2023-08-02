import React from 'react';
import { InputForm, InputName, InputNamber, Button } from './PhonebookContact.styled';

export const ContactForm = ({ name, number, onChangeInput, onSubmit }) => {
  return (
    <InputForm onSubmit={onSubmit}>
      <InputName>
        <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={onChangeInput}
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
      </InputName>
      <InputNamber>
        <label>Number:</label>
        <input
          type="tel"
          id="number"
          name="number"
          value={number}
          onChange={onChangeInput}
          placeholder="Enter number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </InputNamber>
      <Button type="submit">Add Contact</Button>
    </InputForm>
  );
};
