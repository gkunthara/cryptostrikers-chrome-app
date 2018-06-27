import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


class App extends Component {

  constructor() {
    super();
    this.state = {
      loading: true,
      card: {
        image: "cardImage",
        sale: "sale",
        sale_time: "hours + ':' + minutes"
      }
    };
    this.getLastSoldCard = this.getLastSoldCard.bind(this) 
}

  componentDidMount() {
    this.getLastSoldCard()
    
  }
  
    getLastSoldCard() {
      axios.get('https://api.opensea.io/api/v1/events/?event_type=successful&asset_contract_address=0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e&limit=10')
      .then(response => {
        
          let assets = response.data.asset_events
          const lastSoldCard = assets[0]
          const cardImage = lastSoldCard.asset.image_url
          const cardSaleTime = lastSoldCard.transaction.created_date
  
          var timeZone = cardSaleTime;
          var dt = new Date(timeZone.replace(' ', 'T') + "Z");
          var date = dt.toDateString();
          var hours = dt.getHours(); 
          var minutes = dt.getMinutes();
          if(minutes < 10){
            minutes = "0" + minutes
          }
  
          const sale = lastSoldCard.total_price / 1000000000000000000;
          this.setState({
            loading: false,
            card: {
              image: cardImage,
              sale: sale,
              sale_time: date + " " + hours + ':' + minutes
            }
          })
        
      })
      .catch( error => { 
        console.log(error);
      })
    }

  render() {
    const { loading } = this.state;
    if (loading) {
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
        <h3 className="light">Last Sold Card</h3>
        <img className="image-styles"  src={this.state.card.image} alt="player"/>
        <h3 className="light">Sold For: {this.state.card.sale} ETH</h3>
        <h3 className="light">At: {this.state.card.sale_time}</h3>
      </div>
    );
  }
}

export default App;
