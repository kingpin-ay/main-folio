"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BlogProps {
  blogs: {
    title: string;
    description: string;
    blogText: string;
    createdTime: Date;
    estimateReadTime: string | null;
    tag: string | null;
  }[];
}

export default function Blogs({ blogs }: BlogProps) {
  return (
    <div className="py-20">
      <div className="container px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
            Blog Posts
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Thoughts, tutorials, and insights on web development and technology.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative overflow-hidden">
                  <Image
                    src={"/main-storage/main_stream_blog.jpeg"}
                    alt={blog.title}
                    width={500}
                    height={250}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-2 flex-wrap flex-1">
                      {blog.tag &&
                        blog.tag
                          .split(",")
                          .slice(0, 2)
                          .map((tag) => (
                            <Badge key={tag} variant="outline">
                              {tag}
                            </Badge>
                          ))}
                    </div>
                    <div className="flex items-center flex-1">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Intl.DateTimeFormat("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(blog.createdTime))}
                    </div>
                    <span>•</span>
                    <span>{blog.estimateReadTime ?? "0"} min</span>
                  </div>
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter>
                  <Button variant="ghost" className="ml-auto group" asChild>
                    <Link href={`#`}>
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
  );
}
