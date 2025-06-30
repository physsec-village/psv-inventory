CREATE TABLE "containers" (
	"id" text PRIMARY KEY NOT NULL,
	"location_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inventory" (
	"lot_id" text PRIMARY KEY NOT NULL,
	"item_id" text NOT NULL,
	"container_id" text,
	"quantity" real NOT NULL,
	"last_updated" text NOT NULL,
	"external_lot_code" text,
	"cost_per_unit" real NOT NULL,
	"cost_per_unit_detail" jsonb
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"description" text NOT NULL,
	"is_active" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "containers" ADD CONSTRAINT "containers_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "inventory" ADD CONSTRAINT "inventory_container_id_containers_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."containers"("id") ON DELETE no action ON UPDATE no action;