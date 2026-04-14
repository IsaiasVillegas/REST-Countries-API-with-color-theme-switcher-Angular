import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryApiResponse } from '../models/country-api.model';
import { Country } from '../models/country.model';
import { mapToCountry } from '../mappers/country.mapper';
import { CountryDetail } from '../models/country-detail.model';
import { mapToCountryDetail } from '../mappers/country-detail.mapper';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private http = inject(HttpClient);

  private readonly API_URL = 'assets/data/countries.json';

  getAll(): Observable<Country[]> {
    return this.http
      .get<CountryApiResponse[]>(this.API_URL)
      .pipe(map((countries) => countries.map(mapToCountry)));
  }

  getDetailByCode(code: string): Observable<CountryDetail | undefined> {
    return this.http.get<CountryApiResponse[]>(this.API_URL).pipe(
      map((countries) => countries.find((c) => c.alpha3Code === code)),

      map((country) => (country ? mapToCountryDetail(country) : undefined)),
    );
  }
}
