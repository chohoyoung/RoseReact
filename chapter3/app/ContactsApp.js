import React, { Component, PropTypes } from 'react';
import { render } from "react-dom";

// 주 컴포넌트이며 SearchBar와 ContactList를 랜더링한다.
class ContactsApp extends Component {
    constructor() {
        super();
        this.state = {
            filterText : ""
        };
    }

    handleUserInput(searchTerm) {
        this.setState({filterText:searchTerm});
    }

    render() {
        return(
            <div>
                <SearchBar filterText={this.state.filterText} onUserInput={this.handleUserInput.bind(this)} />
                <ContactList contacts={this.props.contacts} filterText={this.state.filterText} />
            </div>
        )
    }
}

ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)  //contacts속성은 objectArray를 받아야 한다.
}

class SearchBar extends Component {
    handleChange(event) {
        this.props.onUserInput(event.target.value);
    }

    render() {
        return <input type="search" placeholder="search" value={this.props.filterText} onChange={this.handleChange.bind(this)} />
    }
}

// filterText는 문자열이면서 필수 값이다.
SearchBar.propTypes = {
    filterText : PropTypes.string.isRequired,
    onUserInput : PropTypes.func.isRequired
}

class ContactList extends Component {
    render() {
        let filteredContacts = this.props.contacts.filter(contact => contact.name.includes(this.props.filterText));

        return(
            <ul>
                {filteredContacts.map(
                    (contact) => <ContactItem key={contact.email} name={contact.name} email={contact.email} />
                )}
            </ul>
        )
    }
}

ContactList.propTypes = {
    contacts : PropTypes.arrayOf(PropTypes.object)
}

class ContactItem extends Component {
    render() {
       return <li>{this.props.name} - {this.props.email}</li>
    }
}

ContactItem.propTypes = {
    name : PropTypes.string.isRequired,
    email : PropTypes.string.isRequired
}

let contacts = [
    { name : "Vailbration", email : "vailbration@gmail.com" },
    { name : "Don'tWorry", email : "dontworry@gmail.com" },
    { name : "Mama", email : "mama@gmail.com" },
    { name : "StandByMe", email : "sbm@gmail.com" },
    { name : "Song", email : "song@gmail.com" },
    { name : "Many", email : "many@gmail.com" },
    { name : "Incredible", email : "incredible@gmail.com" }
];

render(<ContactsApp contacts={contacts}/>, document.getElementById("root"));