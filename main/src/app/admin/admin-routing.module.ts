import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealManageComponent } from './deal-manage/deal-manage.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'deal-management',
        component: DealManageComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
