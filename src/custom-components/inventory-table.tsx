"use client"

import { useState } from "react"
import type { InventoryItem } from "../types/inventory"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown, Trash2, TriangleAlert } from "lucide-react"
import { Input } from "@/components/ui/input"

interface InventoryTableProps {
  items: InventoryItem[]
  onEdit: (item: InventoryItem) => void
  onDelete: (id: string) => void
}

export function InventoryTable({ items, onEdit, onDelete }: InventoryTableProps) {
  const [sortColumn, setSortColumn] = useState<keyof InventoryItem>("name")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [filter, setFilter] = useState("");

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1
    return 0
  })

  const filteredItems = sortedItems.filter(
    (item) =>
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase()),
  )

  const handleSort = (column: keyof InventoryItem) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortOrder("asc")
    }
  }

  return (
    <div>
      <Input
        placeholder="Filter items..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="max-w-sm mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            {["name", "category", "quantity"].map((column) => (
              <TableHead key={column}>
                <Button variant="ghost" onClick={() => handleSort(column as keyof InventoryItem)}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id} className={`group ${item.quantity < 10 ? "bg-red-100" : ""}`}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell className="flex items-center">
                {item.quantity}
                {item.quantity < 10 && (
                    <TriangleAlert className="ml-2 h-4 w-4 text-red-600" />
                )}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onDelete(item.id)} className="text-red-600">
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
               
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

