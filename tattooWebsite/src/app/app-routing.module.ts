// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { Espaco3dComponent } from './views/espaco3d/espaco3d.component';
import { PricingComponent } from './views/pricing/pricing.component';
import { WorkComponent } from './views/work/work.component';
import { FooterComponent } from './views/footer/footer.component';
import { NavbarComponent } from './views/navbar/navbar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'espaco3d', component: Espaco3dComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'work', component: WorkComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'navbar', component: NavbarComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
