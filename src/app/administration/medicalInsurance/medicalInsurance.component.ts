import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { MedicalInsuranceService } from '../../_services/medicalInsurance.service';

@Component({
  selector: 'app-medicalInsurance',
  templateUrl: './medicalInsurance.component.html',
  styleUrls: ['./medicalInsurance.component.css']
})
export class MedicalInsuranceComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  insuranceList: any;
  RecordCount: any;
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:MedicalInsuranceService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      From: ['',Validators.required],
      To: ['', Validators.required],
      Provider: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.getShifts();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this._service.PostMedicalInsurance(this.form.value).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getShifts();
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
   
    getShifts(){
      this.loading = true;
      this._service.GetMedicalInsurance().subscribe(
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
      this.form.controls.Provider.setValue(oRes['provider']);


      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
   
}
