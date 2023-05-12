import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PersonComponent} from './person.component';
import {PersonContainersComponent} from "./containers/person-containers.component";
import {PersonEditComponent, PersonNewComponent} from "./components";

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      {
        path: '',
        component: PersonContainersComponent,
        data:{
          title:'Vehículo'
        }
      },
      {
        path: 'new',
        component: PersonNewComponent,
        data:{
          title:'Nuevo Vehículo'
        }
      },
      {
        path: 'edit',
        component: PersonEditComponent,
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
export class PersonRoutingModule {
}

export const rutedComponents = [
  PersonContainersComponent,
  PersonComponent,
];
