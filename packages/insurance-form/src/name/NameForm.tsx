
import React from 'react';
import { CumulativeFailure, CumulativeSuccess, ValidationError} from 'railways'
import { validateWeirdness, validateSpecialCharacters, validateLength, validateName } from './validateName';
import { nameValidationErrorMessage } from './nameValidationErrorMessage';

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
    return validateName(this.state.value)
            .fold(
              (value) => (<p>{ value } does not have any errors </p>), 
              (errors) =>  errors.map(error => 
                (<p>Error ==> {nameValidationErrorMessage(error)}</p>))
            )
  }

  disabled() {
    return validateName(this.state.value)
            .fold(()=>false, ()=>true)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" disabled={this.disabled()}/>
        {this.errors()}
      </form>
    );
  }
}
