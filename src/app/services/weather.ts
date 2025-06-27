import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private weatherApiUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) { };

  getWeather(latitude: number, longitude: number): Observable<any> {
    const params = `latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    return this.http.get(`${this.weatherApiUrl}?${params}`)
  };

  getWeatherIcons(weatherCode: number): { text: string, emoji: string } {
    switch (weatherCode) {
      case 0: return { text: 'Clear Sky', emoji: '☀️' };
      case 1: return { text: 'Mainly Clear', emoji: '🌤️' };
      case 2: return { text: 'Partly Cloudy', emoji: '⛅' };
      case 3: return { text: 'Overcast', emoji: '☁️' };
      case 45: return { text: 'Fog', emoji: '🌫️' };
      case 48: return { text: 'Depositing Fog', emoji: '🌫️' };
      case 51: return { text: 'Drizzle (Light)', emoji: '🌧️' };
      case 53: return { text: 'Drizzle (Moderate)', emoji: '🌧️' };
      case 55: return { text: 'Drizzle (Dense)', emoji: '🌧️' };
      case 56: return { text: 'Freezing Drizzle (Light)', emoji: '🥶🌧️' };
      case 57: return { text: 'Freezing Drizzle (Dense)', emoji: '🥶🌧️' };
      case 61: return { text: 'Rain (Slight)', emoji: '🌦️' };
      case 63: return { text: 'Rain (Moderate)', emoji: '☔' };
      case 65: return { text: 'Rain (Heavy)', emoji: '⛈️' };
      case 66: return { text: 'Freezing Rain (Light)', emoji: '🥶☔' };
      case 67: return { text: 'Freezing Rain (Heavy)', emoji: '🥶☔' };
      case 71: return { text: 'Snow Fall (Slight)', emoji: '🌨️' };
      case 73: return { text: 'Snow Fall (Moderate)', emoji: '🌨️' };
      case 75: return { text: 'Snow Fall (Heavy)', emoji: '🌨️' };
      case 77: return { text: 'Snow Grains', emoji: '❄️' };
      case 80: return { text: 'Rain Showers (Slight)', emoji: '🌧️' };
      case 81: return { text: 'Rain Showers (Moderate)', emoji: '🌧️' };
      case 82: return { text: 'Rain Showers (Violent)', emoji: '🌧️' };
      case 85: return { text: 'Snow Showers (Slight)', emoji: '🌨️' };
      case 86: return { text: 'Snow Showers (Heavy)', emoji: '🌨️' };
      case 95: return { text: 'Thunderstorm (Slight/Moderate)', emoji: '🌩️' };
      case 96: return { text: 'Thunderstorm with Hail (Slight)', emoji: '⛈️' };
      case 99: return { text: 'Thunderstorm with Hail (Heavy)', emoji: '⛈️' };
      default: return { text: 'Unknown', emoji: '❓' };
    }
  }
}
