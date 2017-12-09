import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../react-toolbox/theme';
import Input from 'react-toolbox/lib/input/Input';
import Button from 'react-toolbox/lib/button/Button';

class FormBatch extends React.Component{
  state = {
    description: '',
    product: '',
    initial_bid: '',
    finish_bid: ''
  }

  formatReal( int ){
    var tmp = int+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
    if( tmp.length > 6 )
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
  }

  getMoney( str ){
    return parseInt( str.replace(/[\D]+/g,'') );
  }

  handleChange = (name, value) => {

    if (name === 'initial_bid' || name === 'finish_bid'){
      if(value === ""){
        value = "0";
      }
      const number = this.getMoney(value);
      value = this.formatReal(number);
    }

    this.setState({...this.state, [name]: value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const formData = new FormData(document.querySelector('form'));

    fetch("/batches", {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token
      },
      body: formData,
      credentials: 'same-origin'
    })
    .then((response) => {
      response.json().then((data) => {
        window.location = '/';
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render(){
    return(
      <div className="mdc-layout-grid__inner" style={{textAlign: 'center'}}>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-4-phone ">
          <h1 className="mdc-typography--display3">Novo lote</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              type='text'
              label='Descrição'
              name='batch[description]'
              value={this.state.description}
              onChange={this.handleChange.bind(this, 'description')}
              required={true}
              className="input-dark"
            />

            <Input
              type='text'
              label='Produto'
              name='batch[product]'
              value={this.state.product}
              onChange={this.handleChange.bind(this, 'product')}
              required={true}
              className="input-dark"
            />

            <Input
              type='text'
              label='Lance Inicial'
              name='batch[initial_bid]'
              value={this.state.initial_bid}
              onChange={this.handleChange.bind(this, 'initial_bid')}
              required={true}
              className="input-dark"
            />

            <Input
              type='text'
              label='Valor do Arremate'
              name='batch[finish_bid]'
              value={this.state.finish_bid}
              onChange={this.handleChange.bind(this, 'finish_bid')}
              required={true}
              className="input-dark"
            />

            <Button type="submit" label='Enviar' raised primary />
          </form>
        </div>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <FormBatch />
    </ThemeProvider>,
    document.getElementById('batch-form')
  )
})
