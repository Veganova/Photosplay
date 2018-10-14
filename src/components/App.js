import React, {Component} from 'react';
import '../styles/App.css';
import temp from '../temp.jpeg';
import axios from "axios";
import ReactDOM from "react-dom";
import keys from '../config/keys';
import Picture from './Picture';
import PictureEnlarged from "./PictureEnlarged";


class App extends Component {

  constructor() {
    super();

    this.state = {
      pictures: [],
      selected: {}
    }

    this.handleClick = this.handleClick.bind(this);

  }
  // componentDidUpdate() {
  //   document.addEventListener('mousedown', this.handleClick, false);
  // }

  handleClick(e) {
    if (this.pictureModal) {
      if (this.pictureModal.contains(e.target)) {
        return;
      }
      this.setState({selected: {}});
    }

  }

  getMockedData() {
    let mock = [];
    for (let i = 0; i < 25; i++) {
      mock.push({
        id: i,
        description: "alksdf asd f asd fasdf as dfdsfdfd  adsfasdfsd  dsf s fa sdf asd",
        urls: {
          "regular": temp
        },
        likes: 10,
        user: {
          first_name: "Bob",
          last_name: "Shmob",
          username: "BuilderofBobs",
          links: {
            html: "http://recollect.info"
          }
        }
      });
    }
    this.setState({pictures: mock});
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
    // this.getMockedData();
  }

  renderPictures() {
    let result = [];
    if (this.state.pictures.length === 0) {
      return (<div>Loading...</div>);
    }
    this.state.pictures.forEach(picture => result.push(<Picture key={picture.id} picture={picture} onSelect={(picture) => this.setState({selected: picture})}/>));
    return result;
  }

  renderSelected() {
    if (Object.keys(this.state.selected).length !== 0) {
      console.log("selected", this.state.selected);
      return (
        <div>
          <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content" ref={(modal) => {this.pictureModal = modal}}>
                <div className="modal-body">
                  <PictureEnlarged picture={this.state.selected}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <div className= {"container-fluid " +   (Object.keys(this.state.selected).length !== 0 ? "blur" : "")} >
          <div className="row header">
            <h3>Photosplay</h3>
            <hr/>
          </div>
          <div className="row">
            {this.renderPictures()}
          </div>
        </div>

        {this.renderSelected()}
      </div>
    );
  }
}

export default App;
