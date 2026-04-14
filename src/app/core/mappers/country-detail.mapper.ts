// import CountryDetail from '../../features/countries/pages/country-detail/country-detail';
import { CountryApiResponse } from '../models/country-api.model';
import { CountryDetail } from '../models/country-detail.model';

export const mapToCountryDetail = (country: CountryApiResponse): CountryDetail => ({
  name: country.name,
  nativeName: country.nativeName,
  population: country.population,
  region: country.region,
  subregion: country.subregion,
  capital: country.capital,
  flag: country.flags.svg,
  topLevelDomain: country.topLevelDomain,

  currencies: country.currencies?.map((c) => c.name) ?? [],
  languages: country.languages?.map((l) => l.name) ?? [],
  borders: country.borders ?? [],
});
