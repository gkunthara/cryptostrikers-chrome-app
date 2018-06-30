let assets = []
let newTransactions = []
function getNewSales(){
    fetch('https://api.opensea.io/api/v1/events/?event_type=successful&asset_contract_address=0xdcaad9fd9a74144d226dbf94ce6162ca9f09ed7e&limit=10')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        assets = data.asset_events
        newTransactions = assets.map(asset => asset.transaction.id)
        console.log("here are the new transactions: " + newTransactions)
        chrome.storage.local.get(['key'], function(result) {
            console.log('storage currently has ' + result.key);
            diff = newTransactions.filter(x => result.key.indexOf(x) < 0 );
            let count = diff.length
            let label = String(count)
            console.log(diff.length)
            if(diff > 0){
                chrome.browserAction.setBadgeBackgroundColor({ color: "#FF0000"});
                chrome.browserAction.setBadgeText({text: label});            
            }    
        });
        })
}

function salesTimer() {
    setInterval(getNewSales, 300000);
}
salesTimer();


