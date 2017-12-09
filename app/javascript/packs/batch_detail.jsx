import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../react-toolbox/theme';
import Button from 'react-toolbox/lib/button/Button';
import Snackbar from 'react-toolbox/lib/snackbar/Snackbar';

class BatchDetail extends React.Component{

  state = {
    batch: {},
    snackbar: false
  }

  handleSnackbarTimeout = (event, instance) => {
    this.setState({ snackbar: false });
  };

  componentWillMount = () => {
    fetch(`/batches/${document.getElementById('batch_id').value}.json`, {
      method: 'get'
    })
    .then((response) => {
        response.json().then( (data) => {
          this.setState({ batch: data.batch });
        })
    })
    .catch((err) => {
      console.error(err);

    });
  }

  handleClick = () => {
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

    fetch(`/batches/${this.state.batch.id}/bids`, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': token
      },
      credentials: 'same-origin'
    })
    .then((response) => {
      response.json().then((data) => {
        if( response.status === 422 ){
          this.setState({ batch: data.batch, message: data.message, snackbar: true });
        }
        else{
          this.setState({ batch: data.batch });
        }

      });
    })
    .catch((error) => {
      console.erro(error);
    })
  }

  render(){
    return (
      <div className="mdc-layout-grid__inner" style={{textAlign: 'center'}}>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4 mdc-layout-grid__cell--span-4-phone ">
          <h1 className="mdc-typography--display3">{this.state.batch.product}</h1>

          <p><span className="mdc-typography--display3">R$ {this.state.batch.current_bid}</span></p>

          <p className="mdc-typography--body1">{this.state.batch.description}</p>

          <p><span className="mdc-typography--display1">{this.state.batch.status}</span></p>

          <Button label='Lance' raised primary onClick={this.handleClick} />

          <Snackbar
            active={this.state.snackbar}
            label={this.state.message}
            timeout={5000}
            onTimeout={this.handleSnackbarTimeout}
            type='warning'
          />
        </div>
        <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4"></div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <BatchDetail />
    </ThemeProvider>,
    document.getElementById('batch-detail')
  )
});
