import { v4 as uuidv4 } from "uuid"

export type CostPerUnitDetail = {
  manufacturing?: { labour: number; material: number }
}

export type Item = {
  id: string
  code: string
  description: string
  is_active: number
}

export type Inventory = {
  lot_id: string
  item_id: string
  container_id: string | null
  quantity: number
  last_updated: string
  external_lot_code: string | null
  cost_per_unit: number
  cost_per_unit_detail: CostPerUnitDetail | null
}

export type Container = {
  id: string
  location_id: string
}

export type Location = {
  id: string
  name: string
}

export type InventoryWithDetails = {
  inventory: Inventory
  item: Item
  container: Container | null
  location: Location
}

// Mock data with realistic formats
export const mockLocations: Location[] = [
  // HRN warehouse locations
  { id: uuidv4(), name: "HRN01-01-01-00" },
  { id: uuidv4(), name: "HRN01-01-02-00" },
  { id: uuidv4(), name: "HRN01-02-01-00" },
  { id: uuidv4(), name: "HRN01-02-02-00" },
  { id: uuidv4(), name: "HRN02-01-01-00" },
  { id: uuidv4(), name: "HRN02-01-02-00" },

  // LVST warehouse locations
  { id: uuidv4(), name: "LVST-01-01-00" },
  { id: uuidv4(), name: "LVST-01-02-00" },
  { id: uuidv4(), name: "LVST-02-01-00" },
  { id: uuidv4(), name: "LVST-02-02-00" },
  { id: uuidv4(), name: "LVST-03-01-00" },

  // WLMR warehouse locations
  { id: uuidv4(), name: "WLMR-01-01-00" },
  { id: uuidv4(), name: "WLMR-01-02-00" },
  { id: uuidv4(), name: "WLMR-02-01-00" },
  { id: uuidv4(), name: "WLMR-02-02-00" },

  // MCKE warehouse locations
  { id: uuidv4(), name: "MCKE-01-01-00" },
  { id: uuidv4(), name: "MCKE-01-02-00" },
  { id: uuidv4(), name: "MCKE-02-01-00" },
  { id: uuidv4(), name: "MCKE-02-02-00" },
  { id: uuidv4(), name: "MCKE-03-01-00" },
]

export const mockItems: Item[] = [
  // KYS - Pre-cut commonly keyed-alike keys
  { id: uuidv4(), code: "PSV-KYS-001-001", description: "5-Pin Schlage Key Blank Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-KYS-001-002", description: "5-Pin Schlage Key Blank Set (Nickel)", is_active: 1 },
  { id: uuidv4(), code: "PSV-KYS-002-001", description: "6-Pin Kwikset Key Blank Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-KYS-003-001", description: "Master Key System Blanks", is_active: 1 },
  { id: uuidv4(), code: "PSV-KYS-004-001", description: "Automotive Key Blanks - Ford", is_active: 1 },
  { id: uuidv4(), code: "PSV-KYS-004-002", description: "Automotive Key Blanks - GM", is_active: 1 },

  // MRC - Merchandise
  { id: uuidv4(), code: "PSV-MRC-001-001", description: "Black Logo T-Shirt (Medium)", is_active: 1 },
  { id: uuidv4(), code: "PSV-MRC-001-002", description: "Black Logo T-Shirt (Large)", is_active: 1 },
  { id: uuidv4(), code: "PSV-MRC-001-003", description: "Black Logo T-Shirt (XL)", is_active: 1 },
  { id: uuidv4(), code: "PSV-MRC-002-001", description: "Embroidered Patch - Classic Logo", is_active: 1 },
  { id: uuidv4(), code: "PSV-MRC-003-001", description: "Hoodie - Gray (Large)", is_active: 1 },
  { id: uuidv4(), code: "PSV-MRC-004-001", description: "Sticker Pack - Assorted", is_active: 1 },

  // BYP - Bypass tools
  { id: uuidv4(), code: "PSV-BYP-001-001", description: "Standard Lock Pick Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-BYP-002-001", description: "Tension Wrench Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-BYP-003-001", description: "Bump Key Set - Residential", is_active: 1 },
  { id: uuidv4(), code: "PSV-BYP-004-001", description: "Rake Pick Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-BYP-005-001", description: "Decoder Tools", is_active: 1 },

  // CVI - Covert Instruments items
  { id: uuidv4(), code: "PSV-CVI-001-001", description: "Professional Lock Pick Gun", is_active: 1 },
  { id: uuidv4(), code: "PSV-CVI-002-001", description: "Electronic Pick Gun", is_active: 1 },
  { id: uuidv4(), code: "PSV-CVI-003-001", description: "Specialized Bypass Tool Kit", is_active: 1 },
  { id: uuidv4(), code: "PSV-CVI-004-001", description: "Advanced Decoder Set", is_active: 1 },

  // RFID - RFID research tools and fobs/cards
  { id: uuidv4(), code: "PSV-RFID-001-001", description: "Proxmark3 RFID Research Tool", is_active: 1 },
  { id: uuidv4(), code: "PSV-RFID-002-001", description: "125kHz RFID Fob Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-RFID-002-002", description: "13.56MHz RFID Card Set", is_active: 1 },
  { id: uuidv4(), code: "PSV-RFID-003-001", description: "RFID Cloner Device", is_active: 1 },
  { id: uuidv4(), code: "PSV-RFID-004-001", description: "NFC Research Kit", is_active: 1 },
  { id: uuidv4(), code: "PSV-RFID-005-001", description: "Blank RFID Cards (50-pack)", is_active: 1 },

  // MSC - Miscellaneous items
  { id: uuidv4(), code: "PSV-MSC-001-001", description: "Metal Key Ring Set (25-pack)", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-002-001", description: "Canvas Tool Bag - Small", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-002-002", description: "Canvas Tool Bag - Large", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-003-001", description: "Reusable Shopping Bag", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-004-001", description: "LED Keychain Flashlight", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-005-001", description: "Practice Lock - Transparent", is_active: 1 },
  { id: uuidv4(), code: "PSV-MSC-006-001", description: "Lock Lubricant Spray", is_active: 1 },
]

export const mockContainers: Container[] = mockLocations.map((location) => ({
  id: uuidv4(),
  location_id: location.id,
}))

export const mockInventoryData: InventoryWithDetails[] = Array.from({ length: 50 }, (_, index) => {
  const item = mockItems[index % mockItems.length]!
  const location = mockLocations[index % mockLocations.length]!
  const container = mockContainers.find((c) => c.location_id === location?.id) || null

  return {
    inventory: {
      lot_id: uuidv4(),
      item_id: item.id,
      container_id: container?.id || null,
      quantity: Math.floor(Math.random() * 1000) + 50,
      last_updated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      external_lot_code: Math.random() > 0.5 ? `EXT-${Math.floor(Math.random() * 10000)}` : null,
      cost_per_unit: Math.round((Math.random() * 50 + 5) * 100) / 100,
      cost_per_unit_detail:
        Math.random() > 0.7
          ? {
              manufacturing: {
                labour: Math.round(Math.random() * 20 * 100) / 100,
                material: Math.round(Math.random() * 30 * 100) / 100,
              },
            }
          : null,
    },
    item,
    container,
    location,
  }
})
