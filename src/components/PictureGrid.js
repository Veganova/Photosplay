import React, {Component} from 'react';
import '../styles/PictureGrid.css';
import temp from '../temp.jpeg';
import axios from "axios";
import ReactDOM from "react-dom";
import keys from '../config/keys';
import Picture from './Picture';
import PictureEnlarged from "./PictureEnlarged";


class PictureGrid extends Component {

  constructor() {
    super();

    this.state = {
      pictures: [],
      selected: {},
      base: [],
      search: ""
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.typingTimer = null;
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
    axios({
      method: "get",
      url: "https://api.unsplash.com/photos/random?client_id=" + keys.applicationId,
      params: {
        count: 25,
        orientation: "squarish"
      }
    }).then(pictures => {
      this.setState({pictures: pictures.data, base: pictures.data});
    }).catch(err => {
      console.log('Error happened during fetching!', err)
      alert(err);
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
      // A picture has been selected
      return (
        <div>
          <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content" ref={(modal) => {
                this.pictureModal = modal
              }}>
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

  handleSearch(e) {
    clearTimeout(this.typingTimer);
    const query = e.target.value;
    this.typingTimer = setTimeout(() => {
      // Reverts back to original random pictures if no query is present
      if (!query) {
        this.setState({pictures: this.state.base});
      } else {
        axios({
            method: "get",
            url: "https://api.unsplash.com/search/photos?client_id=" + keys.applicationId,
            params: {
              query: query,
              per_page: 20
            }
          }
        ).then(searchResults => {
          this.setState({pictures: searchResults.data.results})
        }).catch(err => {
          console.log('Error happened during searching!', err)
          alert(err);
        });
      }
    }, 1000);

    this.setState({search: e.target.value});
  }


  render() {
    return (
      <div onClick={this.handleClick}>
        <div className={"container-fluid " + (Object.keys(this.state.selected).length !== 0 ? "blur" : "")}>
          <div className="row header">
            <div className="col-12 col-sm-4">
              <h3>Photosplay</h3>
            </div>
            <div className="col-12 col-sm-8 search-container">
                <input className="search float-right" type="text" value={this.state.search} onChange={this.handleSearch} placeholder={"Search..."}/>
            </div>
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

export default PictureGrid;
