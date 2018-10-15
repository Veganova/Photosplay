import React, {Component} from 'react';
import '../styles/PictureEnlarged.css';
import keys from '../config/keys.js';

class PictureEnlarged extends Component {

  constructor() {
    super();

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  onSubmitHandler(e) {
    // e.preventDefault();
  }

  showData(key, value) {
    return (
      <div className="row">
        <div className="col-6">{key}</div>
        <div className="col-6 data-field">{value}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="picture-enlarged">
        <div className="row">
          <div className="col-6">
            User
          </div>
          <div className="col-6 data-field">
            <a href={this.props.picture.user.links.html}>@{this.props.picture.user.username}</a>
          </div>
        </div>
        {this.showData("Author", this.props.picture.user.first_name + " " + this.props.picture.user.last_name)}
        {this.showData("Description", this.props.picture.description)}
        <div className="lg-image-container">
          <img className="img-fluid" src={this.props.picture.urls.regular}/>
        </div>
        <div className="row">

          <div className="col-6" >
            <button type="button" className="btn btn-default btn-sm" style={{color:"red"}}>
              <span style={{color: "red"}} className="glyphicon glyphicon-heart"/> <span> {this.props.picture.likes} </span>
            </button>
          </div>

          <div className="col-6 data-field" >
            <button type="button" className="btn btn-default btn-sm">
              <a href={this.props.picture.links.download + "?force=true"} download rel="nofollow"> <span className="glyphicon glyphicon glyphicon-download"/></a>
            </button>
          </div>
        </div>
      </div>
    )
  }
}


export default PictureEnlarged;