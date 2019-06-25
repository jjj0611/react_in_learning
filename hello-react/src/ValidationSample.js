import React, {Component} from 'react';
import "./ValidationSample.css";

class ValidationSample extends Component {
    state = {
        password: '',
        clicked: false,
        validated: false
    }

    handleKeyPress = (e) => {
        if(e.key === 'Enter') {
            this.button.click();
        }
    }

    handleChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    handleButtonClick = () => {
        this.setState({
            clicked: true,
            validated: this.state.password === '0000'
        });
        this.input.focus();
    }

    render() {
        return (
            <div>
                <input
                    ref={(ref) => this.input = ref}
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    className={this.state.clicked ? (this.state.validated ? 'success' : 'failure') : ''}
                    />
                    <button onClick={this.handleButtonClick} ref={(ref) => this.button = ref}>검증하기</button>
            </div>
        )
    }

}

export default ValidationSample;