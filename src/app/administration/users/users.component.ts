import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { DepartmentService } from 'app/_services/Department.service';
import { RolesService } from 'app/_services/roles.service';
import { UsersService } from 'app/_services/Users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  RolesList: any;
  DeptList: any;
  UsersList: any;
  searchData = "";
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _service:UsersService,
    private toastr:ToastrService,
    private _inputField: InputFieldValidator,
    private _Roleseservice:RolesService,
    private _DeptService:DepartmentService
  ) { }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      Id: [0],
      UserCode: ['', Validators.required],
      UserName: ['', Validators.required],
      MobileNo: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(13)]],
      EmailId: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      DepartmentID: [0],
      EmployeeId: ['', Validators.required],
      EmployeeName: ['',Validators.required],
      RoleID: [0,Validators.required],
      Password: ['',Validators.required],
      PasswordPolicy: [''],
      CreatedBy: [''],
     // IsActive: [false],
      UpdatedBy: [''],
      
    });
     this.getRolesList();
     this.getDepartmentList();
     this.GetUsersList();
  }
  get f() { return this.form.controls; }
  onSubmit() {
    debugger
    this.submitted = true;
debugger;
//this.form.controls.MobileNo.setValue(parseInt(this.form.value.MobileNo));

    if (this.form.invalid) {
      console.log("Error",this.form.value);
        return;
    }
    // if(parseInt(this.form.value.ID) >0){
    //   debugger
    // let UserUpdate = this.UsersList.find(m=>m.id == parseInt(this.form.value.ID));
    // if(UserUpdate['userCode'].toLowerCase() != this.form.value.UserCode.toLowerCase()){
    //   this.toastr.error("User Code cant't be changed!","Error");
    //   return;
    // }
    // }
    this.loading = true;
    console.log(this.form.value);
    this._service.CreateUser(this.form.value).subscribe(
      res=>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetUsersList();
            this.clearForm();
            //this.GetUsersList();
          }
        }
      },
      error=>{
this.loading = false;
      }
    );
  }

  clearForm(){
    this.submitted = false;
    this.isUpdate = false;
       this.form.reset();
       //this.form.controls.BranchID.setValue(0);
       this.form.controls.RoleID.setValue(0);
     }
     omitSpecialCharacterAndSpace(event){
      debugger
      if(event.code === 'Space'){
        return false
      }
  return this._inputField.omit_special_char(event);
    }
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    getRolesList(){
      this._Roleseservice.RolesList().subscribe(
        res=>{
          if(res){
            debugger
            this.RolesList = res;
          }
        },
        err=>{
          debugger
          console.error()
        }
      );
    }
    getDepartmentList(){
      this._DeptService.getDepartment().subscribe(
        res=>{
          if(res){
            debugger
            this.DeptList = res;
          }
        },
        err=>{
          debugger
          console.error()
        }
      );
    }
    GetUsersList(){
      this._service.getUserList().subscribe(
        res=>{
          if(res){
            debugger
            this.UsersList = res;
            this.RecordCount = this.UsersList.length;
          }
        },
        err=>{
          debugger
          console.error()
        }
      );
    }
    Update(oRes){
      debugger
      this.isUpdate = true;
       this.form.controls.Id.setValue(oRes['id']);
       this.form.controls.UserCode.setValue(oRes['userCode']);
       this.form.controls.UserName.setValue(oRes['userName']);
       this.form.controls.MobileNo.setValue(oRes['mobileNo']);

       this.form.controls.EmailId.setValue(oRes['emailId']);
       this.form.controls.DepartmentID.setValue(oRes['departmentID']);
       this.form.controls.EmployeeId.setValue(oRes['employeeId']);
       this.form.controls.EmployeeName.setValue(oRes['employeeName']);

       this.form.controls.RoleID.setValue(oRes['roleID']);
       this.form.controls.Password.setValue(oRes['password']);
       this.form.controls.PasswordPolicy.setValue(oRes['passwordPolicy']);
       this.form.controls.CreatedBy.setValue(oRes['createdBy']);
       this.form.controls.UpdatedBy.setValue(oRes['updatedBy']);
       
     }
}
