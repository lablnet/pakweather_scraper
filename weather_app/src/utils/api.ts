// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-lambda-url.execute-api.us-east-1.amazonaws.com/prod';

export interface WeatherData {
  date: string;
  country: string;
  latitude: string;
  longitude: string;
  city: string;
  currentCondition: string;
  temp: string;
  feelLikeTemp: string;
  wind: string;
  'Wind Directin': string;
  uv_index: string;
  VisibilityValue: string;
  pressure: string;
  humidity: string;
  dewPoint: string;
  moonPhase: string;
  high: string;
  low: string;
  sunset: string;
  sunrise: string;
  airQualityNumber: string;
  airQualityText: string;
  airQualityDescription: string;
}

export interface Location {
  name: string;
  lat: string;
  lng: string;
}

export interface TodayWeatherResponse {
  today: WeatherData | null;
  lastYear: WeatherData | null;
  latitude: string;
  longitude: string;
}

export interface PastWeatherResponse {
  data: WeatherData[];
  count: number;
  latitude: string;
  longitude: string;
  date: string;
}

export interface YearlyWeatherResponse {
  year: number;
  latitude: string;
  longitude: string;
  totalRecords: number;
  monthlySummary: {
    month: number;
    recordCount: number;
    averageTemp: string | null;
    sampleDate: string;
  }[];
}

/**
 * Fetch today's weather for a location
 */
export const fetchTodayWeather = async (latitude: string, longitude: string): Promise<TodayWeatherResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/today?latitude=${latitude}&longitude=${longitude}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching today weather:', error);
    throw error;
  }
};

/**
 * Fetch list of available locations
 */
export const fetchLocations = async (): Promise<Location[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/weather/locations`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching locations:', error);
    throw error;
  }
};

/**
 * Fetch past weather data
 */
export const fetchPastWeather = async (
  latitude: string,
  longitude: string,
  date: string | null = null
): Promise<PastWeatherResponse> => {
  try {
    let url = `${API_BASE_URL}/weather/past?latitude=${latitude}&longitude=${longitude}`;
    if (date) {
      url += `&date=${date}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching past weather:', error);
    throw error;
  }
};

/**
 * Fetch yearly weather summary
 */
export const fetchYearlyWeather = async (
  latitude: string,
  longitude: string,
  year: number | null = null
): Promise<YearlyWeatherResponse> => {
  try {
    let url = `${API_BASE_URL}/weather/past/year?latitude=${latitude}&longitude=${longitude}`;
    if (year) {
      url += `&year=${year}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching yearly weather:', error);
    throw error;
  }
};

