import React, { Component } from 'react';
import ShowRide from '../ShowRide';
import Modal from '../Modal';

class UserRideList extends Component {
  constructor() {
    super();
    this.state = {
      rides: [],
      modalClass: 'closed',
      ride: -1
    }
  }
  componentDidMount() {
    this.getRides().catch((err) => {
      console.log(err);
    })
  }
  getRides = async () => {
    try {
      const ridesJSON = await fetch('http://localhost:9292/rides', {
        credentials: 'include'
        // body: JSON.stringify({
        //   username: username,
        //   password: password
        // })
      });

      const rides = await ridesJSON.json();

      this.setState({rides: rides.retrieved_rides});
    }
    catch (err) {
      console.log(err);
    }
  }
  rideShow = (e) => {
    this.setState({modalClass: 'open', ride: e.currentTarget.id})
  }
  rideHide = () => {
    this.setState({modalClass: 'closed', ride: -1})
  }
  render() {

    const rides = this.state.rides.map((ride) => {
      return (
        <li key={ride.id} id={ride.id} onClick={this.rideShow}>
          <ShowRide userId={this.props.userId} fields={['name','pickup','destination','pickup_time','driver','delete']} rideId={ride.id} close={this.getRides}/> 
        </li>
      );
    })

    const showComp = <ShowRide userId={this.props.userId} rideId={this.state.ride} close={this.rideHide} />

    return (

      <div>
        <ul>{rides}</ul>
        <Modal comp={showComp} cssClass={this.state.modalClass}/>
      </div>
    );
  }
}

export default UserRideList;
