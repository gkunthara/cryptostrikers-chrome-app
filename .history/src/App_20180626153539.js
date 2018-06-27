import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      assets: [],
      loading: true,
      count: 0,
      card: {
        image: "cardImage",
        sale: "sale",
        sale_time: "hours + ':' + minutes"
      }
    };
    this.getLastSoldCards = this.getLastSoldCards.bind(this) 
    this.changeCard = this.changeCard.bind(this)
    console.log(this.state.count)

}

  componentDidMount() {
    this.getLastSoldCards()
    //this.changeCard()
  }
  
    getLastSoldCards() {
      axios.get('https://api.opensea.io/api/v1/events/?event_type=successful&asset_contract_address=0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e&limit=10')
      .then(response => {

          this.setState({
            assets: response.data.asset_events,
            loading: false
          })
      
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
          var date = dt.toDateString();
          var hours = dt.getHours(); 
          var minutes = dt.getMinutes();
          if(minutes < 10){
            minutes = "0" + minutes
          }
          const sale = lastSoldCard.total_price / 1000000000000000000;
          this.setState({
            card: {
              image: cardImage,
              sale: sale,
              sale_time: date + " " + hours + ':' + minutes
            }
          })
        
    }

    _click = () => {
      this.setState({
        count: this.state.count++
      })
      console.log(this.state.count)
    }

    DecreaseItem = () => {
      this.setState({ count: this.state.count - 1 });
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
        <button onClick={this.DecreaseItem}>{"-"}</button><h4 className="light">Last Sold Card <button onClick={this._click}>{"+"}</button></h4>
        <img className="image-styles" src={this.state.card.image} alt="player"/>
        <h4 className="light">Sold For: <strong>{this.state.card.sale} ETH </strong></h4>
        <h4 className="light">At: <strong>{this.state.card.sale_time}</strong></h4>
      </div>
    );
  }
}

export default App;
