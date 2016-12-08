import React, { Component } from 'react';

const PlaceHolderImage = (props) => {
    return(
      <div>
        <img src="images/placeholder.gif" className="placeHolderImage img-responsive"></img>
      </div>
    );
};

// TODO: Move to individual component
class Display extends Component {
  render(){
    return(
      <div>{this.props.showPlaceHolder? <PlaceHolderImage /> : <ImagesGrid imagesJSON={this.props.imagesJSON} displayMessage={this.props.displayMessage} />}</div>
    );
  }
};

class ImagesGrid extends Component {

  // TODO: Redo with map(), ie. this.props.data.displayContent.map(function() {
  // https://facebook.github.io/react/docs/lists-and-keys.html#keys

  render(){
    var displayContent;
    if(this.props.displayMessage === "" && JSON.parse(this.props.imagesJSON)["photos"] !== undefined) {
      var parsedJSON = JSON.parse(this.props.imagesJSON);
      displayContent = [];
      for(var i = 0; i < 12; i++) {
        if(parsedJSON["photos"]["photo"][i] !== undefined) {
          //https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
          displayContent[i] = <a target="_blank" href={"https://farm" +
            parsedJSON["photos"]["photo"][i]["farm"] + ".staticflickr.com/" + parsedJSON["photos"]["photo"][i]["server"] +
              "/" + parsedJSON["photos"]["photo"][i]["id"] + "_" + parsedJSON["photos"]["photo"][i]["secret"] +".jpg"}>
            <img className="imghover img-responsive" src={"https://farm" + parsedJSON["photos"]["photo"][i]["farm"]
              + ".staticflickr.com/" + parsedJSON["photos"]["photo"][i]["server"] + "/"
                + parsedJSON["photos"]["photo"][i]["id"] + "_"
                  + parsedJSON["photos"]["photo"][i]["secret"] + ".jpg"}></img>
            </a>;

        }
        else {
          break;
        }
      }
    }
    else {
      displayContent = this.props.displayMessage;
    }
    return(
      <div className={displayContent !== this.props.displayMessage? "imagesGrid" : "displayMessage"}>{displayContent}</div>
    );
  }
};

export default Display;
