import React from 'react';
import data from '../weather.json';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: null,
            weather: null,
        }
    }
    componentDidMount() {
        let city = window.location.pathname.split('/').pop();
        // remove - with spaces.
        city = city.replace(/-/g, ' ');
        // make all latter caps after space.
        city = city.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
        city = city.charAt(0).toUpperCase() + city.slice(1);
        this.setState({
            search: city,
        });
        this.search(city);
        document.title = `${city} - Weather`;
    }
    search(city) {
        // find city name in data arrays object and return that object.
        let weather = data.find((item) => {
            return item.city === city
        });
        this.setState({
            weather: weather
        }, () => { });

    }
    render() {
        const weather = this.state.weather
        let airQualityNumber = weather?.airQualityNumber
        let airQualityColor = 'bg-red-500'
        if (airQualityNumber <= 50)
            airQualityColor = 'bg-green-500'
        else if (airQualityNumber >= 51 && airQualityNumber <= 100)
            airQualityColor = 'bg-yellow-600'
        else if (airQualityNumber >= 101 && airQualityNumber <= 150)
            airQualityColor = 'bg-orange-500'


        return (
            <div>
                <div className="">
                    <div className="flex flex-wrap">
                        <div className="w-full px-2">
                            <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full ">
                                <div className="px-8 py-8 relative">
                                    <div className="flex mb-4 justify-between items-center">
                                        <div>
                                            <h5 className="mb-0 font-medium text-xl">{weather?.city + " Pakistan"}</h5>
                                            <h6 className="mb-0">{weather?.date}</h6><small>{weather?.currentCondition}</small>
                                        </div>
                                        <div className="text-right">
                                            <h3 className="font-bold text-4xl mb-0"><span>{weather?.temp}&deg;</span></h3>
                                        </div>
                                    </div>
                                    <hr className="text-white border-1 mt-2 mb-3" />
                                    <div className="block sm:flex justify-between items-center flex-wrap">
                                        <div className="w-full sm:w-1/2">
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Surise/Sunset</span><small className="px-2 inline-block">{weather?.sunrise}&nbsp; {weather?.sunset}</small></div>
                                        </div>
                                    </div>
                                    <div className="block sm:flex justify-between items-center flex-wrap">
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mb-2 justify-between items-center"><span>Temp</span><small className="px-2 inline-block">{weather?.high}&nbsp;&deg; - {weather?.low}&nbsp;&deg;</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Feels like</span><small className="px-2 inline-block">{weather?.feelLikeTemp}&nbsp;&deg;</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mb-2 justify-between items-center"><span>Humidity</span><small className="px-2 inline-block">{weather?.humidity}</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Wind</span><small className="px-2 inline-block">{weather?.wind}&nbsp;

                                                {/* <span className='w-20 h-20' dangerouslySetInnerHTML={{ __html: weather && weather['Wind Directin'] }}> </span> */}
                                            </small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mb-2 justify-between items-center"><span>UV Index</span><small className="px-2 inline-block">{weather?.uv_index}</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Visibility</span><small className="px-2 inline-block">{weather?.VisibilityValue}&nbsp;&deg;</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mb-2 justify-between items-center"><span>Pressure</span><small className="px-2 inline-block">{weather?.pressure}</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Dew Point</span><small className="px-2 inline-block">{weather?.dewPoint}&nbsp;&deg;</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                        </div>
                                        <div className="w-full sm:w-1/2">
                                            <div className="flex mx-5 mb-2 justify-between items-center"><span>Moon Phase</span><small className="px-2 inline-block">{weather?.moonPhase}&nbsp;</small></div>
                                        </div>
                                        <div className="w-full sm:w-1/2">
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
                                                <strong>{weather?.airQualityText}</strong>
                                            </p>
                                            <p className='text-center mb-3'>
                                                {weather?.airQualityDescription}
                                                {weather?.null[0]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Weather;
