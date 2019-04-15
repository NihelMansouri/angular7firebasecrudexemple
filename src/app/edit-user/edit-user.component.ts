import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from "@angular/router"; // ActivatedRoue is used to get the current associated components information.
import { Location } from '@angular/common';  // Location service is used to go back to previous component
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {
  editForm: FormGroup;  // Define FormGroup to user's edit form

  constructor(
    private crudApi: UserService,       // Inject CRUD API in constructor
    private fb: FormBuilder,            // Inject Form Builder service for Reactive forms
    private location: Location,         // Location service to go back to previous component
    private actRoute: ActivatedRoute,   // Activated route to get the current component's inforamation
    private router: Router,             // Router service to navigate to specific component
    private toastr: ToastrService       // Toastr service for alert message
  ) { }

  ngOnInit() {
    this.ModifierUserData();   // Call ModifierUserData() as soon as the component is ready 
    const id = this.actRoute.snapshot.paramMap.get('id');  // Getting current component's id or information using ActivatedRoute service
    this.crudApi.GetUser(id).valueChanges().subscribe(data => {
      console.log(data);
      this.editForm.setValue(data)  // Using SetValue() method, It's a ReactiveForm's API to store intial value of reactive form 
    })
  }

  // Accessing form control using getters
  get nom() {
    return this.editForm.get('nom');
  }

  get prenom() {
    return this.editForm.get('prenom');
  }

  get telephone() {
    return this.editForm.get('telephone');
  }

  get password() {
    return this.editForm.get('password');
  }

  get email() {
    return this.editForm.get('email');
  }

  
  // Contains Reactive Form logic
  ModifierUserData() {
    this.editForm = this.fb.group({
      nom: [''],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      telephone: [''],
      password: [''],
      email: ['']
    })
  }

  // Go back to previous component
  goBack() {
    this.location.back();
  }

  // Below methods fire when somebody click on submit button
  updateForm() {
    this.crudApi.ModifierUser(this.editForm.value);       // Update user data using CRUD API
    this.toastr.success(this.editForm.controls['prenom'].value + ' updated successfully');   // Show succes message when data is successfully submited
    this.router.navigate(['users']);               // Navigate to user's list page when user data is updated
  }

}