import { useEffect } from "react"
import { useForm } from "react-hook-form"
import type { InventoryItem } from "../types/inventory"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface InventoryDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Omit<InventoryItem, "id"> & { id?: string }) => void
  initialData?: InventoryItem | null
}

export function InventoryDialog({ isOpen, onClose, onSubmit, initialData }: InventoryDialogProps) {
  const { register, handleSubmit, reset } = useForm<Omit<InventoryItem, "id"> & { id?: string }>()

  useEffect(() => {
    if (isOpen) {
      reset(initialData || { name: "", category: "", quantity: 0 })
    }
  }, [isOpen, initialData, reset])

  const onSubmitForm = (data: Omit<InventoryItem, "id"> & { id?: string }) => {
    onSubmit(initialData ? { ...data, id: initialData.id } : data)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Item" : "Add New Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" className="col-span-3" {...register("name", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input id="category" className="col-span-3" {...register("category", { required: true })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                className="col-span-3"
                {...register("quantity", { required: true, min: 0, valueAsNumber: true })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{initialData ? "Update" : "Add"} Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

