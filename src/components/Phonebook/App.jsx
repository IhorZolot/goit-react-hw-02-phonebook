import React, { Component } from 'react';

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
};

export default class App extends Component {
  state = INITIAL_STATE;

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

  handleSubmit = newContact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };

  handleDeleteContact = id => {
    this.setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { filter } = this.state;
    const filteredContacts = this.getFilteredData();

    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          checkDuplicateContact={this.checkDuplicateContact}
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
