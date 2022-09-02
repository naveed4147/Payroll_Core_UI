import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-custOutsourcing',
  templateUrl: './custOutsourcing.component.html',
  styleUrls: ['./custOutsourcing.component.css']
})
export class CustOutsourcingComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  TypeValue: any;
  cusOutsourcingList: any;
  RecordCount: any;

 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/CustOutsourcing/';
    this.form = this.formBuilder.group({
      Id: [0],
      CustCode: ['',Validators.required],
      CustName: ['', Validators.required],
      ArabicName: [''],
      CustType: ['',Validators.required],
      CompanyRegNo: [''],
      VATNo: ['', Validators.required],
      PhoneNo: [''],
      MobileNo: ['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10),Validators.maxLength(13)]],
      ContactPerson: ['', Validators.required],
      BankName: [''],
      IBAN: [''],
      SwiftCode: [''],
      BeneficiaryName: ['', Validators.required],
      PaymentTerms: ['', Validators.required],
      PaymentFrequency: ['', Validators.required],
      CurrentBalance: [''],
      Status: ['', Validators.required],
      ContractNo: [''],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetCustOutsourcing();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
        //console.log("Error",this.form.value);
    }
    this.loading = true;
    let Url = this.BaseURl+'PostCustOutsourcing';
    let Type = this.form.controls.CustType.value;
    if(Type != 'Company'){
      this.form.controls.CompanyRegNo.setValue('');
      
  }
   

    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetCustOutsourcing();
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
   
    GetCustOutsourcing(){
      let Url = this.BaseURl+'GetCustOutsourcing';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.cusOutsourcingList = res;
            this.loading = false;
            this.RecordCount = this.cusOutsourcingList.length;
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
      this.form.controls.CustCode.setValue(oRes['custCode']);
      this.form.controls.CustName.setValue(oRes['custName']);
      this.form.controls.ArabicName.setValue(oRes['arabicName']);
      this.form.controls.CustType.setValue(oRes['custType']);
      this.form.controls.CompanyRegNo.setValue(oRes['companyRegNo']);
      this.form.controls.VATNo.setValue(oRes['vatNo']);
      this.form.controls.PhoneNo.setValue(oRes['phoneNo']);
      this.form.controls.MobileNo.setValue(oRes['mobileNo']);
      this.form.controls.ContactPerson.setValue(oRes['contactPerson']);
      this.form.controls.BankName.setValue(oRes['bankName']);
      this.form.controls.IBAN.setValue(oRes['iBAN']);
      this.form.controls.SwiftCode.setValue(oRes['swiftCode']);
      this.form.controls.BeneficiaryName.setValue(oRes['beneficiaryName']);
      this.form.controls.PaymentTerms.setValue(oRes['paymentTerms']);
      this.form.controls.PaymentFrequency.setValue(oRes['paymentFrequency']);
      this.form.controls.CurrentBalance.setValue(oRes['currentBalance']);
      this.form.controls.Status.setValue(oRes['status']);
      this.form.controls.ContractNo.setValue(oRes['contractNo']);

      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);

      this.TypeValue = this.form.controls['CustType'].value;
    }
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    onCustTypeChange(){
      this.TypeValue = this.form.controls['CustType'].value;
    }
}
