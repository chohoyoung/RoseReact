import React, {Component, PropTypes} from 'react';
import List from './List';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <List id="todo" title="TO DO" cards={this.props.cards.filter((card) => card.status === "todo")} />
                <List id="in-progress" title="In progress" cards={this.props.cards.filter((card) => card.status === "in-progress")} />
                <List id="done" title="Done" cards={this.props.cards.filter((card) => card.status === "done")} />
            </div>
        );
    }
}

KanbanBoard.propTypes = {
    cards: PropTypes.arrayOf(PropTypes.object)
}

export default KanbanBoard;