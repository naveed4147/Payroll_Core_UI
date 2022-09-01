import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';

import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  fieldTextType: boolean;
  Link:string = "/Account/";
  loading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private _service:SharedService,
    private _inputField:InputFieldValidator,
    private toastr: ToastrService,
    private route:Router
  ) { }

  ngOnInit(): void {

 let token = localStorage.getItem('APK_LOG');
 if(token != null){
  this.route.navigateByUrl('/dashboard');
 }


    this.form = this.formBuilder.group({
      UserCode: ['', Validators.required],
      Password: ['', Validators.required],
    });

  }
  get f() { return this.form.controls; }
  onSubmit() {
    debugger
    this.Link = "/Account/";
    this.submitted = true;
debugger;
    if (this.form.invalid) {
        return;
    }
   this.Link = this.Link+"Login"
this._service.Post(this.Link,this.form.value).subscribe(
  res=>{
if(res){
  if(res['status']==1){
    this.loading = false;
this.toastr.success(res['message'],"Success");
localStorage.setItem('APK_LOG',res['data']);
this.route.navigateByUrl('/dashboard');
  }
  else{
    this.loading = false;
this.toastr.error(res['message'],"Success");
  }
}

  },
  error=>{

  }
);
  }
  omitSpecialCharacterAndSpace(event){
    debugger
    if(event.code === 'Space'){
      return false
    }
return this._inputField.omit_special_char(event);
  }
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
