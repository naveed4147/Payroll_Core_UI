import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CostCentersComponent } from './costCenters/costCenters.component';
import { CustOutsourcingComponent } from './custOutsourcing/custOutsourcing.component';
import { DepartmentsComponent } from './departments/departments.component';
import { DesignationComponent } from './designation/designation.component';
import { EmpBelongingsComponent } from './empBelongings/empBelongings.component';
import { empCategoriesComponent } from './empCategories/empCategories.component';
import { EmpcostsComponent } from './empcosts/empcosts.component';
import { EmployeesComponent } from './employees/employees.component';
import { JobDescriptionComponent } from './jobDescription/jobDescription.component';
import { LeaveComponent } from './leave/leave.component';
import { LoanComponent } from './loan/loan.component';
import { MedicalInsuranceComponent } from './medicalInsurance/medicalInsurance.component';
import { PayelementsComponent } from './payelements/payelements.component';
import { PayperiodComponent } from './payperiod/payperiod.component';
import { QualificationComponent } from './qualification/qualification.component';
import { RolesComponent } from './roles/roles.component';
import { shiftsComponent } from './shifts/shifts.component';
import { SkillsComponent } from './skills/skills.component';
import { TrainingComponent } from './training/training.component';

import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: 'create-user', component: UsersComponent}, 
  {path: 'create-department', component: DepartmentsComponent}, 
  {path: 'roles', component: RolesComponent}, 
  {path: 'skills', component: SkillsComponent}, 
  {path: 'qualification', component: QualificationComponent}, 
  {path: 'designation', component: DesignationComponent}, 
  {path: 'empcategory', component: empCategoriesComponent},
  {path: 'shifts', component: shiftsComponent}, 
  {path: 'medicalinsurance', component: MedicalInsuranceComponent},
  {path: 'payperiod', component: PayperiodComponent},
  {path: 'empbelongings', component: EmpBelongingsComponent},
  {path: 'empcosts', component: EmpcostsComponent},
  {path: 'custoutsource', component: CustOutsourcingComponent},
  {path: 'payelement', component: PayelementsComponent},
  {path: 'loan', component: LoanComponent},
  {path: 'leaves', component: LeaveComponent},
  {path: 'trainings', component: TrainingComponent},
  {path: 'costcenters', component: CostCentersComponent},
  {path: 'jobdescription', component: JobDescriptionComponent},
  {path: 'employees', component: EmployeesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
