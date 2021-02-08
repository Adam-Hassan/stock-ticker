

/*
url: https://www.alphavantage.co/documentation/
key: 1KKJ7JC3M4W7L8A9

api endpoint: https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo
**https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=1KKJ7JC3M4W7L8A9&symbol=ibm
*/ 

window.addEventListener('load',function(e){
    const searchURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=1KKJ7JC3M4W7L8A9&symbol=";
    
    //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=APDQBGLBHE9RAVXT
    
    async function getData(stockSymbol){
        let url = searchURL + stockSymbol;
        const req = await fetch(url);
        const result = await req.json()
        //console.log(result)//result comes back as object, the Meta Data has 6 properties (info, stock symbol eg.)
        
        console.log(result)
        return result;

        // const a = {temp:1}
        // a['temp']
        
    }
    // getData('aapl')

    //Add the submit event to form... pass it ibm to get data function

    //console.log(document.forms.search)//search is obj
    document.forms.search.addEventListener('submit',function(e){
        //searchTerm
        e.preventDefault()//prevent form from submitting
        // getData('ibm')
        //console.log(e.currentTarget.elements.value)//form element, value is label (symbolSearch)
        //console.log(e.currentTarget.elements.symbolSearch.value)
        const stockData = getData(e.currentTarget.elements.symbolSearch.value)
        // console.log(stockData)

        stockData
        .then(res=> {
            // console.log('res')
            // console.log(res)
            if(res['Error Message']){
                // console.log("error")
                //template literal for error
                const errorTemplate = `<p>Sorry cannot find the stock data</p>`
                document.querySelector('.stock-display').innerHTML = errorTemplate
            }else{
                // console.log('all good')
                const successTemplate = `
                <ul>
                    <li>${res['Meta Data']['1. Information']}</li>
                    <li>${res['Meta Data']['2. Symbol']}</li>
                    <li>${res['Meta Data']['3. Last Refreshed']}</li>
                    <li>${res['Meta Data']['6. Time Zone']}</li>
                </ul>
                `
                document.querySelector('.stock-display').innerHTML = successTemplate
                console.log(successTemplate)
            }
        })
        .catch(err=> console.log(err))
    })

    
})