import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { EmpcategoryService } from 'app/_services/empcategory.service';
import { SharedService } from 'app/_services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: any;
  RecordCount: any;
  LeavesList: any;
  currentDate: any;
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.BaseURl = '/Leave/';

    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      LeaveType: ['', Validators.required],
      EmployeeType: ['', Validators.required],
      PayableLeave: [false],
      EncashabaleLeave: [false],
      Status: [false, Validators.required],
      AnnualLeave: [0,Validators.required],
      MinEncashment: [0,Validators.required],
      MaxEncashment: [0,Validators.required],
      PaidAdvance: [false],
      ForwardNext: [false],
      FromDate: ['', Validators.required],
      ToDate: ['', Validators.required],
      Remarks: [''],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.currentDate = new Date();
    this.setCurrentDate();

    this.GetLeaves();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    this.form.controls.PayableLeave.setValue(Boolean(this.form.controls.PayableLeave.value));
    this.form.controls.EncashabaleLeave.setValue(Boolean(this.form.controls.EncashabaleLeave.value));
    this.form.controls.Status.setValue(Boolean(this.form.controls.Status.value));
    this.form.controls.PaidAdvance.setValue(Boolean(this.form.controls.PaidAdvance.value));
    this.form.controls.ForwardNext.setValue(Boolean(this.form.controls.ForwardNext.value));
    this.form.controls.AnnualLeave.setValue(parseInt(this.form.controls.AnnualLeave.value));
    this.form.controls.MinEncashment.setValue(parseInt(this.form.controls.MinEncashment.value));
    this.form.controls.MaxEncashment.setValue(parseInt(this.form.controls.MaxEncashment.value));
    

    this.loading = true;
    let Url = this.BaseURl+'PostLeave';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetLeaves();
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
   
    GetLeaves(){
      this.loading = true;
      let Url = this.BaseURl+'GetLeave';
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.LeavesList = res;
            this.loading = false;
            this.RecordCount = this.LeavesList.length;
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

    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    Update(oRes){
     this.isUpdate = true;
      this.form.controls.Id.setValue(oRes['id']);
      this.form.controls.Code.setValue(oRes['code']);
      this.form.controls.Description.setValue(oRes['description']);
      this.form.controls.AnnualLeave.setValue(oRes['annualLeave']);
      this.form.controls.LeaveType.setValue(oRes['leaveType']);
      this.form.controls.PayableLeave.setValue(oRes['payableLeave']);
      this.form.controls.EncashabaleLeave.setValue(oRes['encashabaleLeave']);
      this.form.controls.EmployeeType.setValue(oRes['employeeType']);
      this.form.controls.Status.setValue(oRes['status']);
      this.form.controls.MinEncashment.setValue(oRes['minEncashment']);
      this.form.controls.MaxEncashment.setValue(oRes['maxEncashment']);
      this.form.controls.PaidAdvance.setValue(oRes['paidAdvance']);
      this.form.controls.ForwardNext.setValue(oRes['forwardNext']);
      this.form.controls.FromDate.setValue(oRes['fromDate']);
      this.form.controls.ToDate.setValue(oRes['toDate']);
      this.form.controls.Remarks.setValue(oRes['remarks']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
    setCurrentDate(){
   
      //let lastweek = new Date();
      this.currentDate = this.datePipe.transform(this.currentDate, 'MM/dd/yyyy hh:mm:ss');
      console.log(this.currentDate)
    }
}

