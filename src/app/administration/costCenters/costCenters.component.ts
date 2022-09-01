import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-costCenters',
  templateUrl: './costCenters.component.html',
  styleUrls: ['./costCenters.component.css']
})
export class CostCentersComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  RecordCount: any;
  CostCentersList: any;
 
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/CostCenters/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Name: ['', Validators.required],
      EffectiveDate: ['',Validators.required],
      ChargeableTo: ['', Validators.required],
      IncludedInSalary: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetCostCenters();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.form.controls.flgActive.setValue(Boolean(this.form.controls.flgActive.value));
    
    this.loading = true;
    let Url = this.BaseURl+'PostCostCenter';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetCostCenters();
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
   
    GetCostCenters(){
      let Url = this.BaseURl+'GetCostCenters';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.CostCentersList = res;
            this.loading = false;
            this.RecordCount = this.CostCentersList.length;
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
      this.form.controls.Name.setValue(oRes['name']);
      this.form.controls.EffectiveDate.setValue(oRes['effectiveDate']);
      this.form.controls.ChargeableTo.setValue(oRes['chargeableTo']);
      this.form.controls.IncludedInSalary.setValue(oRes['includedInSalary']);

      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
   
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
}
