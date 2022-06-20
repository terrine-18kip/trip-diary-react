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
  id?: number
  plan_id?: number
  start_time?: string
  end_time?: string
  category_id?: number
  name?: string
  fee?: number
  link?: string
  memo?: string
  order: number
  created_at: string | null
  updated_at: string | null
}
