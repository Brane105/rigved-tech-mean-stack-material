import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _service: ProfileService, 
    private _builder: FormBuilder, 
    private _router: Router) { }

  profileForm: FormGroup = this._builder.group({
    _id: [], name: [], dob: [], phone: [], password: []
  });
  errorMessage : string | undefined = undefined;
  ngOnInit(): void {
  }
  handleSubmit() {
    this._service.storeProfile(this.profileForm.value).subscribe({
      next: (data) => { 
        alert(data.insertedId+' stored successfully');
        this._router.navigate(["login"])
      }, 
      error: (err) => { 
        this.errorMessage = err.error.message;
        this.profileForm.reset({});
      }
    });
  }
}
