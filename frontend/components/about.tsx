"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const techStack = {
  frontend: [
    { name: "React", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Next.js", icon: "/placeholder.svg?height=60&width=60" },
    { name: "TypeScript", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Tailwind CSS", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Framer Motion", icon: "/placeholder.svg?height=60&width=60" },
  ],
  backend: [
    { name: "Node.js", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Express", icon: "/placeholder.svg?height=60&width=60" },
    { name: "MongoDB", icon: "/placeholder.svg?height=60&width=60" },
    { name: "PostgreSQL", icon: "/placeholder.svg?height=60&width=60" },
    { name: "GraphQL", icon: "/placeholder.svg?height=60&width=60" },
  ],
  tools: [
    { name: "Git", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Docker", icon: "/placeholder.svg?height=60&width=60" },
    { name: "VS Code", icon: "/placeholder.svg?height=60&width=60" },
    { name: "Figma", icon: "/placeholder.svg?height=60&width=60" },
    { name: "AWS", icon: "/placeholder.svg?height=60&width=60" },
  ],
}

export default function About() {
  return (
    <div className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get to know me and the technologies I work with.
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
                src="/placeholder.svg?height=500&width=500"
                alt="Profile"
                width={500}
                height={500}
                className="relative rounded-lg object-cover"
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
            <h3 className="text-2xl font-bold">Hi there! I'm John Doe</h3>
            <p className="text-muted-foreground">
              I'm a passionate full-stack developer with over 5 years of experience building web applications. I
              specialize in creating responsive, accessible, and performant web experiences using modern technologies.
            </p>
            <p className="text-muted-foreground">
              My journey in web development started when I built my first website at the age of 16. Since then, I've
              worked with various startups and established companies to bring their ideas to life.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you can find me hiking, reading sci-fi novels, or experimenting with new recipes in
              the kitchen.
            </p>
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

          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="frontend">Frontend</TabsTrigger>
              <TabsTrigger value="backend">Backend</TabsTrigger>
              <TabsTrigger value="tools">Tools</TabsTrigger>
            </TabsList>

            {Object.entries(techStack).map(([category, technologies]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {technologies.map((tech, index) => (
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
                          <span className="font-medium text-center">{tech.name}</span>
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
  )
}

