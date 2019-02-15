
import React from 'react';

class NameForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {value: 'john *ochocinco'};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // error handling
    this.errors.forEach(error => console.error(error))
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  validateName() {
    return this.errors().map(err => (<p style={{color: 'red', fontWeight: 'bolder'}}>Error ==> {err}</p>))
  }

  errors() {
    let errors = []
    if(!this.state.value.length){
      errors.push('No Name Provided!')
    }
    if(this.state.value.includes('ochocinco')){
      errors.push('You have a weird name!')
    }
    if(this.state.value.includes('*')){
      errors.push('You cannot have a star in your name!')
    }
    /**
     * What if i add another rule?
     */
    if(this.state.value.length > 20){
      errors.push('too long')
    }
    return errors
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" disabled={this.errors().length}/>
        {this.validateName()}
      </form>
    );
  }
}

export default NameForm;