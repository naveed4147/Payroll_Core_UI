import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { SharedService } from '../../_Services/shared.service';

@Component({
  selector: 'app-empBelongings',
  templateUrl: './empBelongings.component.html',
  styleUrls: ['./empBelongings.component.css']
})
export class EmpBelongingsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  empBelongingList: any;
  TypeValue: any;
  RecordCount: any;

 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/EmpBelongings/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Description: ['', Validators.required],
      Type: ['',Validators.required],
      Depreciation: [0],
      Rent: [0],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.getBelongings();
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
    let Url = this.BaseURl+'PostEmpBelongings';
    let Type = this.form.controls.Type.value;
    if(Type == 'Owned'){
      this.form.controls.Depreciation.setValue(parseInt(this.form.controls.Depreciation.value));
      this.form.controls.Rent.setValue(0);
      
    }else if(Type == 'Rented'){
      this.form.controls.Depreciation.setValue(0);
      this.form.controls.Rent.setValue(parseInt(this.form.controls.Rent.value));
    }
   

    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getBelongings();
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
   
    getBelongings(){
      let Url = this.BaseURl+'GetEmpBelongings';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.empBelongingList = res;
            this.loading = false;
            this.RecordCount = this.empBelongingList.length;
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
      this.form.controls.Depreciation.setValue(oRes['depreciation']);
      this.form.controls.Rent.setValue(oRes['rent']);

      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
    onTypeChange(){
      this.TypeValue = this.form.controls['Type'].value;
    }
}
