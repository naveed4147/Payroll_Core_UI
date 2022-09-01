import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InputFieldValidator } from '../../_helper/InputFieldValidator';
import { DepartmentService } from '../../_services/Department.service';
import { DesignationService } from '../../_services/designation.service';
import { QualificationService } from '../../_services/qualification.service';
import { SharedService } from '../../_Services/shared.service';
import { SkillsService } from '../../_services/skills.service';

@Component({
  selector: 'app-jobDescription',
  templateUrl: './jobDescription.component.html',
  styleUrls: ['./jobDescription.component.css']
})
export class JobDescriptionComponent implements OnInit {
  form: UntypedFormGroup;
  submitted: boolean;
  loading: boolean;
  isUpdate: boolean;
  searchData = "";
  BaseURl: string;
  RecordCount: any;
  JobDescriptionsList: any;
  SkillsList: any;
  qualificationList: any;
  DeptList: any;
  DesignationList: any;
 
 
  constructor(
    private formBuilder: UntypedFormBuilder,
    private _inputField: InputFieldValidator,
    private _service:SharedService,
    private toastr:ToastrService,
    private _Skillservice:SkillsService,
    private _Qualificationservice:QualificationService,
    private _Deptservice:DepartmentService,
    private _Desigservice:DesignationService
  ) { }

  ngOnInit(): void {

    
    this.BaseURl = '/JobDescriptions/';
    this.form = this.formBuilder.group({
      Id: [0],
      Code: ['',Validators.required],
      Name: ['', Validators.required],
      Designation: ['',Validators.required],
      SkillCode: ['', Validators.required],
      SkillDescription: ['', Validators.required],
      flgMandatory: [false],
      QualificationCode: ['',Validators.required],
      QualificationName: ['', Validators.required],
      Department: ['', Validators.required],
      Location: ['', Validators.required],
      flgActive: [false],
      CreatedBy: [''],
      UpdatedBy: [''],
      
    });
    this.GetJobDescriptions();
    
  }

  get f() { return this.form.controls; }
  onSubmit() {
    debugger;
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    this.form.controls.flgActive.setValue(Boolean(this.form.controls.flgActive.value));
    this.form.controls.flgMandatory.setValue(Boolean(this.form.controls.flgMandatory.value));

    this.loading = true;
    let Url = this.BaseURl+'PostJobDescription';
    console.log(this.form.value)
    this._service.Post(this.form.value,Url).subscribe({
     next: (res) =>{
        if(res){
          if(res['status']==1){
            this.loading = false;
this.toastr.success(res['message'],"Success");
this.GetJobDescriptions();
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
   
    GetJobDescriptions(){
      let Url = this.BaseURl+'GetJobDescriptions';
      this.loading = true;
      this._service.Get(Url).subscribe(
        res=>{
          if(res){
            debugger
            this.JobDescriptionsList = res;
            this.loading = false;
            this.RecordCount = this.JobDescriptionsList.length;
          }
        },
        err=>{
          debugger
          console.error();
          this.loading = false;
          this.toastr.error("An Error Occured while fetching data!");
        }
      );
      this.getSkillsList();
      this.getQualification();
      this.getDepartmentList();
      this.getDesignation();
    }
    getSkillsList(){
      this.loading = true;
      this._Skillservice.getSkills().subscribe(
        res=>{
          if(res){
            debugger
            this.loading = false;
            this.SkillsList = res;
            //this.RecordCount = this.SkillsList.length;
          }
        },
        err=>{
          debugger
          console.error()
          this.loading = false;
        }
      );
    }
    getQualification(){
      this.loading = true;
      this._Qualificationservice.getQualification().subscribe(
        res=>{
          if(res){
            debugger
            this.qualificationList = res;
            this.loading = false;
            this.RecordCount = this.qualificationList.length;
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
    getDepartmentList(){
      this.loading = true;
      this._Deptservice.getDepartment().subscribe(
        res=>{
          if(res){
            debugger
            this.DeptList = res;
            this.loading = false;
            this.RecordCount = this.DeptList.length;
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
    getDesignation(){
      this.loading = true;
      this._Desigservice.getDesignation().subscribe(
        res=>{
          if(res){
            debugger
            this.DesignationList = res;
            this.loading = false;
            this.RecordCount = this.DesignationList.length;
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
    onSkillsChange($event){
     let val  = $event.target.value;
     let confirm = val.split(': ');
   
      const dt =  this.SkillsList.find(x => x.skillCode == confirm[1]);
      this.form.controls.SkillDescription.setValue(dt['skillName']);
      console.log(dt)
    }
    onQualificationChange($event){
      let val  = $event.target.value;

      let confirm = val.split(': ');
console.log(confirm)
       const dt =  this.qualificationList.find(x => x.qualificaionCode == confirm[1]);
       this.form.controls.QualificationName.setValue(dt['qualificationName']);
  
     }

    Update(oRes){
     this.isUpdate = true;
      this.form.controls.Id.setValue(oRes['id']);
      this.form.controls.Code.setValue(oRes['code']);
      this.form.controls.Name.setValue(oRes['name']);
      this.form.controls.Designation.setValue(oRes['designation']);
      this.form.controls.SkillCode.setValue(oRes['skillCode']);
      this.form.controls.SkillDescription.setValue(oRes['skillDescription']);

      this.form.controls.flgMandatory.setValue(oRes['flgMandatory']);
      this.form.controls.QualificationCode.setValue(oRes['qualificationCode']);
      this.form.controls.QualificationName.setValue(oRes['qualificationName']);
      this.form.controls.Department.setValue(oRes['department']);
      this.form.controls.Location.setValue(oRes['location']);

      this.form.controls.flgActive.setValue(oRes['flgActive']);
      this.form.controls.CreatedBy.setValue(oRes['CreatedBy']);
      this.form.controls.UpdatedBy.setValue(oRes['UpdatedBy']);
    }
   

    
    onlyNumber(event){
      debugger
      return this._inputField.numberOnly(event);
    }
}
