// import { test } from "../js/test.js";

// console.log(test())

window.addEventListener('load',function(e){
    const searchURL = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=1KKJ7JC3M4W7L8A9";
    //https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=APDQBGLBHE9RAVXT
    
    async function getData(stockSymbol){
        let url = searchURL + stockSymbol;
        const req = await fetch(url);//fetching url
        const result = await req.json() //whats sent back
        return(result)
        // console.log(result)
        // ['Meta Data']['2. Symbol']
        // const a = {temp:1}
        // a['temp']
    }

    // getData('aapl');

    // Add submit evt to form...pass it ibm get data function
    // document.forms['search']
    // console.log()
    document.forms.search.addEventListener('submit',function(e){
        e.preventDefault()
        // getData('ibm')
        const stockData = getData(e.currentTarget.elements.symbolSearch.value)
        // console.log(stockData)

        stockData
        .then(res => {
            if (res['Error Message']) {
                // console.log('error')
                //template literal for error
                const errorTemplate = `<p>sorry cant find the stock quote</p>`
                document.querySelector('.stock-display').innerHTML = errorTemplate
                // const errorTemplate = `<p>${warning}</p>`
            }else{  
                // console.log('all good')
                const successTemplate = `
                <ul>
                <li>${res['Meta Data']['2. Symbol']}</li>
                
                </ul>
                `
                console.log(successTemplate)
            }
            // console.log('res')
            // console.log(res)
        })
        // .catch(err => console.log(err))
    })

    // getData('ibm')
})