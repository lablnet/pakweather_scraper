import React from 'react';
import { fetchTodayWeather, fetchPastWeather } from '../utils/api';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            weather: null,
            lastYearWeather: null,
            loading: true,
            error: null,
            selectedDate: null,
        }
    }
    
    componentDidMount() {
        const urlParams = new URLSearchParams(window.location.search);
        const latitude = urlParams.get('lat');
        const longitude = urlParams.get('lng');
        
        let city = window.location.pathname.split('/').pop();
        // Remove - with spaces.
        city = city.replace(/-/g, ' ');

        // Transform all latter capital after space including first one.
        city = city.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        city = city.charAt(0).toUpperCase() + city.slice(1);

        this.setState({
            search: city,
        });
        
        if (latitude && longitude) {
            this.fetchWeatherData(latitude, longitude);
        } else {
            this.setState({ error: 'Latitude and longitude are required', loading: false });
        }
        
        document.title = `${city} - Weather`;
    }
    
    fetchWeatherData = async (latitude, longitude, date = null) => {
        this.setState({ loading: true, error: null });
        try {
            if (date) {
                // Fetch past weather for specific date
                const pastData = await fetchPastWeather(latitude, longitude, date);
                this.setState({
                    weather: pastData.data[0] || null,
                    loading: false
                });
            } else {
                // Fetch today's weather with last year comparison
                const data = await fetchTodayWeather(latitude, longitude);
                this.setState({
                    weather: data.today,
                    lastYearWeather: data.lastYear,
                    loading: false
                });
            }
        } catch (error) {
            console.error('Error fetching weather:', error);
            this.setState({ 
                error: 'Failed to load weather data', 
                loading: false 
            });
        }
    }
    
    handleDateChange = (e) => {
        const date = e.target.value;
        const urlParams = new URLSearchParams(window.location.search);
        const latitude = urlParams.get('lat');
        const longitude = urlParams.get('lng');
        
        if (date && latitude && longitude) {
            this.setState({ selectedDate: date });
            this.fetchWeatherData(latitude, longitude, date);
        } else if (!date && latitude && longitude) {
            this.setState({ selectedDate: null });
            this.fetchWeatherData(latitude, longitude);
        }
    }
    render() {
        const { weather, lastYearWeather, loading, error, selectedDate } = this.state;

        if (loading) {
            return (
                <div className="w-full px-2">
                    <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full p-8">
                        <p className="text-center">Loading weather data...</p>
                    </div>
                </div>
            );
        }

        if (error || !weather) {
            return (
                <div className="w-full px-2">
                    <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full p-8">
                        <p className="text-center text-red-500">{error || 'Weather data not available'}</p>
                    </div>
                </div>
            );
        }

        // Air quality and color.
        let airQualityNumber = parseInt(weather?.airQualityNumber) || 0;
        let airQualityColor = 'bg-red-500';
        if (airQualityNumber <= 50)
            airQualityColor = 'bg-green-500';
        else if (airQualityNumber >= 51 && airQualityNumber <= 100)
            airQualityColor = 'bg-yellow-600';
        else if (airQualityNumber >= 101 && airQualityNumber <= 150)
            airQualityColor = 'bg-orange-500';

        // Pressure and color.
        let pressure = weather?.pressure || '';
        let arrowPressure = pressure?.substring(0, pressure?.search(/\d/)) || '';
        pressure = pressure?.replace(arrowPressure, '') || '';
        let arrow = '&uarr;';
        let arrowClass = 'text-green-500';
        if (arrowPressure === 'Down ') {
            arrow = '&darr;';
            arrowClass = 'text-red-500';
        }

        // Icon map.
        let iconMap = {
            'fog' : require('../icons/fog.png'),
            'haze' : require('../icons/fog.png'),
            'sunny': require('../icons/sunny.png'),
            'clear': require('../icons/sunny.png'),
            'partly cloudy': require('../icons/partly-cloudy.png'),
            'fair': require('../icons/partly-cloudy.png'),
            'cloudy': require('../icons/cloudy.png'),
            'mostly cloudy': require('../icons/cloudy.png'),
            'rain': require('../icons/rain.png'),
            'light rain': require('../icons/light-rain.png'),
            'light rain with thunder': require('../icons/light-rain.png'),
            'thunderstorm': require('../icons/thunderstorm.png'),
            'thunder': require('../icons/thunder.png'),
            'mist': require('../icons/mist.png'),
        };
        // Current condition and icons.
        let currentCondition = weather?.currentCondition || '';
        currentCondition = currentCondition?.toLowerCase() || '';
        // find in iconmap.
        let icon = iconMap[currentCondition];
        if (icon === undefined)
            icon = require('../icons/undefined.png');

        // Format date
        const formatDate = (dateStr) => {
            if (!dateStr) return '';
            const parts = dateStr.split(' ');
            if (parts.length >= 2) {
                return parts[0] + ' ' + parts[1].split('.')[0];
            }
            return dateStr;
        };

        return (
            <div>
                <div className="">
                    <div className="flex flex-wrap">
                        <div className="w-full px-2">
                            {/* Date Filter */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Filter by Date (optional):
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate || ''}
                                    onChange={this.handleDateChange}
                                    className="p-2 border border-gray-400 rounded"
                                />
                                {selectedDate && (
                                    <button
                                        onClick={() => {
                                            this.setState({ selectedDate: null });
                                            const urlParams = new URLSearchParams(window.location.search);
                                            const latitude = urlParams.get('lat');
                                            const longitude = urlParams.get('lng');
                                            if (latitude && longitude) {
                                                this.fetchWeatherData(latitude, longitude);
                                            }
                                        }}
                                        className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                                    >
                                        Clear Filter
                                    </button>
                                )}
                            </div>

                            {/* Today's Weather */}
                            <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full ">
                                <div className="px-8 py-8 relative">
                                    <div className="flex mb-4 justify-between items-center">
                                        <div>
                                            <h5 className="mb-0 font-medium text-xl">{weather?.city + " Pakistan"}</h5>
                                            <h6 className="mb-0">{formatDate(weather?.date)}</h6>
                                            <small>{currentCondition}</small>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="font-bold text-4xl mb-0"><span>{weather?.temp}&deg;</span></h3>
                                            <img src={icon} alt={currentCondition} />
                                        </div>
                                    </div>
                                    <hr className="text-white border-1 mt-2 mb-3" />

                                    <div className="grid sm:grid-cols-2">
                                        <div className='col-span-1'></div>
                                        <div className="col-span-1 mb-4">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Surise/Sunset</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.sunrise}&nbsp; {weather?.sunset}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 mb-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Temp</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.high}&nbsp;&deg; - {weather?.low}&nbsp;&deg;</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Feels like</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.feelLikeTemp}&nbsp;&deg;</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 mb-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Humidity</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.humidity}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Wind</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.wind}&nbsp;
                                                        {/* <span className='w-20 h-20' dangerouslySetInnerHTML={{ __html: weather && weather['Wind Directin'] }}> </span> */}

                                                    </small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 mb-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>UV Index</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.uv_index}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Visibility</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.VisibilityValue}&nbsp;&deg;</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1 mb-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Pressure</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">
                                                        <span className={arrowClass + ' font-bold'} dangerouslySetInnerHTML={{ __html: arrow }}></span> &nbsp;&nbsp;
                                                        {pressure}
                                                    </small>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-span-1">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Dew Point</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.dewPoint}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-1"></div>
                                        <div className="col-span-1 mb-2">
                                            <div className='grid grid-cols-2'>
                                                <div className='col-span-1'>
                                                    <span>Moon Phase</span>
                                                </div>
                                                <div className='col-span-1 text-end mx-5'>
                                                    <small className="px-2 inline-block">{weather?.moonPhase}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="text-white border-1 mt-2 mb-3" />
                                    <div className="container px-5 py-5 mx-auto">
                                        <h2 className='font-bold text-2xl mb-3'>Air Quality Index</h2>
                                        <div className="text-center">
                                            <div className={'w-[70px] h-[70px] bg-red rounded-full flex justify-center items-center  mx-auto mb-2 ' + airQualityColor}>
                                                <p>{airQualityNumber}</p>
                                            </div>
                                            <p className="text-center mx-auto mt-2 mb-2">
                                                <strong>{weather?.airQualityText || 'N/A'}</strong>
                                            </p>
                                            <p className='text-center mb-3'>
                                                {weather?.airQualityDescription || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Last Year Comparison */}
                            {lastYearWeather && !selectedDate && (
                                <div className="bg-gray-800 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full mt-4">
                                    <div className="px-8 py-8 relative">
                                        <h3 className='font-bold text-xl mb-4'>Last Year Comparison</h3>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-400">Date</p>
                                                <p className="font-medium">{formatDate(lastYearWeather?.date)}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Temperature</p>
                                                <p className="font-medium">{lastYearWeather?.temp || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Condition</p>
                                                <p className="font-medium">{lastYearWeather?.currentCondition || 'N/A'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-400">Humidity</p>
                                                <p className="font-medium">{lastYearWeather?.humidity || 'N/A'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;
