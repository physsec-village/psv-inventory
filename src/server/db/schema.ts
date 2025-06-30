import { pgTable, text, integer, real, jsonb } from "drizzle-orm/pg-core"
import { v4 as uuidv4 } from "uuid"

export type cost_per_unit_detail = {
    manufacturing?: {
        labour: number,
        material: number,
    },
}

export const items = pgTable("items", {
    id: text("id").primaryKey().$default(uuidv4),
    code: text("code").notNull(),
    description: text("description").notNull(),
    is_active: integer("is_active").notNull().default(1),
});

export const inventory = pgTable("inventory", {
    lot_id: text("lot_id").primaryKey().$default(uuidv4),
    item_id: text("item_id").notNull().references(() => items.id, {}),
    container_id: text("container_id").references(() => containers.id, {}),
    quantity: real("quantity").notNull(),
    last_updated: text("last_updated").notNull().$defaultFn(() => new Date().toISOString()),
    external_lot_code: text("external_lot_code"),
    cost_per_unit: real("cost_per_unit").notNull(),
    cost_per_unit_detail: jsonb("cost_per_unit_detail").$type<cost_per_unit_detail>()
});

export const containers = pgTable("containers", {
    id: text("id").primaryKey().$default(uuidv4),
    location_id: text("location_id").notNull().references(() => locations.id, {})
})

export const locations = pgTable("locations", {
    id: text("id").primaryKey().$default(uuidv4),
    name: text("name").notNull()
})