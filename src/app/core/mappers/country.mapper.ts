import { CountryApiResponse } from '../models/country-api.model';
import { Country } from '../models/country.model';

export const mapToCountry = (country: CountryApiResponse): Country => ({
  name: country.name,
  population: country.population,
  region: country.region,
  capital: country.capital,
  flag: country.flags.svg,
  alpha3Code: country.alpha3Code,
});
