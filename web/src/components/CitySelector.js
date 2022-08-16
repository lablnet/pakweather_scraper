import React from 'react';
import data from '../weather.json';
import { Navigate } from "react-router-dom";
import Select from './Select';

var cities = []
for (let item in data) {
    cities.push(data[item].city)
}

class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
            city: null,
        }
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
                <div className='col-span-1'>
                    <Select onChange={this._onChange} className="w-full p-2 border border-gray-400">
                        {optionValues}
                    </Select>
                </div>
            </div>

        );
    }
}

export default CitySelector;
