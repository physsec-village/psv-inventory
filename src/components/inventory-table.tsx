"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { MoreHorizontal, ArrowUpDown, Move, ArrowRightLeft, Split } from "lucide-react"
import { mockInventoryData, type InventoryWithDetails } from "../app/lib/mock-data"
import { Pagination } from "./pagination"
import { ActionModal } from "./action-modal"

interface InventoryTableProps {
  viewMode: "lot" | "container"
}

export function InventoryTable({ viewMode }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortBy, setSortBy] = useState<string>("location")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [selectedItem, setSelectedItem] = useState<InventoryWithDetails | null>(null)
  const [actionType, setActionType] = useState<"move" | "transfer" | "split" | null>(null)

  const itemsPerPage = 10

  // Sort and paginate data
  const sortedData = [...mockInventoryData].sort((a, b) => {
    let aValue: any, bValue: any

    switch (sortBy) {
      case "location":
        aValue = a.location.name
        bValue = b.location.name
        break
      case "item":
        aValue = a.item.description
        bValue = b.item.description
        break
      case "quantity":
        aValue = a.inventory.quantity
        bValue = b.inventory.quantity
        break
      case "cost":
        aValue = a.inventory.cost_per_unit
        bValue = b.inventory.cost_per_unit
        break
      default:
        aValue = a.location.name
        bValue = b.location.name
    }

    if (typeof aValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return sortOrder === "asc" ? aValue - bValue : bValue - aValue
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const handleRowAction = (item: InventoryWithDetails, action: "move" | "transfer" | "split") => {
    setSelectedItem(item)
    setActionType(action)
  }

  const closeModal = () => {
    setSelectedItem(null)
    setActionType(null)
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("location")} className="h-auto p-0 font-semibold">
                  Location
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              {viewMode === "lot" ? <TableHead>Lot ID</TableHead> : <TableHead>Container ID</TableHead>}
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("item")} className="h-auto p-0 font-semibold">
                  Item
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("quantity")} className="h-auto p-0 font-semibold">
                  Quantity
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("cost")} className="h-auto p-0 font-semibold">
                  Cost/Unit
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>External Lot</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow
                key={item.inventory.lot_id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowAction(item, "move")}
              >
                <TableCell className="font-medium">{item.location.name}</TableCell>
                <TableCell>
                  {viewMode === "lot"
                    ? item.inventory.lot_id.slice(0, 8) + "..."
                    : item.container?.id?.slice(0, 8) + "..." || "N/A"}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{item.item.description}</div>
                    <div className="text-sm text-muted-foreground">{item.item.code}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{item.inventory.quantity.toLocaleString()}</Badge>
                </TableCell>
                <TableCell>${item.inventory.cost_per_unit.toFixed(2)}</TableCell>
                <TableCell>{item.inventory.external_lot_code || "—"}</TableCell>
                <TableCell>{new Date(item.inventory.last_updated).toLocaleDateString()}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowAction(item, "move")
                        }}
                      >
                        <Move className="mr-2 h-4 w-4" />
                        Move
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowAction(item, "transfer")
                        }}
                      >
                        <ArrowRightLeft className="mr-2 h-4 w-4" />
                        Transfer
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRowAction(item, "split")
                        }}
                      >
                        <Split className="mr-2 h-4 w-4" />
                        Split
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={sortedData.length}
        itemsPerPage={itemsPerPage}
      />

      {selectedItem && actionType && <ActionModal item={selectedItem} actionType={actionType} onClose={closeModal} />}
    </div>
  )
}
