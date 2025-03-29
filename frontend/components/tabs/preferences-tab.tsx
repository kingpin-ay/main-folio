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

interface StackItem {
  id: string;
  name: string;
  image_link: string;
}

interface StackGroup {
  id: string;
  name: string;
  description: string;
  items: StackItem[];
}

export default function PreferencesTab() {
  const [stackGroups, setStackGroups] = useState<StackGroup[]>([
    {
      id: "1",
      name: "Frontend",
      description: "Frontend technologies I use",
      items: [
        {
          id: "101",
          name: "Next.js",
          image_link: "https://example.com/nextjs.png",
        },
        {
          id: "102",
          name: "React",
          image_link: "https://example.com/react.png",
        },
        {
          id: "103",
          name: "Tailwind CSS",
          image_link: "https://example.com/tailwind.png",
        },
      ],
    },
    {
      id: "2",
      name: "Backend",
      description: "Backend technologies I use",
      items: [
        {
          id: "201",
          name: "Node.js",
          image_link: "https://example.com/nodejs.png",
        },
        {
          id: "202",
          name: "Express",
          image_link: "https://example.com/express.png",
        },
        {
          id: "203",
          name: "NestJS",
          image_link: "https://example.com/nestjs.png",
        },
      ],
    },
    {
      id: "3",
      name: "DevOps",
      description: "DevOps tools I use",
      items: [
        {
          id: "301",
          name: "Docker",
          image_link: "https://example.com/docker.png",
        },
        { id: "302", name: "Git", image_link: "https://example.com/git.png" },
      ],
    },
  ]);

  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
  });

  const [newItem, setNewItem] = useState({
    groupId: "",
    name: "",
    image_link: "",
  });

  const handleAddGroup = () => {
    if (!newGroup.name) return;

    const id = Math.random().toString(36).substring(2, 9);
    setStackGroups([...stackGroups, { ...newGroup, id, items: [] }]);
    setNewGroup({ name: "", description: "" });
  };

  const handleDeleteGroup = (id: string) => {
    setStackGroups(stackGroups.filter((group) => group.id !== id));
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.groupId) return;

    const id = Math.random().toString(36).substring(2, 9);
    const updatedGroups = stackGroups.map((group) => {
      if (group.id === newItem.groupId) {
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
    setNewItem({ groupId: "", name: "", image_link: "" });
  };

  const handleDeleteItem = (groupId: string, itemId: string) => {
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

  const handleSaveAll = () => {
    console.log("Saving all preferences:", stackGroups);
    // Implement API call to save all preferences
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
        {stackGroups.map((group) => (
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
              {group.items.map((item) => (
                <div
                  key={item.id}
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
                    <input
                      type="hidden"
                      value={group.id}
                      onChange={() => {}}
                      onFocus={() =>
                        setNewItem((prev) => ({ ...prev, groupId: group.id }))
                      }
                    />
                    <div className="space-y-2">
                      <Label htmlFor={`item-name-${group.id}`}>Name</Label>
                      <Input
                        id={`item-name-${group.id}`}
                        value={newItem.groupId === group.id ? newItem.name : ""}
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            groupId: group.id,
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
                        value={
                          newItem.groupId === group.id ? newItem.image_link : ""
                        }
                        onChange={(e) =>
                          setNewItem({
                            ...newItem,
                            groupId: group.id,
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
                      <Button onClick={handleAddItem}>Add Item</Button>
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

      <Button onClick={handleSaveAll} className="ml-auto">
        Save all preferences
      </Button>
    </div>
  );
}
