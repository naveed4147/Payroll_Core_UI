import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { SharedService } from 'app/_services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payperiod',
  templateUrl: './payperiod.component.html',
  styleUrls: ['./payperiod.component.css']
})
export class PayperiodComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  insuranceList: any;
  BaseURl: string;
  MonthList: any
  RecordCount: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/PayPeriod/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      From: ['',Validators.required],
      To: ['', Validators.required],
      PayMonth: ['', Validators.required],
      NoOfWorkingDays: [0, Validators.required],
      NoOfHolidays: [0, Validators.required],
      NoOfWeekend: [0, Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.getPeriod();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    let Url = this.BaseURl+'PostIPayPeriod';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getPeriod();
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
   
    getPeriod(){
      let Url = this.BaseURl+'GetIPayPeriod';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.insuranceList = res;
            this.loading = false;
            this.RecordCount = this.insuranceList.length;
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

      this.form.controls.From.setValue(oRes['from']);
      this.form.controls.To.setValue(oRes['to']);
      this.form.controls.PayMonth.setValue(oRes['payMonth']);

      this.form.controls.NoOfWorkingDays.setValue(oRes['noOfWorkingDays']);
      this.form.controls.NoOfHolidays.setValue(oRes['noOfHolidays']);
      this.form.controls.NoOfWeekend.setValue(oRes['noOfWeekend']);


      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
   
}
