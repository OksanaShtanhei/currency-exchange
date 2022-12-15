import React, {useState, useEffect} from 'react';
import './App.css';
import Row from './row/Row'

const App = () => {
    const [selectCurrency, setSelectCurrency] = useState([])
    const [currencyRate, setCurrencyRate] = useState({})
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState([])
    const [amount, setAmount] = useState(1)
    const [amountCurrency, setAmountCurrency] = useState(true)
    const [exchangeRate, setExchangeRate] = useState()

    let toAmount, fromAmount
    if(amountCurrency){
      fromAmount = amount
      toAmount = amount * exchangeRate
    } else{
      toAmount = amount
      fromAmount = amount / exchangeRate
    }
  
    useEffect(() => {
      fetch(`https://api.exchangerate.host/latest`)
        .then(res => res.json())
        .then(data => {
          setSelectCurrency([data.base, ...Object.keys(data.rates)])
          setCurrencyRate(data.rates)
          setFromCurrency(data.base)
          setToCurrency(Object.keys(data.rates)[0])
          setExchangeRate(data.rates[Object.keys(data.rates)[0]])
        })
      }, [])

      useEffect(() => {
        if(fromCurrency && toCurrency){
          fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`)
          .then(res => res.json())
          .then(res => setExchangeRate(res.info.rate))
        }
      }, [fromCurrency, toCurrency])

      const onFromChangeAmount = (e) => {
        setAmount(e.target.value)
        setAmountCurrency(true)
      }

      const onToChangeAmount = (e) => {
        setAmount(e.target.value)
        setAmountCurrency(false)
      }

        return(
            <div>
                  <form >
                      <Row currencyRate={currencyRate}
                          selectCurrency={selectCurrency}
                          currency={fromCurrency}
                          onChangeCurrency={e => setFromCurrency(e.target.value)}
                          amount={fromAmount}
                          onChangeAmount={onFromChangeAmount}
                        />
                      <Row currencyRate={currencyRate}
                          selectCurrency={selectCurrency}
                          currency={toCurrency}
                          onChangeCurrency={e => setToCurrency(e.target.value)}
                          amount={toAmount}
                          onChangeAmount={onToChangeAmount}
                          />
                </form>
            </div>
            
        )
    }

export default App;
