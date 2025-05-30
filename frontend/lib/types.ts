export interface UserDashboard {
  user: User;
  userAbout: UserAbout;
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
