import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import {
  fetchTodayWeather,
  fetchPastWeather,
  WeatherData,
} from '../utils/api';

// Helper function to handle null/empty values
const safeValue = (value: string | null | undefined, fallback: string = 'N/A'): string => {
  if (!value || value.trim() === '' || value === 'None' || value === 'null') {
    return fallback;
  }
  return value;
};

const Weather: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const [searchParams] = useSearchParams();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [lastYearWeather, setLastYearWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lng');

    if (city) {
      const cityName = city.replace(/-/g, ' ');
      document.title = `${cityName} - Weather`;
    }

    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    } else {
      setError('Latitude and longitude are required');
      setLoading(false);
    }
  }, [searchParams, city]);

  const fetchWeatherData = async (
    latitude: string,
    longitude: string,
    date: string | null = null
  ) => {
    setLoading(true);
    setError(null);
    try {
      if (date) {
        const pastData = await fetchPastWeather(latitude, longitude, date);
        setWeather(pastData.data[0] || null);
        setLastYearWeather(null);
      } else {
        const data = await fetchTodayWeather(latitude, longitude);
        setWeather(data.today);
        setLastYearWeather(data.lastYear);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setError('Failed to load weather data');
      setLoading(false);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lng');

    setSelectedDate(date);
    if (date && latitude && longitude) {
      fetchWeatherData(latitude, longitude, date);
    } else if (!date && latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    }
  };

  const clearDateFilter = () => {
    setSelectedDate('');
    const latitude = searchParams.get('lat');
    const longitude = searchParams.get('lng');
    if (latitude && longitude) {
      fetchWeatherData(latitude, longitude);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
            <p className="text-gray-600 text-lg font-medium">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">⚠️</div>
            <p className="text-red-600 font-semibold text-lg mb-4">{error || 'Weather data not available'}</p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
            >
              ← Go Back Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const airQualityNumber = parseInt(weather.airQualityNumber) || 0;
  let airQualityColor = 'bg-red-500';
  let airQualityBg = 'bg-red-50';
  let airQualityBorder = 'border-red-200';
  if (airQualityNumber <= 50) {
    airQualityColor = 'bg-green-500';
    airQualityBg = 'bg-green-50';
    airQualityBorder = 'border-green-200';
  } else if (airQualityNumber >= 51 && airQualityNumber <= 100) {
    airQualityColor = 'bg-yellow-500';
    airQualityBg = 'bg-yellow-50';
    airQualityBorder = 'border-yellow-200';
  } else if (airQualityNumber >= 101 && airQualityNumber <= 150) {
    airQualityColor = 'bg-orange-500';
    airQualityBg = 'bg-orange-50';
    airQualityBorder = 'border-orange-200';
  }

  const pressure = weather.pressure || '';
  const arrowPressure = pressure.substring(0, pressure.search(/\d/)) || '';
  const pressureValue = pressure.replace(arrowPressure, '') || '';
  const arrow = arrowPressure === 'Down ' ? '↓' : '↑';
  const arrowClass = arrowPressure === 'Down ' ? 'text-red-500' : 'text-green-500';

  const iconMap: Record<string, string> = {
    fog: '🌫️',
    haze: '🌫️',
    sunny: '☀️',
    clear: '☀️',
    'partly cloudy': '⛅',
    fair: '⛅',
    cloudy: '☁️',
    'mostly cloudy': '☁️',
    rain: '🌧️',
    'light rain': '🌦️',
    'light rain with thunder': '🌦️',
    thunderstorm: '⛈️',
    thunder: '⚡',
    mist: '🌫️',
  };

  const currentCondition = safeValue(weather.currentCondition, '').toLowerCase();
  const icon = iconMap[currentCondition] || '🌤️';

  const formatDate = (dateStr: string) => {
    const date = safeValue(dateStr);
    if (date === 'N/A') return 'N/A';
    const parts = date.split(' ');
    if (parts.length >= 2) {
      return parts[0] + ' ' + parts[1].split('.')[0];
    }
    return date;
  };

  const getTempValue = (temp: string | null | undefined) => {
    const tempStr = safeValue(temp);
    if (tempStr === 'N/A') return 'N/A';
    const value = tempStr.replace(/[^0-9.-]/g, '');
    return value || 'N/A';
  };

  const getTempRange = (high: string | null | undefined, low: string | null | undefined) => {
    const highVal = safeValue(high);
    const lowVal = safeValue(low);
    if (highVal === 'N/A' && lowVal === 'N/A') return 'N/A';
    if (highVal === 'N/A') return `${lowVal}°`;
    if (lowVal === 'N/A') return `${highVal}°`;
    return `${highVal} - ${lowVal}°`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Date Filter Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 mb-6 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-1">
                  Filter by Date
                </label>
                <p className="text-xs text-gray-500">View historical weather data</p>
              </div>
            </div>
            <div className="flex gap-3 w-full sm:w-auto">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="flex-1 sm:flex-none px-4 py-2.5 border-2 border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 font-medium shadow-sm hover:border-blue-300"
              />
              {selectedDate && (
                <button
                  onClick={clearDateFilter}
                  className="px-5 py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden mb-6 relative">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="p-8 md:p-12 text-white relative z-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl md:text-5xl font-bold">{safeValue(weather.city, 'Unknown City')}</h1>
                </div>
                <p className="text-blue-100 text-lg mb-1">{formatDate(weather.date)}</p>
                <p className="text-blue-100 capitalize mt-1 text-lg font-medium">
                  {currentCondition || 'N/A'}
                </p>
              </div>
              <div className="text-right mt-6 md:mt-0">
                <div className="text-9xl mb-2 animate-bounce-slow">{icon}</div>
                <div className="text-6xl md:text-7xl font-bold drop-shadow-lg">
                  {getTempValue(weather.temp)}°
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                <p className="text-blue-100 text-sm mb-2 font-medium">Feels Like</p>
                <p className="text-3xl font-bold">{getTempValue(weather.feelLikeTemp)}°</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                <p className="text-blue-100 text-sm mb-2 font-medium">Humidity</p>
                <p className="text-3xl font-bold">{safeValue(weather.humidity)}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                <p className="text-blue-100 text-sm mb-2 font-medium">Wind Speed</p>
                <p className="text-3xl font-bold">{safeValue(weather.wind)}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                <p className="text-blue-100 text-sm mb-2 font-medium">UV Index</p>
                <p className="text-3xl font-bold">{safeValue(weather.uv_index)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Weather Details Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">🌡️</span> 
              <span>Weather Details</span>
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-gray-200 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">🌡️</span> Temperature Range
                </span>
                <span className="text-gray-800 font-bold text-lg">
                  {getTempRange(weather.high, weather.low)}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">📊</span> Pressure
                </span>
                <span className="text-gray-800 font-bold flex items-center gap-2">
                  <span className={`text-xl ${arrowClass}`}>{arrow}</span>
                  {safeValue(pressureValue, 'N/A')}
                </span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-gray-200 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">👁️</span> Visibility
                </span>
                <span className="text-gray-800 font-bold">{safeValue(weather.VisibilityValue)}</span>
              </div>
              <div className="flex justify-between items-center py-4 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-semibold flex items-center gap-2">
                  <span className="text-lg">💧</span> Dew Point
                </span>
                <span className="text-gray-800 font-bold">{safeValue(weather.dewPoint)}</span>
              </div>
            </div>
          </div>

          {/* Air Quality Card */}
          <div className={`${airQualityBg} border-2 ${airQualityBorder} rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300`}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl">💨</span> 
              <span>Air Quality Index</span>
            </h2>
            <div className="text-center">
              <div
                className={`w-36 h-36 ${airQualityColor} rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl hover:scale-110 transition-transform duration-300`}
              >
                <p className="text-white font-bold text-5xl">{airQualityNumber || 'N/A'}</p>
              </div>
              <p className="text-gray-800 font-bold text-xl mb-2">
                {safeValue(weather.airQualityText)}
              </p>
              <p className="text-gray-600 text-sm">{safeValue(weather.airQualityDescription)}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              <span className="text-2xl">🌅</span> Sun & Moon
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌅</span> Sunrise
                </span>
                <span className="text-gray-800 font-semibold">{safeValue(weather.sunrise)}</span>
              </div>
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌇</span> Sunset
                </span>
                <span className="text-gray-800 font-semibold">{safeValue(weather.sunset)}</span>
              </div>
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌙</span> Moon Phase
                </span>
                <span className="text-gray-800 font-semibold">{safeValue(weather.moonPhase)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/30 p-6 hover:shadow-2xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-3">
              Location Info
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌐</span> Latitude
                </span>
                <span className="text-gray-800 font-semibold">{safeValue(weather.latitude)}</span>
              </div>
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌐</span> Longitude
                </span>
                <span className="text-gray-800 font-semibold">{safeValue(weather.longitude)}</span>
              </div>
              <div className="flex justify-between items-center py-3 hover:bg-gray-50 rounded-lg px-2 -mx-2 transition-colors">
                <span className="text-gray-600 font-medium flex items-center gap-2">
                  <span>🌍</span> Country
                </span>
                <span className="text-gray-800 font-semibold capitalize">{safeValue(weather.country)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Last Year Comparison */}
        {lastYearWeather && !selectedDate && (
          <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16"></div>
            
            <div className="p-8 text-white relative z-10">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="text-3xl">📊</span> Last Year Comparison
              </h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                  <p className="text-purple-100 text-sm mb-2 font-medium">Date</p>
                  <p className="text-xl font-bold">{formatDate(lastYearWeather.date)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                  <p className="text-purple-100 text-sm mb-2 font-medium">Temperature</p>
                  <p className="text-xl font-bold">{safeValue(lastYearWeather.temp)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                  <p className="text-purple-100 text-sm mb-2 font-medium">Condition</p>
                  <p className="text-xl font-bold capitalize">{safeValue(lastYearWeather.currentCondition)}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-200 shadow-lg">
                  <p className="text-purple-100 text-sm mb-2 font-medium">Humidity</p>
                  <p className="text-xl font-bold">{safeValue(lastYearWeather.humidity)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
