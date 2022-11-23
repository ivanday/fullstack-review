import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      method: 'POST',
      data: {data: term},
      type: 'plain/text',
      error: (result, status, err) => console.log(err),
      success: () => {
        console.log('success');
        this.get();
      }
    })
  }

  get () {
    console.log('get request...');
    $.ajax({
      url: '/repos',
      method: 'GET',
      type: 'application/json',
      error: (result, status, err) => console.log(status, err),
      success: (response) => {
        this.setState({
          repos: response
        })
        console.log(response);
        console.log(this.state);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));