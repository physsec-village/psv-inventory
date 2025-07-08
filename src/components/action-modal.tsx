"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { type InventoryWithDetails, mockLocations } from "../app/lib/mock-data"

interface ActionModalProps {
  item: InventoryWithDetails
  actionType: "move" | "transfer" | "split"
  onClose: () => void
}

export function ActionModal({ item, actionType, onClose }: ActionModalProps) {
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [newLotId, setNewLotId] = useState<string>("")

  const handleSubmit = () => {
    // Here you would implement the actual action logic
    console.log(`${actionType} action:`, {
      item: item.inventory.lot_id,
      location: selectedLocation,
      quantity: quantity,
      newLotId: newLotId,
    })
    onClose()
  }

  const getTitle = () => {
    switch (actionType) {
      case "move":
        return "Move Inventory"
      case "transfer":
        return "Transfer Inventory"
      case "split":
        return "Split Inventory"
      default:
        return "Action"
    }
  }

  const getDescription = () => {
    switch (actionType) {
      case "move":
        return "Move this inventory to a different location"
      case "transfer":
        return "Transfer this inventory to another container"
      case "split":
        return "Split this inventory into multiple lots"
      default:
        return ""
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 bg-muted/50">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Item:</span>
                <span className="text-sm">{item.item.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current Location:</span>
                <span className="text-sm">{item.location.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm font-medium">Available Quantity:</span>
                <Badge variant="secondary">{item.inventory.quantity}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="location">{actionType === "move" ? "New Location" : "Target Location"}</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {mockLocations
                    .filter((loc) => loc.id !== item.location.id)
                    .map((location) => (
                      <SelectItem key={location.id} value={location.id}>
                        {location.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {(actionType === "transfer" || actionType === "split") && (
              <div className="space-y-2">
                <Label htmlFor="quantity">{actionType === "split" ? "Split Quantity" : "Transfer Quantity"}</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Enter quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  max={item.inventory.quantity}
                />
              </div>
            )}

            {actionType === "split" && (
              <div className="space-y-2">
                <Label htmlFor="newLotId">New Lot ID (optional)</Label>
                <Input
                  id="newLotId"
                  placeholder="Auto-generated if empty"
                  value={newLotId}
                  onChange={(e) => setNewLotId(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedLocation}>
            {actionType === "move" ? "Move" : actionType === "transfer" ? "Transfer" : "Split"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
