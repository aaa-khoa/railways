
import React from 'react';
import { CumulativeFailure, CumulativeSuccess, ValidationErrors} from 'railways'

type NameFormState = {
  value: string
}

export const validateWeirdness = (name) => 
  name.indexOf('ochocinco') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['weird name']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

export const validateSpecialCharacters = (name) => 
  name.indexOf('*') > -1 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['special characters']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

export const validateLength = (name) => 
  name.length > 20 
    ? new CumulativeFailure<string, ValidationErrors>(name, ['too long']) 
    : new CumulativeSuccess<string, ValidationErrors>(name)

  
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

  validateChanges() {
    const result = validateWeirdness(this.state.value)
                    .map(validateSpecialCharacters)
                    .map(validateLength) 
    return result.fold(
      (value) => (<p>{ value } does not have any errors </p>), 
      (errors) =>  {
        console.log(errors)
        return errors.map(err => (<p>Error ==> {err}</p>))
      }
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
        {this.validateChanges()}
      </form>
    );
  }
}
