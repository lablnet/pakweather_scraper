import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Weather from './Weather';
import data from './weather.json';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     cities: [],
  //     shouldRedirect: false,
  //     city: null,
  //   }
  // }
  // componentDidMount() {
  //   let cities = []
  //   for (let item in data) {
  //     cities.push(data[item].city)
  //   }
  //   this.setState({
  //     cities: cities,
  //   })
  // }
  // _onChange = (e) => {
  //   if (e.key === 'Enter') {
  //     let city = e.target.value;
  //     // check if the city is in the data list.
  //     if (this.state.cities.includes(city)) {
  //       city = city.replace(/\s/g, '-');
  //       this.setState({
  //         city: city,
  //         shouldRedirect: true,
  //       })
  //     } else {
  //       alert("Please enter a valid city name");
  //     }
  //   }
  //}
  render() {
    // let c = this.state.city
    // const { shouldRedirect } = this.state
    // if (shouldRedirect)
    //   return <Navigate replace to={`/weather/${c}`} />

    // const ciites = this.state.cities
    // // make data list select.

    // let dataList = ciites.map((item, index) => (
    //   <option key={index} value={item}>{item}</option>
    // ));
    return (
      <div className='mx-auto p-4 bg-gray-400 h-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-101'>
          <div className="col-span-1">
            <h1 className='text-semibold text-3xl mx-2 p-2'>Pakistan Weather</h1>
          </div>
          {/* <div className='col-span-1'>
            <input list='search' className='w-full p-2 border border-gray-400' placeholder='Search City' onKeyDown={this._onChange} />
            <datalist id="search">
              {dataList}
            </datalist>
          </div> */}

        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:country" element={<Weather />} />
        </Routes>
      </div>
    );
  }
}

export default App;
