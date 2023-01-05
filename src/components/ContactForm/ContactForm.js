import { useState } from 'react';
import PropTypes from 'prop-types';
// import { nanoid } from 'nanoid';
import style from './ContactForm.module.css';
import initialState from './initialState';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit({ ...state });
    setState({ ...initialState });
  };

  const { name, number } = state;

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          className={style.input}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          className={style.input}
          type="text"
          name="number"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={style.btn} type="submit">
        Add contact
      </button>
    </form>
  );
};

// class ContactForm extends Component {
//   state = { name: '', number: '' };

//   handleChange = ({ target }) => {
//     this.setState({ [target.name]: target.value });
//   };

//   handleSubmit = e => {
//     e.preventDefault();

//     this.props.onSubmit({
//       id: nanoid(),
//       name: this.state.name,
//       number: this.state.number,
//     });
//   };

//   render() {
//     return (
//       <form className={style.form} onSubmit={this.handleSubmit}>
//         <label>
//           Name
//           <input
//             className={style.input}
//             type="text"
//             name="name"
//             value={this.state.name}
//             onChange={this.handleChange}
//           />
//         </label>
//         <label>
//           Number
//           <input
//             className={style.input}
//             type="text"
//             name="number"
//             value={this.state.number}
//             onChange={this.handleChange}
//           />
//         </label>
//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
