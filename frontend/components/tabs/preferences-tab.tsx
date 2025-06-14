"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { StackGroup, StackItem } from "@/lib/types";
import { appClient } from "@/lib/client.ts/appClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

const handleSaveAll = async (stackGroups: StackGroup[]) => {
  console.log("Saving all preferences:", stackGroups);
  const response = appClient.updateUserStackGroups(stackGroups);
  return response;
};

export default function PreferencesTab({
  stackGroupsMain,
}: {
  stackGroupsMain: StackGroup[];
}) {
  const queryClient = useQueryClient();
  const [stackGroups, setStackGroups] = useState<StackGroup[]>(stackGroupsMain);

  const [newGroup, setNewGroup] = useState({
    id: 0,
    name: "",
    description: "",
  });

  const [newItem, setNewItem] = useState<StackItem>({
    id: 0,
    name: "",
    image_link: "",
  });

  const handleAddGroup = () => {
    if (!newGroup.name) return;

    const id = 0;
    setStackGroups([...stackGroups, { ...newGroup, id, items: [] }]);
    setNewGroup({ id: 0, name: "", description: "" });
  };

  const handleDeleteGroup = (id: number) => {
    setStackGroups(stackGroups.filter((group) => group.id !== id));
  };

  const handleAddItem = (index: number) => {
    if (!newItem.name) return;

    const id = 0;
    const updatedGroups = stackGroups.map((group, inx) => {
      if (inx === index) {
        return {
          ...group,
          items: [
            ...group.items,
            { id, name: newItem.name, image_link: newItem.image_link },
          ],
        };
      }
      return group;
    });

    setStackGroups(updatedGroups);
    setNewItem({ id: 0, name: "", image_link: "" });
  };

  const handleDeleteItem = (groupId: number, itemId: number) => {
    const updatedGroups = stackGroups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          items: group.items.filter((item) => item.id !== itemId),
        };
      }
      return group;
    });

    setStackGroups(updatedGroups);
  };

  const mutation = useMutation({
    mutationFn: async (stackGroups: StackGroup[]) => {
      await handleSaveAll(stackGroups);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/get/user/dashboard"] });
      toast({
        title: "Update: successful",
        description: new Date().toLocaleString(),
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(stackGroups);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Preferences</h2>
        <p className="text-gray-400">
          Manage your technology stack and preferences.
        </p>
      </div>

      <div className="space-y-6">
        {stackGroups.map((group, index) => (
          <div
            key={group.id}
            className="space-y-4 border border-gray-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-400">{group.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteGroup(group.id)}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {group.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-gray-700 rounded-md p-2"
                >
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(group.id, item.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 h-full min-h-[40px] border-dashed border-gray-700 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    Add Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-gray-900 border-gray-700">
                  <DialogHeader>
                    <DialogTitle>Add New Item</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor={`item-name-${group.id}`}>Name</Label>
                      <Input
                        id={`item-name-${group.id}`}
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            name: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`item-image-${group.id}`}>
                        Image URL
                      </Label>
                      <Input
                        id={`item-image-${group.id}`}
                        value={newItem.image_link}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            image_link: e.target.value,
                          })
                        }
                        className="bg-gray-800 border-gray-700"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" className="mr-2">
                        Cancel
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => handleAddItem(index)}>
                        Add Item
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 w-full border-dashed"
            >
              <PlusCircle className="h-4 w-4" />
              Add New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle>Add New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="group-name">Name</Label>
                <Input
                  id="group-name"
                  value={newGroup.name}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="group-description">Description</Label>
                <Input
                  id="group-description"
                  value={newGroup.description}
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddGroup}>Add Group</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Button onClick={handleSubmit} className="ml-auto">
        Save all preferences
      </Button>
    </div>
  );
}
