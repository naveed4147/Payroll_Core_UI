import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-empcosts',
  templateUrl: './empcosts.component.html',
  styleUrls: ['./empcosts.component.css']
})
export class EmpcostsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  EmpCostList: any;
  FixedValue: any;
  RecordCount: any;

 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/EmpCost/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      Fixed: ['',Validators.required],
      Amount: [0],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetEmpCosts();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.form.controls.Amount.setValue(parseInt(this.form.controls.Amount.value));
    let Fixed = this.form.controls.Fixed.value
    if(Fixed == 'Yes'){
      this.form.controls.Amount.setValue(0);
    }
    this.loading = true;
    let Url = this.BaseURl+'PostEmpCost';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetEmpCosts();
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
       this.form.controls.Id.setValue(0);
      //  this.form.controls.RoleID.setValue('');
     }
     omitSpecialCharacterAndSpace(event){
      debugger
      if(event.code === 'Space'){
        return false
      }
  return this._inputField.omit_special_char(event);
    }
   
    GetEmpCosts(){
      let Url = this.BaseURl+'GetEmpCost';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.EmpCostList = res;
            this.loading = false;
            this.RecordCount = this.EmpCostList.length;
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
      this.form.controls.Code.setValue(oRes['code']);
      this.form.controls.Description.setValue(oRes['description']);

      this.form.controls.Fixed.setValue(oRes['fixed']);
      this.form.controls.Amount.setValue(oRes['amount']);

      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);

      this.FixedValue = this.form.controls['Fixed'].value;
    }
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    onChangeFixed(){
      this.FixedValue = this.form.controls['Fixed'].value;
    }
   
}
