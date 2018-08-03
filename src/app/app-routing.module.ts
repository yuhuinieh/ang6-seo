import { IndexComponent } from './index/index.component';
import { DorisComponent } from "./doris/doris.component";

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const locale = 'en-US';
const routes: Routes = [
  {path: '', redirectTo: `/${locale}`, pathMatch:'full'},
  {path: ':lang', component: IndexComponent,
   children:[
    {path: 'home', component: IndexComponent},
    {path: 'doris', component: DorisComponent}
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
