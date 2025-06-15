"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4 justify-center h-screen">
      <div className="flex flex-col gap-2 px-auto mx-auto py-auto">
        <CardDemo />
      </div>
    </div>
  );
}

function CardDemo() {
  const [username, setUsername] = useState("");
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Find Out Peoples</CardTitle>
        <CardDescription>
          Enter username below to find out peoples
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Link
          href={`/user/${username}`}
          className={buttonVariants({
            variant: `secondary`,
            className: `w-full`,
          })}
        >
          Find Out
        </Link>
      </CardFooter>
    </Card>
  );
}
