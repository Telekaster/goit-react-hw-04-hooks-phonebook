import { useState } from "react";
import shortid from "shortid";
import ContactForm from "./components/ContactForm/ContactForm ";
import Filter from "./components/Filter/Filter";
import ContactList from "./components/ContactList/ContactList";

export default function App() {
  
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState();
  const [name, setName] = useState();
  const [number, setNumber] = useState();

  function handleChange(evt) {

    switch (evt.target.name) {
      case 'name':
        setName(evt.target.value);
        break;
      
      case 'tel':
        setNumber(evt.target.value);
        break;
    
      default:
        break;
    }
  };

  function handleAddContact () {
    if (
      contacts.find((contact) => {
        return contact.name === name;
      })
    ) {
      alert(`${name} is already in contacts`);
    } else {
      const contactsArr = contacts;
      const newContact = {
        key: shortid.generate(),
        name: name,
        number: number,
      };

      setContacts([...contactsArr, newContact]);

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
      };
      // -------------------
    };
  };

  function filterContacts (evt) {
    return setFilter(evt.target.value);
  };

  function deleteContact (evt) {
    const contactsArr = contacts;
    const id = evt.target.id;
    const elementForRemove = contacts.find(
      (item) => item.key === id
    );
    const index = contactsArr.indexOf(elementForRemove);
    contactsArr.splice(index, 1);

    // LocalStorage-------
    localStorage.removeItem("contacts");
    localStorage.setItem("contacts", JSON.stringify(contactsArr));
    // --------------------

    setContacts([...contactsArr]);
  };



  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm
        handleChange={handleChange}
        handleAddContact={handleAddContact}
      />

      <h2>Contacts</h2>
      <Filter
        filterContacts={filterContacts}
      />

      <ContactList
        filter={filter}
        contacts={contacts}
        key={contacts.key}
        deleteContact={deleteContact}
      />
    </div>
  
  );
};