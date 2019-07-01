import React, { Component } from 'react';
import PageTemplate from './PageTemplate';
import TodoInput from './TodoInput';

export interface IAppState {
    input: string
}


class App extends Component<{}, IAppState> {
    state = {
        input: ''
    }

    handleChange = (e:React.SyntheticEvent) => {
        const { value } = e.target as HTMLInputElement;
        this.setState({
            input: value
        })

    }


    render() {
        const {input} = this.state;
        const {handleChange} = this;
        return (
            <PageTemplate>
                <TodoInput onChange={handleChange} value={input} />
            </PageTemplate>
        );
    }
}

export default App;