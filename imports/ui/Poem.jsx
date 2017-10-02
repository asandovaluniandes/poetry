import React, { Component} from 'react';
import PropTypes from 'prop-types';

import {Poems} from "../api/poems.js";

// Task component - represents a single
export default class Poem extends Component {

    // toggleChecked() {
    //     // Set the checked property to the opposite of its current value
    //     Poems.update(this.props.poem._id, {
    //         $set: { checked: !this.props.poem.checked },
    //     });
    // }

    increaseCounter() {

        // Set the checked property to the opposite of its current value
        Poems.update(this.props.poem._id, {
            $set: { counter: this.props.poem.counter+1 },
        });
    }

    deleteThisPoem() {
        Poems.remove(this.props.poem._id);
    }


    render() {

        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const poemClassName = this.props.poem.checked ? 'checked' : '';

        return (
            <li className={poemClassName}>
                <button className="delete" onClick={this.deleteThisPoem.bind(this)}>
                    &times;
                </button>

                <button className="like" onClick={this.increaseCounter.bind(this)}>
                    Like
                </button>

                <p>{this.props.poem.counter} </p>

                {/*<input*/}
                    {/*type="checkbox"*/}
                    {/*readOnly*/}
                    {/*checked={this.props.poem.checked}*/}
                    {/*onClick={this.toggleChecked.bind(this)}*/}
                {/*/>*/}

                <span className="text">{this.props.poem.text}</span>
            </li>
        );
    }
}

Poem.propTypes = {
    // This component gets the poem to display through a React prop.
    // We can use propTypes to indicate it is required
    poem: PropTypes.object.isRequired
};