//import react and component from react
import React, { Component } from 'react';
import Main from './components/Main.jsx'

const getEntries = 'http://localhost:8080/api';
const deleteEntries ='http://localhost:8080/api/delete';
const updateEntries ='http://localhost:8080/api/update';

class App extends Component {
  constructor(props) {
    super(props)
  }

componentDidMount() {
  console.log('App component mounted');
}

render () {
  return (
    <div id = {'main-div'}>
    <Main updateEntries={updateEntries} getEntries = {getEntries} deleteEntries = {deleteEntries}/>
    </div>
  );
}

}


export default App;