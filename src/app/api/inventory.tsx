import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { containers, inventory } from "~/server/db/schema";

export function moveInventoryContainer(containerId: string, toLocationId: string){
    // TODO: Log
    db.update(containers).set({location_id: toLocationId}).where(eq(containers.id, containerId))
}

export function moveInventoryLot(lotId: string, toContainerId: string){
    // TODO: Log
    db.update(inventory).set({container_id: toContainerId}).where(eq(inventory.lot_id, lotId))
}

export async function findLotsByContainer(container_id: string) : Promise<{ lot_id: string; }[]> {
    return await db.select({lot_id: inventory.lot_id}).from(inventory).where(eq(inventory.container_id, container_id))
}