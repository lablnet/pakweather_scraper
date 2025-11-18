import React from 'react';
import { Navigate } from "react-router-dom";
import Select from './Select';
import { fetchLocations } from '../utils/api';

class CitySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shouldRedirect: false,
            city: null,
            latitude: null,
            longitude: null,
            locations: [],
            loading: true,
            error: null
        }
    }

    componentDidMount() {
        this.loadLocations();
    }

    loadLocations = async () => {
        try {
            const locations = await fetchLocations();
            this.setState({ locations, loading: false });
        } catch (error) {
            console.error('Error loading locations:', error);
            this.setState({ error: 'Failed to load locations', loading: false });
        }
    }

    _onChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue) {
            const [city, lat, lng] = selectedValue.split('|');
            const citySlug = city.replace(/\s/g, '-');
            this.setState({
                city: citySlug,
                latitude: lat,
                longitude: lng,
                shouldRedirect: true,
            })
        }
    }

    render() {
        const { shouldRedirect, city, latitude, longitude, locations, loading, error } = this.state;
        
        if (shouldRedirect && city && latitude && longitude) {
            return <Navigate replace to={`/weather/${city}?lat=${latitude}&lng=${longitude}`} />
        }

        if (loading) {
            return (
                <div className="mb-8">
                    <div className='col-span-1'>
                        <Select className="w-full p-2 border border-gray-400" disabled>
                            <option>Loading locations...</option>
                        </Select>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="mb-8">
                    <div className='col-span-1'>
                        <p className="text-red-500">{error}</p>
                    </div>
                </div>
            );
        }

        const optionValues = locations.map((location, index) => (
            <option key={index} value={`${location.name}|${location.lat}|${location.lng}`}>
                {location.name}
            </option>
        ));

        return (
            <div className="mb-8">
                <div className='col-span-1'>
                    <Select onChange={this._onChange} className="w-full p-2 border border-gray-400">
                        <option value="">Select a city...</option>
                        {optionValues}
                    </Select>
                </div>
            </div>
        );
    }
}

export default CitySelector;
