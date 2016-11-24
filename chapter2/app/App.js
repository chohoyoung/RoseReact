import React from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard';

let cardsList = [
    {
        id : 1,
        title : "Read the Book",
        description : "I should",
        color: "#BD8D31",
        status: "in-progress",
        tasks: []
    },
    {
        id : 2,
        title : "Write some code",
        description : "Code along with the samples in the book",
        color: "#3A7E28",
        status: "todo",
        tasks: [
            {
                id: 1,
                name : "ContactList Example",
                done : true
            },
            {
                id: 2,
                name : "BackStreet bodys",
                done : false
            },
            {
                id: 3,
                name : "My own experiments",
                done : false
            }
        ]
    }
];

//render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));
       
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            searchTerm: "React"  
        };
    }

    handleChange(event) {
        this.setState({searchTerm: event.target.value.substr(0, 10)});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log("submit values are : ", event.target.x.value, event.target.y.value);
    }
    
    // refs를 통해서 ref속성을 가진 객체의 DOM을 구할 수 있다.
    handleClick(event) {
        this.refs.ypointinput.focus();
    }
       
    render() {
        let eStyle = true;
        let eSpan = 'ko1';
        let bFlag = true;

        let classNamed = "";
        if(bFlag) { classNamed = "Min" }

        return(
            <form onSubmit={this.handleSubmit}>
                <div className={classNamed}>Cgoo</div>
                <div className={eStyle? "test" : ""}>Hgoo</div>
                <div>
                    {eSpan === 'ko'? <span>ko</span> : <span>no</span>}
                </div>
                <div className="formGroup">
                    xPoint : <input name="x" type="text" />
                </div>
                <div className="formGroup">
                    xPoint : <input name="y" type="text" ref="ypointinput"/>
                </div>
                <button type="submit">Submit</button>
                <input type="button" value="Move focus y" onClick={this.handleClick.bind(this)} />
                <div>
                    Search Term: <input type="search" value={this.state.searchTerm} onChange={this.handleChange.bind(this)} />
                    <textarea value="You raise me up"></textarea>
                    <select value="B">
                        <option value="A">You</option>
                        <option value="B">Raise</option>
                        <option value="C">me up</option>
                    </select>
                </div>
            </form>
        )
    }
}

render(<Search />, document.getElementById('root'));
    
       
