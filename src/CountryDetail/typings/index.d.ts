declare namespace countryDetail {
  interface CountryModel {
    code: string;
    currency: string;
    emoji: string;
    languages: Languages[];
    name: string;
    native: string;
    phone: string;
    continent: Continent;
  }

  interface Languages {
    code: string;
    name: string;
  }

  interface Continent {
    name: string;
  }
}
