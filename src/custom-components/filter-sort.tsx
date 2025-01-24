import type { SortOrder } from "../types/inventory"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterSortProps {
  filter: string
  setFilter: (filter: string) => void
  sortOrder: SortOrder
  setSortOrder: (order: SortOrder) => void
}

export function FilterSort({ filter, setFilter, sortOrder, setSortOrder }: FilterSortProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="filter">Filter by Category</Label>
        <Input id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Enter category..." />
      </div>
      <div>
        <Label htmlFor="sort">Sort by Quantity</Label>
        <Select value={sortOrder} onValueChange={(value: SortOrder) => setSortOrder(value)}>
          <SelectTrigger id="sort">
            <SelectValue placeholder="Sort order" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

