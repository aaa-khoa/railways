
import React from 'react';

class NameForm extends React.Component {

  errors = []

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

  validateName(name) {
    if(!name.length){
      this.errors.push('No Name Provided!')
    }
    if(name.includes('ochocinco')){
      this.errors.push('You have a weird name!')
    }
    if(name.includes('*')){
      this.errors.push('You cannot have a star in your name!')
    }
    return this.errors.map(err => (<p>Error ==> {err}</p>))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        {this.validateName(this.state.value)}
      </form>
    );
  }
}

export default NameForm;