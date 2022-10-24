// Contains all the custom types we want to use for our application
export interface BookItem {
  doctorId: number;
  name: string;
  author: string;
  price: number;
  isPublic: boolean;
  isSuggested: boolean;
}
