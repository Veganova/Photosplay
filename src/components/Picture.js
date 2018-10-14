import React, {Component} from 'react';
import '../styles/Picture.css';
import ReactFitText from 'react-fittext';

class Picture extends Component {


  render() {
    return (
      <div className="col-lg-2 col-sm-4 col-12">
        <div className="picture-container">
          <img className="img-fluid picture" src={this.props.picture.urls.regular}/>
          <div className="container user-container">
            <div className="row">
              <div className="col-4"></div>
              <div className="col-8 user">
                <ReactFitText compressor={0.6} minFontSize={10}>
                <a href={this.props.picture.user.links.html}>@{this.props.picture.user.username}</a>
                </ReactFitText>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Picture;