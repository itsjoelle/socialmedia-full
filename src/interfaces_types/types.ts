export enum Constants {
  MYUSER = 'Jade Jones',
}

export interface FormValues {
  name: string;
  email: string;
  password: string;
}

export interface ProfileInfo {
  profile: object;
}

export interface PostData {
  id: string;
  description: string;
  userId: string;
  username: string;
  img: string;
  profileimg?: string;
  timestamp: string;
}

export interface PostProps {
  post: PostData;
  userData?: User;
}

export interface Like {
  userId: string;
  likeId: string;
}

export interface Comment {
  userName: string;
  userImg: string;
  commentId: string;
  text: string;
}

export interface UserData {
  userName: string;
  userImage: string;
}

export interface User {
  userId: string;
  userName: string;
  photo: string | null;
  timestamp: TimeStamp;
}

export type TimeStamp = {
  seconds: number;
  nanoseconds: number;
};

export interface Group {
  copy: string;
  image: string;
}

export interface Friend {
  name: string;
  image: string;
  friends: number;
}
