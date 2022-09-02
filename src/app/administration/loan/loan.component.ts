import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: any;
  LoanList: any;
  RecordCount: any;
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.BaseURl = '/Loan/';

    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      MaxAmount: [0,Validators.required],
      LoanType: ['', Validators.required],
      MinRepaymentAmount: [0,Validators.required],
      MaxNoOfInstallments: [0, Validators.required],
      flgActive: [false,Validators.required],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetLoan();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }

    this.form.controls.MaxAmount.setValue(parseInt(this.form.controls.MaxAmount.value));
    this.form.controls.MinRepaymentAmount.setValue(parseInt(this.form.controls.MinRepaymentAmount.value));
    this.form.controls.MaxNoOfInstallments.setValue(parseInt(this.form.controls.MaxNoOfInstallments.value));
    this.form.controls.flgActive.setValue(Boolean(this.form.controls.flgActive.value));
    
    this.loading = true;
    let Url = this.BaseURl+'PostLoan';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetLoan();
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
   
    GetLoan(){
      this.loading = true;
      let Url = this.BaseURl+'GetLoan';
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.LoanList = res;
            this.loading = false;
            this.RecordCount = this.LoanList.length;
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
      this.form.controls.MaxAmount.setValue(oRes['maxAmount']);
      this.form.controls.LoanType.setValue(oRes['loanType']);
      this.form.controls.MinRepaymentAmount.setValue(oRes['minRepaymentAmount']);
      this.form.controls.MaxNoOfInstallments.setValue(oRes['maxNoOfInstallments']);


      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
}


