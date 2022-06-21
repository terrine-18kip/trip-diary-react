export type User = {
  id: number
  name: string
  email: string
  created_at: string | null
  updated_at: string | null
  trips?: Trip[]
}

export type Trip = {
  id: number
  uniqid: string
  title: string
  start_date: string | null
  end_date: string | null
  memo: string | null
  thumb: string | null
  privacy_id: number
  created_at: string | null
  updated_at: string | null
  users?: User[]
  plans?: Plan[]
}

export type Plan = {
  id: number
  daily: number
  trip_id: number
  created_at: string | null
  updated_at: string | null
  spots?: Spot[]
}

export type Spot = {
  id: number
  plan_id: number
  start_time: string | null
  end_time: string | null
  category_id: number
  name: string
  fee: number | null
  link: string | null
  memo: string | null
  order: number
  created_at: string | null
  updated_at: string | null
}

export type InputTrip = {
  id?: number
  title?: string
  start_date?: string | null
  end_date?: string | null
  memo?: string | null
  thumb?: string | null
  privacy_id?: number
}

export type InputSpot = {
  id?: number
  plan_id?: number
  start_time?: string | null
  end_time?: string | null
  category_id?: number
  name?: string
  fee?: number | null
  link?: string | null
  memo?: string | null
  order?: number
  created_at?: string | null
  updated_at?: string | null
}
