declare module 'nigeria-geo' {
  declare function all(): State[]
  declare function states(): string[]
  declare function findState(state: string): boolean[]

  interface State {
    state: string
    capital: string
    slogan: string
    senatorial_districts: string[]
    lgas: string[]
    landmass: string
    population: string
    dialect: string
    map: string
    latitude: string
    longitude: string
    website: string
    geo_politcal_zone: string
    created_date: string
    created_by: string
    past_governors: string[]
    borders: string[]
    known_for: string[]
  }
}
