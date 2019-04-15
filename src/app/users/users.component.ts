import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { User } from '../shared/user'; // user interface class for Data types.
import { UserService } from '../shared/user.service'; // CRUD API service class


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UserComponent implements OnInit {
  p: number = 1;                      // Settup up pagination variable
  User: User[];                 // Save users data in user's array.
  hideWhenNoStudent: boolean = false; // Hide users data table when no user.
  noData: boolean = false;            // Showing No user Message, when no user in database.
  preLoader: boolean = true;          // Showing Preloader to show user data is coming for you from thre server(A tiny UX Shit)


  constructor(
    public crudApi: UserService, // Inject user CRUD services in constructor.
    public toastr: ToastrService // Toastr service for alert message
  ) { }


  ngOnInit() {
    this.dataState(); // Initialize user's list, when component is ready
    let s = this.crudApi.GetUsersList();
    console.log(s);

    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.User = [];
      data.forEach(item => {
        let a = item.payload.toJSON();
        //console.log(a);
        a['$key'] = item.key;
       
        this.User.push(a as User);
      })
    })
  }

  // Using valueChanges() method to fetch simple list of users data. It updates the state of hideWhenNoStudent, noData & preLoader variables when any changes occurs in user data list in real-time.
  dataState() {
    this.crudApi.GetUsersList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete user object
  Supprimerannonce(user) {
    if (window.confirm('Are sure you want to delete this user ?')) { // Asking from user before Deleting user data.
      this.crudApi.SupprimerUser(user.$key) // Using Delete user API to delete user.
      this.toastr.success(user.firstName + ' successfully deleted!'); // Alert message will show up when user successfully deleted.
    }
  }

}