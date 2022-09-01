import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { SharedService } from 'app/_services/shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  form: FormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  RecordCount: any;
  TrainingList: any;
 
  constructor(
    private formBuilder: FormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/Trainings/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Name: ['', Validators.required],
      Provider: ['',Validators.required],
      Duration: [0, Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetTrainingList();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.form.controls.flgActive.setValue(Boolean(this.form.controls.flgActive.value));
    this.form.controls.Duration.setValue(parseInt(this.form.controls.Duration.value));

    this.loading = true;
    let Url = this.BaseURl+'PostTraining';
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetTrainingList();
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
   
    GetTrainingList(){
      let Url = this.BaseURl+'GetTrainings';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.TrainingList = res;
            this.loading = false;
            this.RecordCount = this.TrainingList.length;
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
      this.form.controls.Provider.setValue(oRes['provider']);
      this.form.controls.Duration.setValue(oRes['duration']);

      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
}
