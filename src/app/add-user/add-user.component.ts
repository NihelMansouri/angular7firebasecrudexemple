import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr
import { ActivatedRoute, Router } from '@angular/router'; // ActivatedRoue is used to get the current associated components information.

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {
  public userForm: FormGroup;  // Define FormGroup to user's form

  constructor(
    public crudApi: UserService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService,  // Toastr service for alert message
    private router: Router
  ) { }


  ngOnInit() {
    this.crudApi.GetUsersList();  // Call ModifierClientsList() before main form is being called
    this.studenForm();              // Call user form when component is ready
  }

  // Reactive user form
  studenForm() {
    this.userForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(6)]],
      prenom: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  // Accessing form control using getters
  get nom() {
    return this.userForm.get('nom');
  }

  get prenom() {
    return this.userForm.get('prenom');
  }

  get email() {
    return this.userForm.get('email');
  }

  get password() {
    return this.userForm.get('password');
  }

  get telephone() {
    return this.userForm.get('telephone');
  }

 

  // Reset user form's values
  ResetForm() {
    this.userForm.reset();
  }

  submitUserData() {
    this.crudApi.AjouterUser(this.userForm.value); // Submit user data using CRUD API
    this.toastr.success(this.userForm.controls['prenom'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
    this.router.navigate(['users']);
  };

}