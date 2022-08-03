import React, { Component } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.css';

import Header from './components/Header';
import Compose from './components/Compose';
import Home from './components/Home';
import Footer from './components/Footer';
import About from './components/About';

import './App.css';

const api = axios.create({
  baseURL: 'https://merndailyblog.herokuapp.com/'
});

class App extends Component {
  state = {
    title: '',
    content: '',
    posts: [],
    activeTab: 'home',
  }

  componentDidMount = () => {
    this.getBlogPost();
    if (window.location.hash === '#compose') {
        this.setState({ activeTab: 'compose'});
    } else if (window.location.hash === '#about') {
        this.setState({ activeTab: 'about'})
    }
  }

  getBlogPost = () => {
    api.get('/api')
      .then((res) => {
        const data = res.data;
        this.setState({ posts: data });
        console.log("Data is retrieved!");
      })
      .catch(() => {
        console.log("Data can't be retrieved!");
      });
  }

  handleTabClick = (event, tabName) => {
    if (tabName === 'home') this.getBlogPost();
    
    this.setState({ activeTab: tabName });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  submit = (event) => {
    this.setState({ activeTab: 'home' });
    event.preventDefault();

    const input = {
      title: this.state.title,
      content: this.state.content
    }

    api({
      url: '/api/save',
      method: 'POST',
      data: input
    })
      .then(() => {
        console.log('Data has been sent to the server.');
        this.resetUserInput();
        this.getBlogPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });
  }

  resetUserInput = () => {
    this.setState({
      title: "",
      content: ""
    });
  }

  readMoreClicked = () => {
    this.setState({ isReadMoreClicked: true });
  }

  render() {
    return (
      <div className="app">
          <Header
            tabClickHandler={this.handleTabClick}
          />
          <Compose
            activeTab={this.state.activeTab}
            submit={this.submit}
            title={this.state.title}
            content={this.state.content}
            handleChange={this.handleChange}
          />
          <Home
            activeTab={this.state.activeTab}
            posts={this.state.posts}
          />
          <About 
            activeTab={this.state.activeTab}
          />
          <Footer />
      </div>
    );
  }
}

export default App;