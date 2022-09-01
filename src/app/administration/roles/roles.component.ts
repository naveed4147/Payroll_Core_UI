import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { DepartmentService } from 'app/_services/Department.service';
import { RolesService } from 'app/_services/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  RolesList: any;
  searchData = "";
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _service:RolesService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      RoleName: ['', Validators.required],
      CreatedBy: [''],
      Description: [''],
    });
    this.getRolesList();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this._service.postRoles(this.form.value).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getRolesList();
            this.clearForm();
          }
        }
      },
     error: (error)=>{
this.loading = false;
      }
  });
  }
  clearForm(){
    this.submitted = false;
    this.isUpdate = false;
       this.form.reset();
      //  this.form.controls.Id.setValue(0);
      //  this.form.controls.RoleID.setValue('');
     }
     getRolesList(){
      this.loading = true;
      this._service.RolesList().subscribe(
        res=>{
          if(res){
            debugger
            this.loading = false;
            this.RolesList = res;
            this.RecordCount = this.RolesList.length;
          }
        },
        err=>{
          debugger
          console.error()
          this.loading = false;
        }
      );
    }
    Update(oRes){
      this.isUpdate = true;
   
       this.form.controls.Id.setValue(oRes['id']);
       this.form.controls.RoleName.setValue(oRes['roleName']);
       this.form.controls.Description.setValue(oRes['description']);
       this.form.controls.CreatedBy.setValue(oRes['createdBy']);
       
     }
}
