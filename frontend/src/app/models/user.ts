export class User{
    id:number;
    name: string;
    surname: string;
    email: string;
    password ?: string;
    isAdmin : boolean;

  constructor(id: number, name: string, surname: string, email: string, isAdmin: boolean) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.isAdmin = isAdmin;
  }

}
