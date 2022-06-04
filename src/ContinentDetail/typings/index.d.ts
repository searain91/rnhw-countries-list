declare namespace continentDetail {
  interface CountryModel {
    continent: Continent;
  }

  interface Continent {
    code: string;
    name: string;
    countries: Countries[];
  }

  interface Countries {
    name: string;
  }
}
