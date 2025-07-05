import { containers, inventory, items, locations } from "~/server/db/schema";

import { ButtonPrimary } from "../components/buttons";

import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { NewInventoryMoveBtnAndForm } from "../components/inventorymove";

export default async function InventoryPage() {
    const result = await db.select().from(inventory)
        .fullJoin(items, eq(items.id, inventory.item_id))
        .fullJoin(containers, eq(containers.id, inventory.container_id))
        .fullJoin(locations, eq(locations.id, containers.location_id))
        .orderBy(locations.name)
    return (
    <main>
        <table>
        <thead>
            <tr>
                <th>Location</th>
                <th>Container</th>
                <th>SKU</th>
                <th>Lot ID</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Cost/unit</th>
            </tr>
        </thead>
            <tbody>
                {result.map((lot)=>(
                    <tr key={lot.inventory?.lot_id}>
                        <td>{lot.locations?.name}</td>
                        <td>{lot.containers?.id}</td>
                        <td>{lot.items?.code}</td>
                        <td>{lot.inventory?.lot_id}</td>
                        <td>{lot.items?.description}</td>
                        <td>{lot.inventory?.quantity}</td>
                        <td>{lot.inventory?.cost_per_unit}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p>
            <NewInventoryMoveBtnAndForm />
        </p>
    </main>
    );
}