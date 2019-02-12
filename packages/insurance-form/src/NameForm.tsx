
import React from 'react';
import { CumulativeFailure, CumulativeSuccess, ValidationErrors} from 'railways'
import { validateWeirdness, validateSpecialCharacters, validateLength } from './validateName';

type NameFormState = {
  value: string
}
  
export class NameForm extends React.Component<{}, NameFormState> {

  constructor(props) {
    super(props)
    this.state = {
      value: 'ch*d ochocinco'
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  errors() {
    return validateWeirdness(this.state.value)
            .map(validateSpecialCharacters)
            .map(validateLength) 
            .fold(
              (value) => (<p>{ value } does not have any errors </p>), 
              (errors) =>  errors.map(err => (<p>Error ==> {err}</p>))
            )
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        {this.errors()}
      </form>
    );
  }
}
