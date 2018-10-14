import React, {Component} from 'react';
import '../styles/App.css';
import temp from '../temp.jpeg';
import axios from "axios";
import ReactDOM from "react-dom";
import keys from '../config/keys';
import Picture from './Picture';


class App extends Component {

  constructor() {
    super();

    this.state = {
      pictures: []
    }
  }

  componentDidMount() {
    // axios.get("https://api.unsplash.com/photos/random?client_id="+keys.applicationId).then(x => console.log(x));
    axios({
      method: "get",
      url: "https://api.unsplash.com/photos/random?client_id="+keys.applicationId,
      params: {
        count: 25,
        orientation: "squarish"
      }
    }).then(pictures => {
      this.setState({pictures: pictures.data});
    });

    // let mock = [];
    // for (let i = 0; i < 25; i++) {
    //   mock.push({
    //     id: i,
    //     urls: {
    //       "regular": temp
    //     }
    //   });
    // }
    // this.setState({pictures: mock});
  }

  renderPictures() {
    let result = [];
    this.state.pictures.forEach(picture => result.push(<Picture key={picture.id} picture={picture} />));
    return result;
  }

  render() {
    console.log(this.state.pictures);
    if (this.state.pictures.length > 0) {
      return (
        <div className="container-fluid">
          <div className="row header">
            <h3>Photosplay</h3>
          <hr/>
          </div>
          <div className="row">
          {this.renderPictures()}
          </div>
        </div>

      );
    } else {
      return (<div>Loading...</div>);
    }
  }
}

export default App;
