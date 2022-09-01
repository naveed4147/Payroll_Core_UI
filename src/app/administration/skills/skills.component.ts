import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { InputFieldValidator } from 'app/_helper/InputFieldValidator';
import { SkillsService } from 'app/_services/skills.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  RolesList: any;
  searchData = "";
  SkillsList: any;
  RecordCount: any;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SkillsService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      Id: [0],
      SkillCode: ['', Validators.required],
      SkillName: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
    });
    this.getSkillsList();
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.loading = true;
    this._service.postSkills(this.form.value).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.getSkillsList();
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
     getSkillsList(){
      this.loading = true;
      this._service.getSkills().subscribe(
        res=>{
          if(res){
            debugger
            this.loading = false;
            this.SkillsList = res;
            this.RecordCount = this.SkillsList.length;
          }
        },
        err=>{
          debugger
          console.error()
          this.loading = false;
        }
      );
    }
    Update(oRes){
      this.isUpdate = true;
       this.form.controls.Id.setValue(oRes['id']);
       this.form.controls.SkillCode.setValue(oRes['skillCode']);
       this.form.controls.SkillName.setValue(oRes['skillName']);
       this.form.controls.CreatedBy.setValue(oRes['createdBy']);
       this.form.controls.flgActive.setValue(oRes['flgActive']);
       this.form.controls.UpdatedBy.setValue(oRes['updatedBy']);
      

     }
}
