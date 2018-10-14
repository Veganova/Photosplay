import React, {Component} from 'react';
import '../styles/Picture.css';

class Picture extends Component {

  render() {
    // Picture is in small mode - can be selected
    if (this.props.onSelect) {
      return (
        <div className="col-lg-2 col-sm-4 col-12">
          <div className="picture-container" onClick={() => {this.props.onSelect(this.props.picture)}}>
            <img className="img-fluid picture" src={this.props.picture.urls.regular}/>
            <div className="user">
              <a href={this.props.picture.user.links.html}>@{this.getUsername()}</a>
            </div>
          </div>
        </div>
      )
    }

  }

  getUsername() {
    let username = this.props.picture.user.username;
    const maxLength = 20;
    if (username.length > maxLength) {
      return username.substring(0, maxLength) + "...";
    }
    return username;
  }
}

export default Picture;