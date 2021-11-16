import React, { Component } from "react";
import styles from "./ContactForm.css";

function ContactForm({
  handleChange,
  handleAddContact,
}) {
  return (
    <div className="input__area">
      <p>Name</p>
      <input
        onChange={handleChange}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
        required
      />
      <p>Phone</p>
      <input
        type="tel"
        name="tel"
        onChange={handleChange}
      />

      <button
        type="button"
        className="input__btn"
        onClick={handleAddContact}
      >
        Add contact
      </button>
    </div>
  );
}

export default ContactForm;
