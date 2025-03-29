"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Edit, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface Blog {
  id: string;
  title: string;
  description: string;
  blog_text: string;
  created_time: string;
  estimate_read_time: string;
  tag: string;
}

export default function BlogsTab() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Getting Started with Next.js",
      description: "A beginner's guide to Next.js framework",
      blog_text:
        "Next.js is a React framework that enables server-side rendering and static site generation...",
      created_time: "2023-05-15T10:30:00Z",
      estimate_read_time: "5 min",
      tag: "Next.js",
    },
    {
      id: "2",
      title: "Understanding React Hooks",
      description: "Deep dive into React Hooks and their use cases",
      blog_text:
        "React Hooks were introduced in React 16.8 and have changed how we write React components...",
      created_time: "2023-06-20T14:45:00Z",
      estimate_read_time: "8 min",
      tag: "React",
    },
  ]);

  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [newBlog, setNewBlog] = useState<Omit<Blog, "id" | "created_time">>({
    title: "",
    description: "",
    blog_text: "",
    estimate_read_time: "",
    tag: "",
  });

  const handleAddBlog = () => {
    if (!newBlog.title) return;

    const id = Math.random().toString(36).substring(2, 9);
    const created_time = new Date().toISOString();

    setBlogs([...blogs, { ...newBlog, id, created_time }]);
    setNewBlog({
      title: "",
      description: "",
      blog_text: "",
      estimate_read_time: "",
      tag: "",
    });
  };

  const handleDeleteBlog = (id: string) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  const handleEditBlog = (blog: Blog) => {
    setEditingBlog({ ...blog });
  };

  const handleUpdateBlog = () => {
    if (!editingBlog) return;

    const updatedBlogs = blogs.map((blog) =>
      blog.id === editingBlog.id ? editingBlog : blog
    );

    setBlogs(updatedBlogs);
    setEditingBlog(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSaveAll = () => {
    console.log("Saving all blogs:", blogs);
    // Implement API call to save all blogs
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Blogs</h2>
        <p className="text-gray-400">Manage your blog posts.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {blogs.map((blog) => (
          <Card key={blog.id} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{blog.title}</h3>
                  <p className="text-sm text-gray-400">{blog.description}</p>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditBlog(blog)}
                    className="h-8 w-8 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteBlog(blog.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-400 line-clamp-2">
                {blog.blog_text}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                  {blog.tag}
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-2 text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDate(blog.created_time)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{blog.estimate_read_time} read</span>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-800/50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <PlusCircle className="h-8 w-8 mb-2 text-gray-500" />
                <p className="text-gray-500">Add New Blog</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle>Add New Blog</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="blog-title">Title</Label>
                <Input
                  id="blog-title"
                  value={newBlog.title}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-description">Description</Label>
                <Input
                  id="blog-description"
                  value={newBlog.description}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, description: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-text">Content</Label>
                <Textarea
                  id="blog-text"
                  value={newBlog.blog_text}
                  onChange={(e) =>
                    setNewBlog({ ...newBlog, blog_text: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700 min-h-[200px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="blog-read-time">Read Time</Label>
                  <Input
                    id="blog-read-time"
                    value={newBlog.estimate_read_time}
                    onChange={(e) =>
                      setNewBlog({
                        ...newBlog,
                        estimate_read_time: e.target.value,
                      })
                    }
                    placeholder="e.g. 5 min"
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="blog-tag">Tag</Label>
                  <Input
                    id="blog-tag"
                    value={newBlog.tag}
                    onChange={(e) =>
                      setNewBlog({ ...newBlog, tag: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleAddBlog}>Add Blog</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Blog Dialog */}
      <Dialog
        open={!!editingBlog}
        onOpenChange={(open) => !open && setEditingBlog(null)}
      >
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
          </DialogHeader>
          {editingBlog && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-blog-title">Title</Label>
                <Input
                  id="edit-blog-title"
                  value={editingBlog.title}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-blog-description">Description</Label>
                <Input
                  id="edit-blog-description"
                  value={editingBlog.description}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-blog-text">Content</Label>
                <Textarea
                  id="edit-blog-text"
                  value={editingBlog.blog_text}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      blog_text: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 min-h-[200px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-blog-read-time">Read Time</Label>
                  <Input
                    id="edit-blog-read-time"
                    value={editingBlog.estimate_read_time}
                    onChange={(e) =>
                      setEditingBlog({
                        ...editingBlog,
                        estimate_read_time: e.target.value,
                      })
                    }
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-blog-tag">Tag</Label>
                  <Input
                    id="edit-blog-tag"
                    value={editingBlog.tag}
                    onChange={(e) =>
                      setEditingBlog({ ...editingBlog, tag: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setEditingBlog(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateBlog}>Update Blog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button onClick={handleSaveAll} className="ml-auto">
        Save all blogs
      </Button>
    </div>
  );
}
