"use client";

import type { InventoryItem } from "./types/inventory";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { InventoryTable } from "./custom-components/inventory-table";
import { InventoryDialog } from "./custom-components/inventory-dialog";
import { useState } from "react";
import data from './dummy-data.json';

export default function InventoryManagement() {
  const [items, setItems] = useState<InventoryItem[]>(data); 
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);


  const addItem = (item: Omit<InventoryItem, "id">) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([...items, newItem]);
  };

  const updateItem = (updatedItem: InventoryItem) => {
    setItems(
      items.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const openAddDialog = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (item: InventoryItem) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleSubmit = (data: Omit<InventoryItem, "id"> & { id?: string }) => {
    if (data.id) {
      updateItem(data as InventoryItem); // Safe cast
    } else {
      addItem(data);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <Button onClick={openAddDialog}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>
      <InventoryTable
        items={items}
        onEdit={openEditDialog}
        onDelete={deleteItem}
      />
      <InventoryDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingItem}
      />
    </div>
  );
}
