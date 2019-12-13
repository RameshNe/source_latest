import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import logo from "./hinjewadi.jpg";
import w_logo from "./hinjewadi-wipro.jpg";

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: this.props.isLoading,
      locations: this.props.locations,
      isloadingDone: this.props.isloadingDone,
      locationValue: this.props.locationValue
    };
  }
  handleChange(event) {
    this.setState({ locationValue: event.target.value });
    //this.props.locationValue(this.state.locationValue);
  }

  async loadLocations() {
    const response = await fetch("/api/locations");
    const body = await response.json();
    this.setState({ locations: body, isLoading: true });
    //this.props.isLoading(this.state.isLoading);
  }

  render() {
    return (
      <div>
        <div>
          <header className="App-header" style={{ marginBottom: 20 }}>
            <h2>Map</h2>
            {this.state.isLoading && !this.state.isloadingDone && (
              <span>Loading...</span>
            )}
            {!this.state.isLoading && !this.state.isloadingDone && (
              <img src={logo} className="App-logo" alt="logo" />
            )}
            {!this.state.isLoading && this.state.isloadingDone && (
              <img src={w_logo} className="App-logo" alt="logo" />
            )}
          </header>
        </div>
        <div className="container" style={{ marginBottom: 20 }}>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <h3>Location List</h3>
              <div>
                <select
                  onChange={this.handleChange.bind(this)}
                  style={{ width: `220px` }}
                  onFocus={() => this.loadLocations()}
                >
                  {Object.entries(this.state.locations).map(location => {
                    return (
                      <option key={location} value={JSON.stringify(location)}>
                        {JSON.stringify(location)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Location;
