import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchLocations, Location } from '../utils/api';
import Select from '../components/Select';

const Home: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Pakistan Weather';
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await fetchLocations();
      setLocations(data);
      setLoading(false);
    } catch (err) {
      console.error('Error loading locations:', err);
      setError('Failed to load locations');
      setLoading(false);
    }
  };

  const handleCityChange = (selectedValue: string | null) => {
    if (selectedValue) {
      const [city, lat, lng] = selectedValue.split('|');
      const citySlug = city.replace(/\s/g, '-');
      navigate(`/weather/${citySlug}?lat=${lat}&lng=${lng}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6">
            <div className="text-7xl mb-4">🌤️</div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Pakistan Weather
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get real-time weather updates and historical data for cities across Pakistan
          </p>
        </div>

        {/* City Selector Card */}
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-8 mb-8 animate-slide-up relative z-10">
          <div className="max-w-xl mx-auto">
            <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">
              <span className="text-lg">📍 Select Your City</span>
            </label>
            {error ? (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 text-center">
                <p className="text-red-600 font-medium">{error}</p>
              </div>
            ) : (
              <Select
                options={locations}
                onChange={handleCityChange}
                isLoading={loading}
                placeholder="Search or select a city..."
                className="w-full"
              />
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-200">
            <div className="text-3xl mb-3">🌡️</div>
            <h3 className="font-bold text-gray-800 mb-2">Current Weather</h3>
            <p className="text-sm text-gray-600">Real-time temperature and conditions</p>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-200">
            <div className="text-3xl mb-3">📅</div>
            <h3 className="font-bold text-gray-800 mb-2">Historical Data</h3>
            <p className="text-sm text-gray-600">View past weather records</p>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-200">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-800 mb-2">Year Comparison</h3>
            <p className="text-sm text-gray-600">Compare with last year's data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

