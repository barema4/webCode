export type UserType = {
    id: string;
    firstName: string;
    lastname: string;
    email: string;
    role: string
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
  }


  export type IUserState = {
    data: UserType | null;
    isLoading: boolean;
    errors: {};
  }

  export type UsersStateType = {
    user: IUserState,
  }