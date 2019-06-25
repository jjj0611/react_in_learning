import React, { Component } from 'react';

class IterationSample extends Component {
    state = {
        names: ['눈사람', '얼음', '눈', '바람'],
        name: ''
    }

    handleChange = (e) => {
        this.setState({
            name: e.target.value
        });
    }

    handleInsert = () => {
        this.setState({
            names: this.state.names.concat(this.state.name),
            name: ''
        })
    }

    handleRemove = (index) => {
        const { names } = this.state;
        this.setState({
            names: [
                ...names.slice(0, index),
                ...names.slice(index+1, names.length)
            ]
        })
    }

    render() {
        const nameList = this.state.names.map( (name, index) => (<li onDoubleClick={() => this.handleRemove(index)} key={index}>{name}</li>));
        return (
            <div>
                <input
                    onChange={this.handleChange}
                    value={this.state.name} />
                <button onClick={this.handleInsert}>추가하기</button>
                <ul>
                    {nameList}
                </ul>
            </div>
        );
    }
}

export default IterationSample;