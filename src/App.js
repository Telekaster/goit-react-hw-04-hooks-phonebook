import React, { Component } from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm/ContactForm ";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    name: "",
    number: "",
  };

  componentDidMount() {
    if (localStorage.getItem("contacts") !== null) {
      this.setState({ contacts: JSON.parse(localStorage.getItem("contacts")) });
    }
  }

  handleNameChange = (evt) => {
    return this.setState({ name: evt.target.value });
  };

  handlePhoneChange = (evt) => {
    return this.setState({ number: evt.target.value });
  };

  handleAddContact = (evt) => {
    if (
      this.state.contacts.find((contact) => {
        return contact.name === this.state.name;
      })
    ) {
      alert(`${this.state.name} is already in contacts`);
    } else {
      const contactsArr = this.state.contacts;
      const newContact = {
        key: shortid.generate(),
        name: this.state.name,
        number: this.state.number,
      };

      this.setState({ contacts: [...contactsArr, newContact] });

      // LocalStorage-------

      if (localStorage.getItem("contacts") === null) {
        localStorage.setItem(
          "contacts",
          JSON.stringify([...contactsArr, newContact])
        );
      } else {
        const temperaryArr = JSON.parse(localStorage.getItem("contacts"));
        temperaryArr.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(temperaryArr));
      }
      // --------------------
    }
  };

  filterContacts = (evt) => {
    return this.setState({ filter: evt.target.value });
  };

  deleteContact = (evt) => {
    const contactsArr = this.state.contacts;
    const id = evt.target.id;
    const elementForRemove = this.state.contacts.find(
      (item) => item.key === id
    );
    const index = contactsArr.indexOf(elementForRemove);
    contactsArr.splice(index, 1);

    // LocalStorage-------
    localStorage.removeItem("contacts");
    localStorage.setItem("contacts", JSON.stringify(contactsArr));
    // --------------------

    this.setState({ contacts: [...contactsArr] });
  };

  render() {
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          handleNameChange={this.handleNameChange}
          handlePhoneChange={this.handlePhoneChange}
          handleAddContact={this.handleAddContact}
        />

        <h2>Contacts</h2>
        <Filter filterContacts={this.filterContacts} />

        <ContactList
          contacts={this.state.contacts}
          key={this.state.contacts.key}
          state={this.state}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
