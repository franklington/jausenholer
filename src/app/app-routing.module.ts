import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestellenComponent } from './bestellen/bestellen.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'bestellen/:id', component: BestellenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
