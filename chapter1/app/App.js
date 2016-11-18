import React from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard';

let cardsList = [
    {
        id : 1,
        title : "Read the Book",
        description : "I should",
        status: "in-progress",
        tasks: []
    },
    {
        id : 2,
        title : "Write some code",
        description : "Code along with the samples in the book",
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

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));