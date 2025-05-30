export interface UserDashboard {
  user: User;
  userAbout: UserAbout;
  contactDetails: ContactDetails[];
  stackItems: StackItem[];
  stackGroups: StackGroup[];
  projects: Project[];
  projectTags: ProjectTag[];
  blogs: Blog[];
}

export interface ContactDetails {
  link: string;
  linkType: "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN";
}

export interface StackItem {
  id: number;
  stackGroupId: number;
  name: string;
  imageLink: string;
}

export interface StackGroup {
  id: number;
  name: string;
  description: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  demoLink: string;
  codeLink: string;
}

export interface ProjectTag {
  id: number;
  projectId: number;
  title: string;
}

export interface Blog {
  id: number;
  title: string;
  description: string;
  blogText: string;
}

export interface UserAbout {
  shortDescription: string;
  description: string;
  imageLink: string;
  email: string;
  phoneNumber: string;
  location: string;
}

export interface User {
  firstName: string;
  lastName: string;
  bio: string;
  designation: string | null;
  userName: string;
  email: string;
}
