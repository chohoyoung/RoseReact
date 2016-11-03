import React, { Component, PropTypes } from 'react';
import { render } from "react-dom";

// 주 컴포넌트이며 SearchBar와 ContactList를 랜더링한다.
class ContactsApp extends Component {
    render() {
        return(
            <div>
                <SearchBar />
                <ContactList contacts={this.props.contacts} />
            </div>
        )
    }
}

ContactsApp.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object)  //contacts속성은 objectArray를 받아야 한다.
}

class SearchBar extends Component {
    render() {
        return <input type="search" placeholder="search" />
    }
}

class ContactList extends Component {
    render() {
        return(
            <ul>
                {this.props.contacts.map(
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