function renderCard (price, label) {
  return `
    <div class='card'>
      <div class='card__price'>$${price}</div>
      <div>${label}</div>
    </div>
  `
}

function getAUDRate (date) {
  date = 'latest'
  return window.fetch(`http://api.fixer.io/${date}?symbols=USD&base=AUD`)
    .then(res => res.json())
}

function getCoinbaseRate (code) {
  return window.fetch(`https://api.coinbase.com/v2/prices/${code}-USD/spot`)
    .then(res => res.json())
}

function renderData (data) {
  const rates = document.getElementById('rates')
  const priceAUD = Math.round(data[0].rates.USD * 1000) / 1000
  const priceBTC = Math.round(data[1].data.amount)
  const priceETH = Math.round(data[2].data.amount)
  console.log(data)
  rates.innerHTML = `
    ${renderCard(priceAUD, 'AUD')}
    ${renderCard(priceBTC, 'BTC')}
    ${renderCard(priceETH, 'ETH')}
  `
}

const init = () => {
  Promise.all([ getAUDRate(), getCoinbaseRate('BTC'), getCoinbaseRate('ETH') ])
  .then(renderData)
}

window.onload = init
