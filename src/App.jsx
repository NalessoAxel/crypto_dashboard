import { useState } from 'react'
import CurrencyConverter from './components/CurrencyConverter'
import NewsFeed from './components/NewsFeed'

const App = () =>  {

  return (
    <div className="App">
      <NewsFeed />
      <CurrencyConverter />
    </div>
  )
}

export default App
