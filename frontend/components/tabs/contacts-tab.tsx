"use client";

import type React from "react";

import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContactDetails } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { appClient } from "@/lib/client.ts/appClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const handleSaveAll = async (contacts: ContactDetails[]) => {
  console.log("Saving all contacts:", contacts);
  const response = await appClient.updateUserContacts(contacts);
};

export default function ContactsTab({
  userContacts,
}: {
  userContacts: ContactDetails[];
}) {
  const queryClient = useQueryClient();
  const [contacts, setContacts] = useState<ContactDetails[]>(userContacts);

  const [newContact, setNewContact] = useState<ContactDetails>({
    id: 0,
    link: "",
    linkType: "GITHUB",
  });

  const handleAddContact = () => {
    if (!newContact.link) return;
    setContacts([...contacts, newContact]);
    setNewContact({ id: 0, link: "", linkType: "GITHUB" });
  };

  const handleDeleteContact = (idx: number) => {
    setContacts(contacts.filter((_, i) => i !== idx));
  };

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, link: e.target.value });
  };

  const handleNewContactTypeChange = (value: string) => {
    setNewContact({
      ...newContact,
      linkType: value as ContactDetails["linkType"],
    });
  };

  const handleContactChange = (idx: number, value: string) => {
    const updatedContacts = contacts.map((c, i) =>
      i === idx ? { ...c, link: value } : c
    );
    setContacts(updatedContacts);
  };

  const handleContactTypeChange = (idx: number, value: string) => {
    const updatedContacts = contacts.map((c, i) =>
      i === idx ? { ...c, linkType: value as ContactDetails["linkType"] } : c
    );
    setContacts(updatedContacts);
  };

  const mutation = useMutation({
    mutationFn: async (contacts: ContactDetails[]) => {
      await handleSaveAll(contacts);
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
    mutation.mutate(contacts);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Contacts</h2>
        <p className="text-gray-400">
          Add links to your website, blog, or social media profiles.
        </p>
      </div>

      <div className="space-y-4">
        {contacts &&
          contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  value={contact.link}
                  onChange={(e) => handleContactChange(idx, e.target.value)}
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <Select
                value={contact.linkType}
                onValueChange={(value) => handleContactTypeChange(idx, value)}
              >
                <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GITHUB">GitHub</SelectItem>
                  <SelectItem value="YOUTUBE">YouTube</SelectItem>
                  <SelectItem value="X">X</SelectItem>
                  <SelectItem value="MAIL">Mail</SelectItem>
                  <SelectItem value="LINKEDLN">LinkedIn</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteContact(idx)}
                className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

        <div className="flex items-center gap-3 pt-2">
          <div className="flex-1">
            <Input
              placeholder="Enter URL"
              value={newContact.link}
              onChange={handleNewContactChange}
              className="bg-gray-900 border-gray-700"
            />
          </div>
          <Select
            value={newContact.linkType}
            onValueChange={handleNewContactTypeChange}
          >
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GITHUB">GitHub</SelectItem>
              <SelectItem value="YOUTUBE">YouTube</SelectItem>
              <SelectItem value="X">X</SelectItem>
              <SelectItem value="MAIL">Mail</SelectItem>
              <SelectItem value="LINKEDLN">LinkedIn</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={handleAddContact}
            className="text-green-500 hover:text-green-400 hover:bg-green-500/10 border-green-500/50"
          >
            <PlusCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button onClick={handleSubmit} className="ml-auto">
        Save all contacts
      </Button>
    </div>
  );
}
