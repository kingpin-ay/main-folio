"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { splitTextBySentenceAndWordCount } from "@/lib/utils";

export default function About({
  shortDescription,
  description,
  imageLink,
  fullName,
  stackGroups,
}: {
  shortDescription: string;
  description: string;
  imageLink: string;
  fullName: string;
  stackGroups: {
    stackGroupName: string;
    stackItems: {
      name: string;
      icon: string;
    }[];
  }[];
}) {
  return (
    <div className="py-20 bg-muted/50">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {shortDescription}
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative mx-auto lg:mx-0 max-w-md">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary/40 blur-md" />
              <Image
                src={imageLink}
                alt="Profile"
                width={500}
                height={500}
                className="relative rounded-lg object-cover w-[500px] h-[500px]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{`Hi there! I'm ${fullName}`}</h3>
            {splitTextBySentenceAndWordCount(description, 35).map(
              (sentence) => (
                <p className="text-muted-foreground" key={sentence}>
                  {sentence}
                </p>
              )
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Tech Stack</h3>

          <Tabs defaultValue={stackGroups[0].stackGroupName} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {stackGroups.map((stackGroup) => (
                <TabsTrigger
                  key={stackGroup.stackGroupName}
                  value={stackGroup.stackGroupName}
                >
                  {stackGroup.stackGroupName}
                </TabsTrigger>
              ))}
            </TabsList>

            {stackGroups.map((stackGroup) => (
              <TabsContent
                key={stackGroup.stackGroupName}
                value={stackGroup.stackGroupName}
                className="mt-0"
              >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {stackGroup.stackItems.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <Card className="h-full">
                        <CardContent className="flex flex-col items-center justify-center p-6">
                          <Image
                            src={tech.icon || "/placeholder.svg"}
                            alt={tech.name}
                            width={60}
                            height={60}
                            className="mb-4"
                          />
                          <span className="font-medium text-center">
                            {tech.name}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
