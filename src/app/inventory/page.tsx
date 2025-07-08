"use client"

import { useState } from "react"
import { InventoryTable } from "~/components/inventory-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { InventoryActions } from "~/components/inventory-actions"

export default function InventoryPage() {
  const [viewMode, setViewMode] = useState<"lot" | "container">("lot")

  return (
    <main>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Inventory Management</h1>
              <p className="text-muted-foreground">Manage your inventory lots and containers</p>
            </div>
            <InventoryActions />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>View and manage your inventory by lot or container</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as "lot" | "container")}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="lot">By Lot</TabsTrigger>
                  <TabsTrigger value="container">By Container</TabsTrigger>
                </TabsList>
                <TabsContent value="lot" className="mt-6">
                  <InventoryTable viewMode="lot" />
                </TabsContent>
                <TabsContent value="container" className="mt-6">
                  <InventoryTable viewMode="container" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
    </main>
  )
}
