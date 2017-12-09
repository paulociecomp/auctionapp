import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../react-toolbox/theme';

const list = [
  {
    description: "Leilao"

  }
];

class LatestAuctions extends React.Component{
  render(){
    return (
      <h1>{"LISTAGEM"}</h1>
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
