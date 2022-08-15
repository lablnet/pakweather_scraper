import React from 'react';
import data from './weather.json';
import { Routes, Route, Navigate } from "react-router-dom";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: [],
            shouldRedirect: false,
            city: null,
        }
    }
    componentDidMount() {
        let cities = []
        for (let item in data) {
            cities.push(data[item].city)
        }
        this.setState({
            cities: cities,
        })
    }
    _onChange = (e) => {
        if (e.key === 'Enter') {
            let city = e.target.value;
            // check if the city is in the data list.
            if (this.state.cities.includes(city)) {
                city = city.replace(/\s/g, '-');
                this.setState({
                    city: city,
                    shouldRedirect: true,
                })
            } else {
                alert("Please enter a valid city name");
            }
        }
    }
    render() {
        let c = this.state.city
        const { shouldRedirect } = this.state
        if (shouldRedirect)
            return <Navigate replace to={`/weather/${c}`} />

        const ciites = this.state.cities
        // make data list select.

        let dataList = ciites.map((item, index) => (
            <option key={index} value={item}>{item}</option>
        ));
        return (
            <div class="mb-8">
                <section class="">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="text-center mb-20">
                            <h1
                                class="sm:text-3xl text-2xl font-medium text-center title-font mb-4"
                            >
                                Type your city name below.
                            </h1>
                            <div className='col-span-1'>
                                <input list='search' className='w-full p-2 border border-gray-400' placeholder='Search City' onKeyDown={this._onChange} />
                                <datalist id="search">
                                    {dataList}
                                </datalist>
                            </div>
                            <p class="lg:w-2/3 mx-auto leading-relaxed text-base mb-6">
                                Choose from list and then hit enter.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default Home;
