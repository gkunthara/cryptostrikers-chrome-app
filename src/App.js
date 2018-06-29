/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import arrowRight from './arrow-right.svg';
import arrowLeft from './arrow-left.svg';
import moment from 'moment';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      loading: true,
      count: 0,
      transactionIDs: [],
      card: {
        image: "cardImage",
        sale: "sale",
        sale_time: "ago"
      }
    };
    this.getLastSoldCards = this.getLastSoldCards.bind(this) 
    this.changeCard = this.changeCard.bind(this)
}

  componentDidMount() {
    this.getLastSoldCards()
  }

  
  
    getLastSoldCards() {
      axios.get('https://api.opensea.io/api/v1/events/?event_type=successful&asset_contract_address=0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e&limit=10')
      .then(response => {
          this.setState({
            assets: response.data.asset_events,
            loading: false,
          })
          const arr = this.state.assets.map(asset => asset.transaction.id)
          this.setState({transactionIDs: arr})
          chrome.storage.local.set({key: this.state.transactionIDs})
          this.changeCard()
      })
      .catch( error => { 
        console.log(error);
      })
    }

    changeCard(){
          const lastSoldCard = this.state.assets[this.state.count] 
          const cardImage = lastSoldCard.asset.image_url
          const cardSaleTime = lastSoldCard.transaction.created_date
          var timeZone = cardSaleTime;
          var dt = new Date(timeZone.replace(' ', 'T') + "Z");
          var timeOfSale = moment(dt).fromNow()
          const sale = (lastSoldCard.total_price / 1000000000000000000).toFixed(3)
          this.setState({
            card: {
              image: cardImage,
              sale: sale,
              sale_time: timeOfSale
            }
          })
    }
    increment = () => {
      if(this.state.count === 9){
        this.setState({count: this.state.count -= 9})
      }
      else{
        this.setState({ count: this.state.count += 1 })
      }
      this.changeCard()
    }
    decrement = () => {
      if(this.state.count === 0){
        this.setState({count: this.state.count += 9})
      }
      else{
        this.setState({ count: this.state.count -= 1});
      }
      this.changeCard()
    }
  render() {
    const { loading } = this.state;
    if (loading) {
      chrome.browserAction.onClicked.addListener(chrome.browserAction.setBadgeText({text: ''}));
        return (
          <div>
          <ClipLoader
            color={'#36D7B7'} 
            loading={this.state.loading} 
          />
        </div>
        );
    }
  

    return (
      <div className="App center">
        <div className="align">
          <button className="button-style" onClick={this.decrement}>
            <img className="arrows" src={arrowLeft} alt="arrow_left"/></button>
          <h3 className="light">Last Sold Card <button className="button-style" onClick={this.increment}>
            <img className="arrows" src={arrowRight} alt="arrow_right"/></button></h3>
        </div>
        <img className="image-styles" src={this.state.card.image} alt="player"/>
        <h4 className="light">Sold For: <strong>{this.state.card.sale} ETH </strong></h4>
        <h4><strong>{this.state.card.sale_time}</strong></h4>
      </div>
    );
  }
}

export default App;
