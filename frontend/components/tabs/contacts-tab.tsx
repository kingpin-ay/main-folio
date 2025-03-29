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

interface ContactDetail {
  id: string;
  link: string;
  link_type: string;
}

export default function ContactsTab() {
  const [contacts, setContacts] = useState<ContactDetail[]>([
    { id: "1", link: "https://github.com/johndoe", link_type: "github" },
    { id: "2", link: "https://twitter.com/johndoe", link_type: "twitter" },
    { id: "3", link: "https://linkedin.com/in/johndoe", link_type: "linkedin" },
  ]);

  const [newContact, setNewContact] = useState<Omit<ContactDetail, "id">>({
    link: "",
    link_type: "website",
  });

  const handleAddContact = () => {
    if (!newContact.link) return;

    const id = Math.random().toString(36).substring(2, 9);
    setContacts([...contacts, { ...newContact, id }]);
    setNewContact({ link: "", link_type: "website" });
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const handleNewContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewContact({ ...newContact, link: e.target.value });
  };

  const handleNewContactTypeChange = (value: string) => {
    setNewContact({ ...newContact, link_type: value });
  };

  const handleSaveAll = () => {
    console.log("Saving all contacts:", contacts);
    // Implement API call to save all contacts
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
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center gap-3">
            <div className="flex-1">
              <Input
                value={contact.link}
                onChange={(e) => {
                  const updatedContacts = contacts.map((c) =>
                    c.id === contact.id ? { ...c, link: e.target.value } : c
                  );
                  setContacts(updatedContacts);
                }}
                className="bg-gray-900 border-gray-700"
              />
            </div>
            <Select
              value={contact.link_type}
              onValueChange={(value) => {
                const updatedContacts = contacts.map((c) =>
                  c.id === contact.id ? { ...c, link_type: value } : c
                );
                setContacts(updatedContacts);
              }}
            >
              <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="website">Website</SelectItem>
                <SelectItem value="github">GitHub</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteContact(contact.id)}
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
            value={newContact.link_type}
            onValueChange={handleNewContactTypeChange}
          >
            <SelectTrigger className="w-[180px] bg-gray-900 border-gray-700">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="website">Website</SelectItem>
              <SelectItem value="github">GitHub</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="other">Other</SelectItem>
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

      <Button onClick={handleSaveAll} className="ml-auto">
        Save all contacts
      </Button>
    </div>
  );
}
