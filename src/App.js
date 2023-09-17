import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Rank from './Components/Rank/Rank';
import ParticlesBg from 'particles-bg';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import './App.css';
import 'tachyons';

// const Clarifai = require('clarifai');

// const app = new Clarifai.App({
//  apiKey: 'YOUR_API_KEY'
// });

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    console.log({width: width, height: height}, clarifaiFace);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
      route = 'signin';
    } else if(route === 'home') {
      this.setState({isSignedin: true});
    }
    this.setState({route: route});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }
  onDetectClick = () => {

    this.setState({imageUrl: this.state.input});
  
    

    fetch('https://smartbrain-api.azurewebsites.net/detectImage', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              imageUrl: this.state.input
            })
          })
    .then(response => response.json())
      .then(result => {
        console.log(result)
        fetch('https://smartbrain-api.azurewebsites.net/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
        this.displayFaceBox(this.calculateFaceLocation(result))
      })
      .catch(error => console.log('error', error));
      // result.outputs[0].data.regions[0].region_info.bunding_box
  }  

  render() {
    const {imageUrl, box, route, isSignedin} = this.state;
    const {name, entries} = this.state.user;
    return (
      <div className="App">
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange}/>
        {
          route === 'home'
          ? <div> 
              <Logo />
              <Rank 
                name={name}
                entries={entries}
              />
              <ImageLinkForm  
                onInputChange={this.onInputChange}
                onDetectClick={this.onDetectClick}
                />
              <FaceRecognition
                imageUrl={imageUrl}
                box={box}
              />
            </div>
          : (
            route === 'signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          )
        }
        
        <ParticlesBg type="cobweb" bg={true} />
      </div>
    );
  }
  
}

export default App;
