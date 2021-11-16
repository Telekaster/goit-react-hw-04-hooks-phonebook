import React from "react";

function Filter({ filterContacts }) {
  return (
    <div>
      <p>Find contacts by name</p>
      <input type="text" onChange={filterContacts} />
    </div>
  );
}

export default Filter;
