import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PracticalComponent } from './practical/practical.component';

const routes: Routes = [
  { path: "", redirectTo: "/practical", pathMatch: "full" },
  { path: "practical", component: PracticalComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
