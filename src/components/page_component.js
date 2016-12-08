import React from 'react';
import Search from './search_bar';
import Display from './grid_component';

const API_KEY = 'f25c55f8c679c3ef2917c093f6f75a83';
const imageJSONreq = new XMLHttpRequest();


var searchValue = "";
var imagesValue = "";
var displayMessageValue = "";

/*----------- Page Content Component -----------*/

var Content = React.createClass({
  getInitialState: () => {
    return{
      searchText: searchValue,
      images: imagesValue,
      displayMessage: displayMessageValue

    };
  },
  componentWillMount: function(){
    this.updateSearchTerm();
  },
  updateSearchTerm: function(event){
    var searchQuery;
    if(event !== undefined) {
      searchQuery = event.target.value.trim();
      this.setState({searchText: event.target.value});
    }
    else {
      searchQuery = this.state.searchText.trim();
    }

    const encodedQuery = encodeURIComponent(searchQuery);

    const requestString = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${encodedQuery}&format=json&nojsoncallback=1`;

    var thisComponent = this;
    imageJSONreq.onreadystatechange = function() {
      thisComponent.updateImages(imageJSONreq.readyState, imageJSONreq.status, imageJSONreq.responseText);
    };

    imageJSONreq.open("GET", requestString, true);
    //console.log(requestString);
    imageJSONreq.send();
    this.updateStores(this.state.searchText);

  },
  updateStores: function(search) {
    window.searchValue = search;
    window.imagesValue = this.state.images;
    window.displayMessageValue = this.state.displayMessage;
  },
  updateImages: function(readyState, status, responseText){
    //console.log("images updated!");
    if(readyState == 4){
      if(status == 200) {
        if(responseText.substr(0, 13) === '{"stat":"fail"') {
          this.setState({images: ""});
          this.setState({displayMessage: "Search failed."});
        }
        else {
          this.setState({images: responseText});
          this.setState({displayMessage: ""});
        }
      }
      else {
        this.setState({displayMessage: "No images matching your search criteria were found."});
        this.setState({images: ""});
      }
    }
    else {
      this.setState({displayMessage: "Searching..."});
      this.setState({images: ""});
    }
    this.render();
  },

  render: function(){
     //console.log("App render update.");
    return (
      <div >

        <header>
          <h1>Flickr API Search with React</h1>
          <Search textValue={this.state.searchText} searchTextUpdateHandler={this.updateSearchTerm} />
        </header>
        <section>
          <Display showPlaceHolder={this.state.searchText.length === 0} imagesJSON={this.state.images} displayMessage={this.state.displayMessage} />
        </section>
        <footer>
          <a href="https://www.flickr.com/" target="_blank">
            <img className="flickrLogo" src="../images/flickrLogo.png" />
          </a>
        </footer>
      </div>
    );
  }
});

export default Content;
