import React from 'react';
import data from './weather.json';
import { Navigate } from "react-router-dom";
import Select from './Select';

var  cities = []
for (let item in data) {
    cities.push(data[item].city)
}

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
            city: null,
        }
    }
    componentDidMount() {
        document.title = "Pakistan Weather"
    }
    _onChange = (e) => {
        let city = e.target.value;
        if (cities.includes(city)) {
            city = city.replace(/\s/g, '-');
            this.setState({
                city: city,
                shouldRedirect: true,
            })
        }
    }
    render() {
        let c = this.state.city;
        const { shouldRedirect } = this.state
        if (shouldRedirect)
            return <Navigate replace to={`/weather/${c}`} />

        let optionValues = cities.map((item, index) => (
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
                                <Select onChange={this._onChange} className="w-full p-2 border border-gray-400">
                                    {optionValues}
                                </Select>

                            </div>
                            <p class="lg:w-2/3 mx-auto leading-relaxed text-base mb-6">
                                Choose from list.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

        );
    }
}

export default Home;
