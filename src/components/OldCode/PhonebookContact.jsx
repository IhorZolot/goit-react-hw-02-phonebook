import React from 'react';
import { nanoid } from 'nanoid';

import {
  Container,
  InputForm,
  Button,
  InputName,
  InputNamber,
  InputFind,
} from '../Phonebook/PhonebookContact.styled';

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  filter: '',
  name: '',
  number: '',
};

export class PhonebookContact extends React.Component {
  state = INITIAL_STATE;

  handleSubmit = event => {
    event.preventDefault();
    this.setState({name: '',
    number: '',});

    const newContact = {
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    if (value.includes('!')) {
      alert('Invalid word');
    }
    this.setState({ [name]: value });
  };

  handleChangeSearchValue = event => {
    const { value } = event.target;
    this.setState({ filter: value });
  };

  getFilteredData = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };



  render() {
    const { name, contacts, number, filter } = this.state;
    const filteredContacts = this.getFilteredData();

    return (
      <Container>
        <h1>Phonebook</h1>
        <InputForm onSubmit={this.handleSubmit}>
          <InputName>
            Name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={this.handleChangeInput}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </InputName>
          <InputNamber>
            Namber:
            <input
              type="tel"
              name="number"
              value={number}
              onChange={this.handleChangeInput}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </InputNamber>
          <Button type="submit">Add Contact</Button>
        </InputForm>
        <h1>Contact</h1>

        <InputFind>
          Find contacts by name
          <input
            type="text"
            value={filter}
            onChange={this.handleChangeSearchValue}
          />
        </InputFind>
        <ul>
          {filteredContacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.number}
            </li>
          ))}
        </ul>
      </Container>
    );
  }
}
