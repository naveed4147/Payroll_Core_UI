import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-payelements',
  templateUrl: './payelements.component.html',
  styleUrls: ['./payelements.component.css']
})
export class PayelementsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  FixedValue: any;
  PayelemetList: any;
  RecordCount: any;

 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    this.BaseURl = '/PayElement/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      Type: ['', Validators.required],
      Fixed: [false],
      Amount: [0, Validators.required],
      ElementType: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetPayElement();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.form.controls.Amount.setValue(parseInt(this.form.controls.Amount.value));
    this.form.controls.Fixed.setValue(String(this.form.controls.Fixed.value));
    this.form.controls.flgActive.setValue(Boolean(this.form.controls.flgActive.value));
    this.loading = true;
    let Url = this.BaseURl+'PostPayElement';
    console.log("sucess", this.form.value)
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetPayElement();
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
   
    GetPayElement(){
      let Url = this.BaseURl+'GetPayElement';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.PayelemetList = res;
            this.loading = false;
            this.RecordCount = this.PayelemetList.length;
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
      this.form.controls.Type.setValue(oRes['type']);
      this.form.controls.Fixed.setValue(oRes['fixed']);
      this.form.controls.Amount.setValue(oRes['amount']);
      this.form.controls.ElementType.setValue(oRes['elementType']);
      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
console.log(this.form.value)
    }

    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    onChangeFixed(){
      this.FixedValue = this.form.controls['Fixed'].value;
    }
   
}
