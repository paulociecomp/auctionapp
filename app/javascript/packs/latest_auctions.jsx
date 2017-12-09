import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../react-toolbox/theme';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';

class LatestAuctions extends React.Component{

  state = {
    batches: []
  }

  componentWillMount = () => {
    fetch("/batches", {
      method: 'get'
    })
    .then((response) =>
      response.json().then( (data) => {
        console.log(data.batches);
        this.setState({ batches: data.batches });
      })
    )
    .catch(function(err) {
      console.error(err);
    });
  }

  handleClick = (id) => {
    window.location = `/batches/${id}`;
  }

  render(){
    const list = this.state.batches.map((batch) =>
      <div key={batch.id} className="mdc-layout-grid__cell mdc-layout-grid__cell--span-3 mdc-layout-grid__cell--span-4-phone ">
        <Card key={batch.id} style={{width: '100%'}}>
          <CardMedia
            aspectRatio="wide"
            image="https://placeimg.com/800/450/nature"
          />
          <CardTitle
            title={batch.product}
          />
          <CardText>{batch.description}</CardText>
          <CardActions>
            <Button label="Detalhe" onClick={() => this.handleClick(batch.id)} />
          </CardActions>
        </Card>
      </div>
    )

    return (
      <div className="mdc-layout-grid__inner">
        {list}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <LatestAuctions />
    </ThemeProvider>,
    document.getElementById('latest-auctions')
  )
})
