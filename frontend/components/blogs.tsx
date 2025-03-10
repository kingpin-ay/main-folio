"use client"

import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const blogs = [
  {
    id: 1,
    title: "Building Responsive UIs with Tailwind CSS",
    description: "Learn how to create beautiful, responsive user interfaces using Tailwind CSS utility classes.",
    image: "/placeholder.svg?height=250&width=500",
    date: "May 15, 2023",
    category: "Web Development",
    readTime: "5 min read",
    url: "#",
  },
  {
    id: 2,
    title: "Getting Started with Next.js 14",
    description: "Explore the new features and improvements in Next.js 14 and how to leverage them in your projects.",
    image: "/placeholder.svg?height=250&width=500",
    date: "June 22, 2023",
    category: "JavaScript",
    readTime: "8 min read",
    url: "#",
  },
  {
    id: 3,
    title: "The Power of Server Components in React",
    description:
      "Discover how React Server Components can improve performance and user experience in your applications.",
    image: "/placeholder.svg?height=250&width=500",
    date: "July 10, 2023",
    category: "React",
    readTime: "6 min read",
    url: "#",
  },
]

export default function Blogs() {
  return (
    <div className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Blog Posts</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and technology.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    width={500}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Badge variant="outline">{blog.category}</Badge>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {blog.date}
                    </div>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter>
                  <Button variant="ghost" className="ml-auto group" asChild>
                    <Link href={blog.url}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" size="lg">
            View All Posts
          </Button>
        </div>
      </div>
    </div>
  )
}

