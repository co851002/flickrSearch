
import _ from 'lodash';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import Content from './components/page_component';
const API_KEY = 'f25c55f8c679c3ef2917c093f6f75a83';
const imagesJSONRequest = new XMLHttpRequest();

/**
Flickr
Key: f25c55f8c679c3ef2917c093f6f75a83
Secret: 47057c2fd82d0264
**/

// Stylesheet
import '../styles/main.scss';

var searchValue = "";
var imagesValue = "";
var displayMessageValue = "";

/*----------- App Component -----------*/
var App = React.createClass({
  render: function(){
    return(
      <Content />
    );
  }
});

ReactDom.render(<App/>, document.querySelector('#container'));
