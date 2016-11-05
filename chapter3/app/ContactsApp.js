import React, { Component, PropTypes } from 'react';
import { render } from "react-dom";
import update from "react-addons-update";

class ContactsAppContainer extends Component {
    constructor() {
        super();
        this.state = {
            contacts: []
        };
    }

    // 초기 랜더링 후 호출
    componentDidMount() {
        let ori = {
            name : 'KAKAI',
            status : {
                power : 10,
                agility : 5
            },
            item : [
                { name : 'baba sword', attackPoint : 10 },
                { name : 'baba hat', dependsPoint : 3 }
            ]
        };

        // 새로운 Ori를 만들고 복사본을 생성할 수 있다.
        let newOri1 = update(ori, { item: {$push: [{ name: 'baba consoup', hpPoint : 10 }]}});
        // index의 위치를 통해 값을 update할 수 있다.
        let newOri2 = update(ori, {
            item : {
                0: {$set : { name: "baba Hamer", attackPoint : 20 }}
            }
        });

        console.log(ori);
        console.log(newOri1);
        console.log(newOri2);

        fetch('./contacts.json')
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({contacts: responseData})
            })
            .catch((error) => {
                console.log('Fatch Error', error)
            });
    }

    render() {
        return (
            <ContactsApp contacts={this.state.contacts} />
        );
    }
}

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

render(<ContactsAppContainer />, document.getElementById("root"));