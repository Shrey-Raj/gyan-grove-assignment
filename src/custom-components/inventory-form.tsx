import { useForm } from "react-hook-form"
import type { InventoryItem } from "../types/inventory"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface InventoryFormProps {
  onSubmit: (data: Omit<InventoryItem, "id">) => void
  initialData?: InventoryItem | null
}

export function InventoryForm({ onSubmit, initialData }: InventoryFormProps) {
  const { register, handleSubmit, reset } = useForm<Omit<InventoryItem, "id">>({
    defaultValues: initialData || { name: "", category: "", quantity: 0 },
  })

  const onSubmitForm = (data: Omit<InventoryItem, "id">) => {
    onSubmit(data)
    if (!initialData) {
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name", { required: true })} />
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" {...register("category", { required: true })} />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input id="quantity" type="number" {...register("quantity", { required: true, min: 0 })} />
      </div>
      <Button type="submit">{initialData ? "Update" : "Add"} Item</Button>
    </form>
  )
}

