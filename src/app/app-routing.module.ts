import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormbuildComponent } from './formbuild/formbuild.component';


const routes: Routes = [
  { path: 'forms', component: FormbuildComponent },
  // { path: '', redirectTo: 'forms' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
