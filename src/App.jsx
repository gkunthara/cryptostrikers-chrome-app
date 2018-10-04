/* global chrome */
import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import arrowRight from './arrow-right.svg';
import arrowLeft from './arrow-left.svg';
import url from './utils';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assets: [],
            loading: true,
            count: 0,
            transactionIDs: [],
            card: {
                image: 'cardImage',
                sale: 'sale',
                sale_time: 'ago',
            },
        };
        this.getLastSoldCards = this.getLastSoldCards.bind(this);
        this.changeCard = this.changeCard.bind(this);
    }

    componentDidMount() {
        this.getLastSoldCards();
    }

    async getLastSoldCards() {
        const { data } = await axios.get(url);
        const { asset_events } = data;
        this.setState({
            assets: asset_events,
            loading: false,
        });
        const arr = this.state.assets.map(asset => asset.transaction.id);
        this.setState({ transactionIDs: arr });
        const { transactionIDs } = this.state;
        chrome.storage.local.set({ key: transactionIDs });
        this.changeCard();
    }

    changeCard() {
        const { assets, count } = this.state;
        const lastSoldCard = assets[count];
        const cardImage = lastSoldCard.asset.image_url;
        const cardSaleTime = lastSoldCard.transaction.created_date;
        var timeZone = cardSaleTime
        var dt = new Date(timeZone.replace(' ', 'T') + "Z");
        const timeOfSale = moment(dt).fromNow();
        const sale = (lastSoldCard.total_price / 1000000000000000000).toFixed(3);
        this.setState({
            card: {
                image: cardImage,
                sale,
                sale_time: timeOfSale,
            },
        });
    }

    increment = () => {
        if (this.state.count === 9) this.setState({count: this.state.count -= 9});
        else this.setState({ count: this.state.count+=1});

        this.changeCard();
    }

    decrement = () => {
        if (this.state.count === 0) this.setState({count: this.state.count += 9});
        else this.setState({ count: this.state.count-=1 });

        this.changeCard();
    }

    render() {
        const { loading, count } = this.state;
        if (loading) {
            chrome.browserAction.onClicked.addListener(chrome.browserAction.setBadgeText({ text: '' }));
            return (
                <div>
                    <ClipLoader
                        color="#36D7B7"
                        loading={loading}
                    />
                </div>
            );
        }
        return (
            <div className="App center">
                <div className="align">
                    <button className="button-style" onClick={this.decrement}>
                        <img className="arrows" src={arrowLeft} alt="arrow_left" />
                    </button>
                    <h3 className="light">
                        Last Sold Card
                        <button className="button-style" onClick={this.increment}>
                            <img className="arrows" src={arrowRight} alt="arrow_right" />
                        </button>
                    </h3>
                </div>
                <img className="image-styles" src={this.state.card.image} alt="player" />
                <h4 className="light">
                    Sold For: 
                    <strong>
                        {this.state.card.sale} ETH
                    </strong>
                </h4>
                <h4><strong>{this.state.card.sale_time}</strong></h4>
                <p>{count+1}/10</p>
            </div>
        );
    }
}

export default App;
