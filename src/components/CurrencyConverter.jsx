import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from 'axios';

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'LTC', 'USD', 'XRP', 'ADA'];

    const [choosenPrimaryCurrency, setChoosenPrimaryCurrency] = useState('BTC');

    const [choosenSecondaryCurrency, setChoosenSecondaryCurrency] = useState('BTC');

    const [amount, setAmount] = useState('1');

    const [exchangeRate, setExchangeRate] = useState(0);

    const [result, setResult] = useState(0);


    const convert = () => {
        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {from_currency: choosenPrimaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: choosenSecondaryCurrency},
            headers: {
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
                'x-rapidapi-key': '9bb966fb80msh16d34729859dba3p1dcb5cjsn234dc2a3d059'
                }
            };
            
            axios.request(options).then((response) => {
                setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
                setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount);
            }).catch((error) => {
                console.error(error);
            });
    }


    return (
        <div className="currency-converter">
            <h1>Currency Converter</h1>
            <div className="input-box">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Primary Currency
                            </td>

                            <td>
                                <input value={amount} type="number" name='currency-amount-1' onChange={(e) => setAmount(e.target.value)} />
                            </td>

                            <td>
                                <select value={choosenPrimaryCurrency} name="currency-option-1" onChange={(e) => setChoosenPrimaryCurrency(e.target.value)}>
                                    {currencies.map((currency, index) => {  return <option key={index} value={currency}>{currency}</option> })}
                                </select>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                Secondary Currency
                            </td>

                            <td>
                                <input value={result} type="number" name='currency-amount-2' disabled={true} />
                            </td>

                            <td>
                                <select value={choosenSecondaryCurrency} name="currency-option-2" onChange={(e) => setChoosenSecondaryCurrency(e.target.value)}>
                                {currencies.map((currency, index) => {  return <option key={index} value={currency}>{currency}</option> })}
                                </select>

                            </td>
                        </tr>
                    </tbody>
                </table>
                <button id='convert' onClick={convert}>Convert</button>
                
            </div>
            <ExchangeRate exchangeRate={exchangeRate} />
        </div>
    )
    
}

export default CurrencyConverter;