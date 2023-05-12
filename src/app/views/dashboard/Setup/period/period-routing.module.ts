import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PeriodComponent} from './period.component';
import {PeriodContainersComponent} from "./containers/period-containers.component";
import {PeriodEditComponent, PeriodNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: PeriodComponent,
    children: [
      {
        path: '',
        component: PeriodContainersComponent,
        data:{
          title:'Vehículo'
        }
      },
      {
        path: 'new',
        component: PeriodNewComponent,
        data:{
          title:'Nuevo Vehículo'
        }
      },
      {
        path: 'edit',
        component: PeriodEditComponent,
        data:{
          title:'Editar Vehículo'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodRoutingModule {
}

export const rutedComponents = [
  PeriodContainersComponent,
  PeriodComponent,
];
