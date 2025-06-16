"use client";

import { useState } from "react";
import { PlusCircle, Trash2, Edit, Plus } from "lucide-react";
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
import { Project } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { appClient } from "@/lib/client/appClient";

const handleSaveAll = async ({ projects }: { projects: Project[] }) => {
  console.log("Saving all projects:", projects);
  await appClient.updateUserProjects(projects);
};

export default function ProjectsTab({
  projects_main,
}: {
  projects_main: Project[];
}) {
  const queryClient = useQueryClient();

  const [projects, setProjects] = useState<Project[]>([...projects_main]);

  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newProject, setNewProject] = useState<Omit<Project, "id" | "tags">>({
    title: "",
    description: "",
    imageLink: "",
    demoLink: "",
    codeLink: "",
  });
  const [newTag, setNewTag] = useState("");

  const handleAddProject = () => {
    if (!newProject.title) return;

    const id = 0;
    setProjects([...projects, { ...newProject, id, tags: [] }]);
    setNewProject({
      title: "",
      description: "",
      imageLink: "",
      demoLink: "",
      codeLink: "",
    });
  };

  const handleDeleteProject = async (id: number) => {
    if (id === 0) {
      setProjects(projects.filter((project) => project.id !== id));
    } else {
      await appClient.deleteProject(id);
      setProjects(projects.filter((project) => project.id !== id));
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject({ ...project });
  };

  const handleUpdateProject = () => {
    if (!editingProject) return;

    const updatedProjects = projects.map((project) =>
      project.id === editingProject.id ? editingProject : project
    );

    setProjects(updatedProjects);
    setEditingProject(null);
  };

  const handleAddTag = () => {
    if (!newTag || !editingProject) return;

    setEditingProject({
      ...editingProject,
      tags: [...editingProject.tags, newTag],
    });

    setNewTag("");
  };

  const handleDeleteTag = (tag: string) => {
    if (!editingProject) return;

    setEditingProject({
      ...editingProject,
      tags: editingProject.tags.filter((t) => t !== tag),
    });
  };

  const mutation = useMutation({
    mutationFn: async (projects: Project[]) => {
      await handleSaveAll({ projects });
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
    mutation.mutate(projects);
  };
  if (!projects_main) return <div>No projects found</div>;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Projects</h2>
        <p className="text-gray-400">Manage your portfolio projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEditProject(project)}
                    className="h-8 w-8 text-blue-500 hover:text-blue-400 hover:bg-blue-500/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteProject(project.id)}
                    className="h-8 w-8 text-red-500 hover:text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-gray-400 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {project.tags &&
                  project.tags.length > 0 &&
                  project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-800 px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            </CardContent>
            <CardFooter className="pt-2 text-xs text-gray-500">
              <div className="flex gap-4">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    Demo
                  </a>
                )}
                {project.codeLink && (
                  <a
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400"
                  >
                    Code
                  </a>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}

        <Dialog>
          <DialogTrigger asChild>
            <Card className="bg-gray-900 border-gray-800 border-dashed flex items-center justify-center cursor-pointer hover:bg-gray-800/50 transition-colors">
              <CardContent className="flex flex-col items-center justify-center py-8">
                <PlusCircle className="h-8 w-8 mb-2 text-gray-500" />
                <p className="text-gray-500">Add New Project</p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700">
            <DialogHeader>
              <DialogTitle>Add New Project</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="project-title">Title</Label>
                <Input
                  id="project-title"
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-description">Description</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-image">Image URL</Label>
                <Input
                  id="project-image"
                  value={newProject.imageLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, imageLink: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-demo">Demo URL</Label>
                <Input
                  id="project-demo"
                  value={newProject.demoLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, demoLink: e.target.value })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-code">Code URL</Label>
                <Input
                  id="project-code"
                  value={newProject.codeLink}
                  onChange={(e) =>
                    setNewProject({ ...newProject, codeLink: e.target.value })
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
                <Button onClick={handleAddProject}>Add Project</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Project Dialog */}
      <Dialog
        open={!!editingProject}
        onOpenChange={(open) => !open && setEditingProject(null)}
      >
        <DialogContent className="bg-gray-900 border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>
          {editingProject && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-project-title">Title</Label>
                <Input
                  id="edit-project-title"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project-description">Description</Label>
                <Textarea
                  id="edit-project-description"
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project-image">Image URL</Label>
                <Input
                  id="edit-project-image"
                  value={editingProject.imageLink}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      imageLink: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project-demo">Demo URL</Label>
                <Input
                  id="edit-project-demo"
                  value={editingProject.demoLink}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      demoLink: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-project-code">Code URL</Label>
                <Input
                  id="edit-project-code"
                  value={editingProject.codeLink}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      codeLink: e.target.value,
                    })
                  }
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 p-2 border border-gray-700 rounded-md bg-gray-800">
                  {editingProject.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-1 bg-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteTag(tag)}
                        className="h-4 w-4 text-red-500 hover:text-red-400 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-1">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag"
                      className="h-8 bg-gray-700 border-gray-600"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleAddTag}
                      className="h-8 w-8 text-green-500 hover:text-green-400 hover:bg-green-500/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              className="mr-2"
              onClick={() => setEditingProject(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateProject}>Update Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Button onClick={handleSubmit} className="ml-auto">
        Save all projects
      </Button>
    </div>
  );
}
