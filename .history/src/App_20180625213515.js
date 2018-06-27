import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = {
      card: {
        name: "cardName",
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
        // console.log(data)
          let assets = response.data.asset_events
          // console.log(assets)
          //const result = assets.filter(asset => asset.total_price > 0);
          const lastSoldCard = assets[0]
          const cardName = lastSoldCard.asset.name
          const cardImage = lastSoldCard.asset.image_url
          const cardSaleTime = lastSoldCard.transaction.created_date
  
          var timeZone = cardSaleTime;
          var dt = new Date(timeZone.replace(' ', 'T') + "Z");
          var hours = dt.getHours(); 
          var minutes = dt.getMinutes();
  
          const sale = lastSoldCard.total_price / 1000000000000000000;
          card = {
            name: cardName,
            image: cardImage,
            sale: sale,
            sale_time: hours + ':' + minutes
          };
          console.log(card)
      })
    }


  render() {
    return (
      <div className="App">
        <h1>{card.name}</h1>
        <h2>{card.sale}</h2>
        <h2>hi</h2>
      </div>
    );
  }
}

export default App;
