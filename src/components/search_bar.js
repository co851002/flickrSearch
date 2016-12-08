import React, { Component } from 'react';

/*----------- Search Bar Component -----------*/
class SearchBar extends Component {

  constructor(props){
    super(props);
  }

  // TODO: Debounce search input with lodash
  render(){
    return (
      <input type="search" className="search-bar" placeholder="Search the Flickr API..." onChange={this.props.searchTextUpdateHandler} value={this.props.textValue}></input>
    );
  }

};

export default SearchBar;
