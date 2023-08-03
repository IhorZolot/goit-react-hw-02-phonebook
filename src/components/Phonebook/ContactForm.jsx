import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { InputForm, InputName, InputNamber, Button } from './PhonebookContact.styled';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    if (value.includes('!')) {
      alert('Invalid word');
    }
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    if (this.props.checkDuplicateContact(name)) {
      alert(`Contact with name '${name}' already exists.`);
      return;
    }

    this.props.onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <InputForm onSubmit={this.handleSubmit}>
        <InputName>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handleChangeInput}
            placeholder="Enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces."
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
            onChange={this.handleChangeInput}
            placeholder="Enter number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </InputNamber>
        <Button type="submit">Add Contact</Button>
      </InputForm>
    );
  }
}


ContactForm.propTypes = {
  checkDuplicateContact: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired, 
};
