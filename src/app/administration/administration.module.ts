import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersComponent } from './users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DepartmentsComponent } from './departments/departments.component';
import { RolesComponent } from './roles/roles.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SkillsComponent } from './skills/skills.component';
import { QualificationComponent } from './qualification/qualification.component';
import { DesignationComponent } from './designation/designation.component';
import { empCategoriesComponent } from './empCategories/empCategories.component';
import { shiftsComponent } from './shifts/shifts.component';
import { MedicalInsuranceComponent } from './medicalInsurance/medicalInsurance.component';
import { PayperiodComponent } from './payperiod/payperiod.component';
import { EmpBelongingsComponent } from './empBelongings/empBelongings.component';
import { EmpcostsComponent } from './empcosts/empcosts.component';
import { CustOutsourcingComponent } from './custOutsourcing/custOutsourcing.component';
import { PayelementsComponent } from './payelements/payelements.component';
import { LoanComponent } from './loan/loan.component';
import { LeaveComponent } from './leave/leave.component';
import { TrainingComponent } from './training/training.component';
import { CostCentersComponent } from './costCenters/costCenters.component';
import { JobDescriptionComponent } from './jobDescription/jobDescription.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [
    UsersComponent,
    DepartmentsComponent,
    RolesComponent,
SkillsComponent,
QualificationComponent,
DesignationComponent,
empCategoriesComponent,
shiftsComponent,
MedicalInsuranceComponent,
PayperiodComponent,
EmpBelongingsComponent,
EmpcostsComponent,
CustOutsourcingComponent,
PayelementsComponent,
LoanComponent,
LeaveComponent,
TrainingComponent,
CostCentersComponent,
JobDescriptionComponent,
EmployeesComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
  ],
  providers:[
    DatePipe
  ]
})
export class AdministrationModule { }
