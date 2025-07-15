export interface ProfileModel {
  id: number;
  firstName: string;
  lastName: string;
    email: string;
    phone?: string;
    imageUrl?: string;
    username: string;
}
export interface PostsModel {
  userid: number;
  id: number;
  title: string;
  body: string;
  isEditing?: boolean;
  editedTitle?: string;
  editedBody?: string;
}
