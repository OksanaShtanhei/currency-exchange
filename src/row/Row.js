import React from 'react';

function Row(props){
    
    const {
        currency,
        name,
        selectCurrency,
        onChangeCurrency,
        amount,
        onChangeAmount
    } = props

    return(
        <div id={name}>
            <input type="number" 
                   className="inp" 
                   value={amount ? amount : ''}
                   onChange={onChangeAmount}
                   />
            <select 
                    value={currency}
                    // value={currency || []}
                    onChange={onChangeCurrency}
                    >
                {selectCurrency && selectCurrency.map((el, i) => {
                    return <option key={i} >{el}</option>
                })}
            </select>
        </div>
    )
}
export default Row;