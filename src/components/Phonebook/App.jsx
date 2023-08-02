import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { ContactFilter } from './ContactFilter';
import { Container } from './PhonebookContact.styled';

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

export default class App extends Component {
  state = INITIAL_STATE;

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ name: '', number: '' });

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
    if (this.checkDuplicateContact(value)) {
      alert(`Contact with name '${value}' already exists.`);
      return;
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

  checkDuplicateContact = name => {
    return this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  };

  handleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { name, number, filter } = this.state;
    const filteredContacts = this.getFilteredData();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          onChangeInput={this.handleChangeInput}
          onSubmit={this.handleSubmit}
        />
        <h2>Contacts</h2>
        <ContactFilter
          filter={filter}
          onChange={this.handleChangeSearchValue}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.handleDeleteContact}
        />
      </Container>
    );
  }
}
