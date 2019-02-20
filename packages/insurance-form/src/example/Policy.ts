export type Policy = {
  id: number
  drivers: Driver[]
  vehicles: Vehicle[]
  premiums: Premium[]
}

export type Driver = {
  name: string
  age: number
  addresses: Address[]
}

export type Address = {
  street: string
  city: string
  state: State
}

// Enums allow us to define a set of NAMED constants
export enum State {
  AL = "Alabama",
  AK = "Alaska",
  AS = "American Samoa",
  AZ = "Arizona",
  AR = "Arkansas",
  CA = "California",
  CO = "Colorado",
}

export type Premium = {
  price: string
}

export type Vehicle = {
  color: 'string'
  make: 'string'
  model: 'string'
}
