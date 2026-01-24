import { Group } from "@mantine/core"
import type { Attendee, Item } from "../types/types.ts"
import { ItemNameAndIcon } from "./item.tsx"
import { CharacterNameClassSpec } from "./class.tsx"

export const SrList = (
  { attendees, items }: { attendees: Attendee[]; items: Item[] },
) => {
  return (
    <>
      {attendees.map((attendee) =>
        attendee.softReserves.map((res) => (
          <Group>
            <CharacterNameClassSpec character={attendee.character} />
            <ItemNameAndIcon
              item={items.filter((item) => item.id == res.itemId)[0]}
            />
          </Group>
        ))
      )}
    </>
  )
}
