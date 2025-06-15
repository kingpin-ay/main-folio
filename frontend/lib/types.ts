export interface UserDashboard {
  user: User;
  userAbout: UserAbout;
  contactDetails: ContactDetails[];
  stackItems: StackItem[];
  stackGroups: StackGroup[];
  projects: Project[];
  blogs: Blog[];
}

export interface ContactDetails {
  id: number;
  link: string;
  linkType: "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN";
}

export interface StackItem {
  id: number;
  name: string;
  image_link: string;
}

export interface StackGroup {
  id: number;
  name: string;
  description: string;
  items: StackItem[];
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  demoLink: string;
  codeLink: string;
  tags: string[];
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
  estimateReadTime: number;
  tag: string;
  createdTime: string;
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

export interface UserProfileData {
  user: {
    firstName: string;
    lastName: string;
    bio: string;
    designation: string | null;
    userName: string;
    email: string;
  };
  contactDetails: {
    link: string;
    linkType: "GITHUB" | "YOUTUBE" | "X" | "MAIL" | "LINKEDLN";
  }[];
  projects: {
    title: string;
    description: string;
    imageLink: string | null;
    demoLink: string | null;
    codeLink: string | null;
    tags: string[] | null;
  }[];
  userAbout:
    | {
        email: string | null;
        description: string;
        imageLink: string;
        shortDescription: string | null;
        phoneNumber: string | null;
        location: string | null;
      }
    | undefined;
  blogs: {
    title: string;
    description: string;
    blogText: string;
    createdTime: Date;
    estimateReadTime: string | null;
    tag: string | null;
  }[];
  stackGroups: {
    stackGroupName: string;
    stackItems: {
      name: string;
      icon: string;
    }[];
  }[];
}
