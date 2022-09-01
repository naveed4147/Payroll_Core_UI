import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { INavData } from '@coreui/angular';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  constructor(
    private route:Router
  ) { }

   navItems2: INavData[] = [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'info',
        text: 'NEW'
      }
    },
    // {
    //   name: true,
    //   name: 'Theme'
    // },
    // {
    //   name: 'Colors',
    //   url: '/theme/colors',
    //   icon: 'icon-drop'
    // },
    // {
    //   name: 'Typography',
    //   url: '/theme/typography',
    //   icon: 'icon-pencil'
    // },
    {
      title: true,
      name: 'Components'
    },
    {
      name: 'Administration',
      url: '/administration',
      icon: 'icon-puzzle',
      //branches
      children: [
       
    { url: '/administration/create-user', name: 'User Profile', icon: 'fa fa-user'},
    { url: '/administration/create-department', name: 'Departments', icon: 'fa fa-building'},
    { url: '/administration/roles', name: 'Roles', icon: 'fa fa-tasks'},
    { url: '/administration/skills', name: 'Skills', icon: 'fa fa-id-badge'},
    { url: '/administration/qualification', name: 'Qualifications', icon: 'fa fa-graduation-cap'},
    { url: '/administration/designation', name: 'Designation', icon: 'fa fa-level-up'},
    { url: '/administration/empcategory', name: 'Employee category', icon: 'fa fa-list-alt'},
    { url: '/administration/shifts', name: 'Shifts', icon: 'fa fa-arrows'},
    { url: '/administration/medicalinsurance', name: 'medicalinsurance', icon: 'fa fa-user-md'},
    { url: '/administration/payperiod', name: 'Pay period', icon: 'fa fa-money'},
    { url: '/administration/empbelongings', name: 'Employee belongings', icon: 'fa fa-user-circle-o'},
    { url: '/administration/empcosts', name: 'Employee Costs', icon: 'fa fa-user-circle'},
    { url: '/administration/custoutsource', name: 'Cust Outsource', icon: 'fa fa-hand-o-right'},
    { url: '/administration/payelement', name: 'Pay Element', icon: 'fa fa-money'},
    { url: '/administration/loan', name: 'loan', icon: 'fa fa-money'},

    { url: '/administration/leaves', name: 'Leaves', icon: 'fa fa-house-person-leave'},
    { url: '/administration/trainings', name: 'Trainings', icon: 'fa fa-house-person-leave'},
    { url: '/administration/costcenters', name: 'Cost Centers', icon: 'fa fa-money' },
    { url: '/administration/jobdescription', name: 'Job Description', icon: 'fa fa-money' },
    { url: '/administration/employees', name: 'Employees', icon: 'fa fa-money' },


       
      ]
    },
    // {
    //   name: 'Buttons',
    //   url: '/buttons',
    //   icon: 'icon-cursor',
    //   children: [
    //     {
    //       name: 'Buttons',
    //       url: '/buttons/buttons',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Dropdowns',
    //       url: '/buttons/dropdowns',
    //       icon: 'icon-cursor'
    //     },
    //     {
    //       name: 'Brand Buttons',
    //       url: '/buttons/brand-buttons',
    //       icon: 'icon-cursor'
    //     }
    //   ]
    // },
    {
      name: 'Charts',
      url: '/charts',
      icon: 'icon-pie-chart'
    },
    // {
    //   name: 'Icons',
    //   url: '/icons',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'CoreUI Icons',
    //       url: '/icons/coreui-icons',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'success',
    //         text: 'NEW'
    //       }
    //     },
    //     {
    //       name: 'Flags',
    //       url: '/icons/flags',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Font Awesome',
    //       url: '/icons/font-awesome',
    //       icon: 'icon-star',
    //       badge: {
    //         variant: 'secondary',
    //         text: '4.7'
    //       }
    //     },
    //     {
    //       name: 'Simple Line Icons',
    //       url: '/icons/simple-line-icons',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    // {
    //   name: 'Notifications',
    //   url: '/notifications',
    //   icon: 'icon-bell',
    //   children: [
    //     {
    //       name: 'Alerts',
    //       url: '/notifications/alerts',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Badges',
    //       url: '/notifications/badges',
    //       icon: 'icon-bell'
    //     },
    //     {
    //       name: 'Modals',
    //       url: '/notifications/modals',
    //       icon: 'icon-bell'
    //     }
    //   ]
    // },
    // {
    //   name: 'Widgets',
    //   url: '/widgets',
    //   icon: 'icon-calculator',
    //   badge: {
    //     variant: 'info',
    //     text: 'NEW'
    //   }
    // },
    // {
    //   divider: true
    // },
    // {
    //   name: true,
    //   name: 'Extras',
    // }

  ];
  public sidebarMinimized = false;
  public navItems = this.navItems2;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  ngOnInit(): void {
    let token = localStorage.getItem('APK_LOG');
    if(token == null){
     this.route.navigateByUrl('/');
    }
  }
  logout(){
    localStorage.removeItem('APK_LOG');
    this.route.navigateByUrl('/');
  }
}
