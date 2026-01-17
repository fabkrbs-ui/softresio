export type Character = {
  name: string
  class: string
  spec: string
}

export type SoftReserve = {
  item_id: number
  sr_plus: number
  comment: string | null
}

export type Attendee = {
  character: Character
  soft_reserves: SoftReserve[]
}

export type Sheet = {
  id: string
  sr_plus_enabled: boolean
  time: string // rfc 3339
  attendees: Attendee[]
}

export type Secrets = {
  password_hash: string
  access_token: string // uuidv4
}

export type Raid = {
  sheet: Sheet
  secrets: Secrets
}
