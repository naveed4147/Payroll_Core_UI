import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { ShiftsService } from 'app/_services/shifts.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.css']
})
export class shiftsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  empCategoriesList: any;
  shiftsList: any;
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:ShiftsService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      ShiftCode: ['',Validators.required],
      ShiftDescription: ['', Validators.required],
      StartTime: ['',Validators.required],
      EndTime: ['', Validators.required],
      BreakHours: [0, Validators.required],
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
    this._service.postShift(this.form.value).subscribe({
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
      this._service.GetShifts().subscribe(
        res=>{
          if(res){
            debugger
            this.shiftsList = res;
            this.loading = false;
            this.RecordCount = this.shiftsList.length;
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
      this.form.controls.ShiftCode.setValue(oRes['shiftCode']);
      this.form.controls.ShiftDescription.setValue(oRes['shiftDescription']);

      this.form.controls.StartTime.setValue(oRes['startTime']);
      this.form.controls.EndTime.setValue(oRes['endTime']);
      this.form.controls.BreakHours.setValue(oRes['breakHours']);


      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
}
