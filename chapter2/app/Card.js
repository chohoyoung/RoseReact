import React, {Component} from "react";
import CheckList from "./CheckList.js";

class Card extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            showDetails: false
        };
    }
    
    toggleDetails() {
        this.setState({showDetails: !this.state.showDetails});
    }
    
    render() {
        let cardDetails;
        
        if(this.state.showDetails) {
            cardDetails = (
                <div className="card_details">
                    {this.props.description}
                    <CheckList cardId={this.props.id} tasks={this.props.tasks} />
                </div>
            )
        }
        // inline 스타일 정의
        let sideColor = {
            position: 'absolute',
            zIndex: -1,
            top: 0,
            bottom: 0,
            left: 0,
            width: 7,
            backgroundColor: this.props.color
        };
        
        return (
            <div className="card">
                {/* 인라인 스타일 지정 */}
                <div style={sideColor} />
                <div className={this.state.showDetails? "card_title card_title-is-open" : "card_title"} onClick={this.toggleDetails.bind(this)}>{this.props.title}</div>
                {cardDetails}
            </div>
        );
    }
}
export default Card;