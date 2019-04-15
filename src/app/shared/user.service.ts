import { Injectable } from '@angular/core';
import { User } from '../shared/user';  // User data telephone interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UsersRef: AngularFireList<any>;    // Reference to User data list, its an Observable
  UserRef: AngularFireObject<any>;   // Reference to User object, its an Observable too

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase) { }

  // Create User
  AjouterUser(User: User) {
    this.UsersRef.push({
      nom: User.nom,
      prenom: User.prenom,
      password: User.password,
      email: User.email,
      telephone: User.telephone,
    })
  }

  // Fetch Single User Object
  GetUser(id: string) {
    this.UserRef = this.db.object('users/' + id);
    return this.UserRef;
  }

  // Fetch Listes Users
  GetUsersList() {
    this.UsersRef = this.db.list('users');
    return this.UsersRef;
  }

  // Update User Object
  ModifierUser(User: User) {
    this.UserRef.update({
        nom: User.nom,
        prenom: User.prenom,
        password: User.password,
        email: User.email,
        telephone: User.telephone,
    })
  }

  // Delete User Object
  SupprimerUser(id: string) {
    this.UserRef = this.db.object('users/' + id);
    this.UserRef.remove();
  }

}
