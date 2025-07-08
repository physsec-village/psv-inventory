"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Truck, ArrowRightLeft, Package, ScanLine } from "lucide-react"

enum FormType {
  MOVE_CONTAINERS = 0,
  TRANSFER_ITEMS = 1,
  RECEIVE_SHIPMENT = 2,
}

export function InventoryActions() {
  const [open, setOpen] = useState(false)
  const [formType, setFormType] = useState(FormType.MOVE_CONTAINERS)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formType)
    setOpen(false)
  }

  const handleBarcodeScan = (fieldType: string) => {
    alert(`Barcode scan for ${fieldType} - implement scanner integration here`)
  }

  const getDialogTitle = () => {
    switch (formType) {
      case FormType.MOVE_CONTAINERS:
        return "Move Containers"
      case FormType.TRANSFER_ITEMS:
        return "Transfer Items"
      case FormType.RECEIVE_SHIPMENT:
        return "Receive Shipment"
      default:
        return "Action"
    }
  }

  const getDialogDescription = () => {
    switch (formType) {
      case FormType.MOVE_CONTAINERS:
        return "Move containers from one location to another"
      case FormType.TRANSFER_ITEMS:
        return "Transfer items between containers"
      case FormType.RECEIVE_SHIPMENT:
        return "Receive new shipment and add to inventory"
      default:
        return ""
    }
  }

  const renderForm = () => {
    switch (formType) {
      case FormType.MOVE_CONTAINERS:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="moveFrom">Move From</Label>
              <div className="flex gap-2">
                <Input id="moveFrom" name="moveFrom" placeholder="Enter source location" required className="flex-1" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("source location")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="moveTo">Move To</Label>
              <div className="flex gap-2">
                <Input id="moveTo" name="moveTo" placeholder="Enter destination location" required className="flex-1" />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("destination location")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Move</Button>
            </DialogFooter>
          </form>
        )

      case FormType.TRANSFER_ITEMS:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transferFrom">Transfer Items From</Label>
              <div className="flex gap-2">
                <Input
                  id="transferFrom"
                  name="transferFrom"
                  placeholder="Enter source container"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("source container")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="transferTo">Transfer Items To</Label>
              <div className="flex gap-2">
                <Input
                  id="transferTo"
                  name="transferTo"
                  placeholder="Enter destination container"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("destination container")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="qty">Quantity</Label>
              <Input id="qty" name="qty" type="number" min="1" placeholder="Enter quantity" required />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Transfer</Button>
            </DialogFooter>
          </form>
        )

      case FormType.RECEIVE_SHIPMENT:
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="itemToReceive">Item to Receive</Label>
              <div className="flex gap-2">
                <Input
                  id="itemToReceive"
                  name="itemToReceive"
                  placeholder="Enter item SKU or name"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("item SKU")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="storeInContainer">Store Items In Container</Label>
              <div className="flex gap-2">
                <Input
                  id="storeInContainer"
                  name="storeInContainer"
                  placeholder="Enter container ID"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("container ID")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="placeAtLocation">Place Container At Location</Label>
              <div className="flex gap-2">
                <Input
                  id="placeAtLocation"
                  name="placeAtLocation"
                  placeholder="Enter location code"
                  required
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => handleBarcodeScan("location code")}
                  title="Scan barcode"
                >
                  <ScanLine className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="receiveQty">Quantity</Label>
              <Input id="receiveQty" name="receiveQty" type="number" min="1" placeholder="Enter quantity" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="costPerUnit">Cost per Unit</Label>
              <Input
                id="costPerUnit"
                name="costPerUnit"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter cost per unit"
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Receive</Button>
            </DialogFooter>
          </form>
        )

      default:
        return null
    }
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          onClick={() => {
            setFormType(FormType.MOVE_CONTAINERS)
            setOpen(true)
          }}
        >
          <Truck className="h-4 w-4 mr-2" />
          Move Containers
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setFormType(FormType.TRANSFER_ITEMS)
            setOpen(true)
          }}
        >
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Transfer Items
        </Button>
        <Button
          size="sm"
          onClick={() => {
            setFormType(FormType.RECEIVE_SHIPMENT)
            setOpen(true)
          }}
        >
          <Package className="h-4 w-4 mr-2" />
          Receive Shipment
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>
          {renderForm()}
        </DialogContent>
      </Dialog>
    </>
  )
}
