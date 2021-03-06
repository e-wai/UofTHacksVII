import React, { Component } from 'react'
import Navbar from "./components/navbar/Navbar";
import './App.css';
import ConvoForm from './components/ConvoForm.js';
import ResultsList from './components/ResultsList.js';

const dev = false;

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      finishedSurvey: false,
      results: null,
      navbarOpen: false,
      imgSrc: '',
      q: ''
    };

    this.handleFinishedSurvey = this.handleFinishedSurvey.bind(this);
    this.handleNavbar = this.handleNavbar.bind(this);
    this.formSubmitCallback = this.formSubmitCallback.bind(this);
  }

  handleNavbar() {
    this.setState({
      navbarOpen: !this.state.navbarOpen
    });
  }

  handleFinishedSurvey () {
    this.setState ({
      finishedSurvey : true
    });
  }

  formSubmitCallback(response, ogURL, q){
    // Uncomment line below to change thing:
    this.handleFinishedSurvey();

    console.log('SUBMITTED');
    this.setState({
      results: response.data,
      imgSrc: ogURL,
      q: q
    });
  }

  render() {
    let current;
    let home;

    if (!this.state.finishedSurvey) {
      current = <ConvoForm appCallback={this.formSubmitCallback} dev={dev}/>
      home= 'home'
    } else {
      current = <Navbar
      navbarState={this.state.navbarOpen}
      handleNavbar={this.handleNavbar} />;
      home = ''
    }
    console.log(this.state.results);
    return (
      <div className={'app-container ' + home} >
        {current}
        {this.state.results && <ResultsList results={this.state.results} searchImg={this.state.imgSrc} q={this.state.q}/>}
      </div>
    );
  }
}

export default App;
