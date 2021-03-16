import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { CabinetComponent } from './components/cabinet/cabinet.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ShopComponent } from './components/shop/shop.component';
import { SneakerDetailComponent } from './components/sneaker-detail/sneaker-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/shop', pathMatch: 'full'},
  { path: 'shop', component: ShopComponent, canActivate: [AuthGuard] },
  { path: 'cabinet', component: CabinetComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'sneakers/:id', component: SneakerDetailComponent, canActivate: [AuthGuard] },
  { path: 'registration', component: RegistrationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
