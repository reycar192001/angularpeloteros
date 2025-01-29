import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

export const routes: Routes = [
    {path:'',component:MainComponent,title: 'Peloteros'},
    {path:'index',component:IndexComponent,title: 'Menú'},
    {path:'nosotros',component:NosotrosComponent,title: 'Nosotros'},
];