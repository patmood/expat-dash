function prevDayPrice (currentDate) {
  var d = new Date(currentDate)
  d.setDate(d.getDate() - 1)
  var dateString = d.toISOString().slice(0, 10)
  return getRate(dateString)
}

function getRate (date) {
  date = date || 'latest'
  return window.fetch('http://api.fixer.io/' + date + '?symbols=USD&base=AUD')
    .then(function (response) {
      return response.json()
    })
}

function init () {
  var rateToday
  var rateYesterday
  getRate()
    .then(function (data) {
      var date = data.date
      rateToday = data.rates.USD
      var rate = Math.round(rateToday * 1000) / 1000
      document.getElementById('rate').innerHTML = rate
      return prevDayPrice(date)
    })
    .then(function (data) {
      rateYesterday = data.rates.USD
      var diff = Math.round((rateToday - rateYesterday) * 1000) / 1000
      var diffEl = document.getElementById('diff')
      diffEl.innerHTML = diff
      if (diff > 0) {
        diffEl.classList.add('green')
      } else if (diff < 0) {
        diffEl.classList.add('red')
      }
    })
}

window.onload = init
