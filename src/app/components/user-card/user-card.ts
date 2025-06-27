import { Component, Input, OnInit, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WeatherService } from '../../services/weather';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './user-card.html',
  styleUrl: './user-card.css',
})
export class UserCard implements OnInit {
  @Input() user!: any;

  weather = signal<any | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    const coords = this.user.location?.coordinates;
    if (coords) {
      const lat = parseFloat(coords.latitude);
      const lon = parseFloat(coords.longitude);
      this.fetchWeather(lat, lon);
    } else {
      this.error.set('No location data available');
      this.loading.set(false);
    };
  };

  fetchWeather(lat: number, lon: number) {
    this.loading.set(true);
    this.error.set(null);
    this.weatherService.getWeather(lat, lon).subscribe({
      next: (data) => {
        if (data.current_weather) {
          this.weather.set({
            temperature: data.current_weather.temperature,
            weathercode: data.current_weather.weathercode,
            temperature_min: data.daily.temperature_2m_min[0],
            temperature_max: data.daily.temperature_2m_max[0],
            unit: '°C',
          });
          this.loading.set(false);
        } else {
          this.error.set('Weather data not available');
          this.loading.set(false);
        }
      },
      error: () => {
        this.error.set('Failed to load weather');
        this.loading.set(false);
      },
    });
  };

  getFullAddress(): string {
    const { street, city, state, country, postcode } = this.user.location;
    return `${street.number} ${street.name}, ${city}, ${state}, ${postcode}, ${country}`;
  };

  getWeatherIcons(): { text: string, emoji: string } | null {
    return this.weather() ? this.weatherService.getWeatherIcons(this.weather().weathercode) : null;
  };

  onImageError(event: any): void {
    event.target.onerror = null;
    event.target.src = "https://placehold.co/128x128/aabbcc/ffffff?text=User";
    this.loading.set(false);
  };
}
