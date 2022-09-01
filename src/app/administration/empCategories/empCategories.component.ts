import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { EmpcategoryService } from 'app/_services/empcategory.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empCategories',
  templateUrl: './empCategories.component.html',
  styleUrls: ['./empCategories.component.css']
})
export class empCategoriesComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  DesignationList: any;
  empCategoriesList: any;
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:EmpcategoryService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      CategoryCode: ['',Validators.required],
      CategoryName: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.getEmpCategories();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this._service.postCategories(this.form.value).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getEmpCategories();
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
   
    getEmpCategories(){
      this.loading = true;
      this._service.getCategories().subscribe(
        res=>{
          if(res){
            debugger
            this.empCategoriesList = res;
            this.loading = false;
            this.RecordCount = this.empCategoriesList.length;
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
      this.form.controls.CategoryCode.setValue(oRes['categoryCode']);
      this.form.controls.CategoryName.setValue(oRes['categoryName']);
      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
}
