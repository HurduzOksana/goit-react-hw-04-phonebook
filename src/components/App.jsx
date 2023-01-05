import { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { useEffect } from 'react';
import style from './App.module.css';

export function App() {
  const initialState = [
    { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
    { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
    { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
    { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(() => {
    const value = JSON.parse(localStorage.getItem('contacts'));
    return value || initialState;
  });
  const [filter, setFilter] = useState('');

  const addContact = data => {
    if (isDublicate(data)) {
      return alert(`${data.name} : ${data.number} is already in the list`);
    }

    setContacts(prevContacts => {
      const newContact = {
        ...data,
        id: nanoid(),
      };
      return [...prevContacts, newContact];
    });
  };

  const isDublicate = ({ name, number }) => {
    const result = contacts.find(
      contact => contact.name === name && contact.number === number
    );
    return Boolean(result);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const findContact = ({ target }) => {
    setFilter(target.value);
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(({ name, number }) => {
      const normalizedName = name.toLowerCase();
      const normalizedNumber = number.toLowerCase();
      const result =
        normalizedName.includes(normalizedFilter) ||
        normalizedNumber.includes(normalizedFilter);
      return result;
    });
    return filteredContacts;
  };

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const filteredContacts = getFilteredContacts();

  //   //   componentDidMount() {
  //   //     const localData = JSON.parse(localStorage.getItem('contacts'));
  //   //     if (localData && localData.length) {
  //   //       this.setState({ contacts: localData });
  //   //     }
  //   //   }

  //   //   componentDidUpdate(prevProps, prevState) {
  //   //     if (this.state.contacts !== prevState.contacts) {
  //   //       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   //     }
  //   //   }

  return (
    <div className={style['App']}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter
        value={filter}
        onChange={findContact}
        onHandleFilter={findContact}
      />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
