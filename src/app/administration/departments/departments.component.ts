import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { DepartmentService } from 'app/_services/Department.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  DeptList: any;
  searchData = "";
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:DepartmentService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      DepartmentName: ['', Validators.required],
      CreatedBy: [''],
      Description: [''],
      DptCode: ['',Validators.required],
    });
    this.getDepartmentList();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this._service.InsertDepartment(this.form.value).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getDepartmentList();
//this.GetUsersList();
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
     omitSpecialCharacterAndSpace(event){
      debugger
      if(event.code === 'Space'){
        return false
      }
  return this._inputField.omit_special_char(event);
    }
   
    getDepartmentList(){
      this.loading = true;
      this._service.getDepartment().subscribe(
        res=>{
          if(res){
            debugger
            this.DeptList = res;
            this.loading = false;
            this.RecordCount = this.DeptList.length;
          }
        },
        err=>{
          debugger
          console.error();
          this.loading = false;
          this.toastr.error("An Error Occured while fetching data!");
        }
      );
    }
    Update(oRes){
     this.isUpdate = true;
      this.form.controls.Id.setValue(oRes['id']);
      this.form.controls.DepartmentName.setValue(oRes['departmentName']);
      this.form.controls.Description.setValue(oRes['description']);
      this.form.controls.DptCode.setValue(oRes['dptCode']);
      
    }
}
