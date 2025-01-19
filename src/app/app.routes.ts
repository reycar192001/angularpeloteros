import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IndexComponent } from './index/index.component';

export const routes: Routes = [
    {path:'',component:MainComponent,title: 'Peloteros'},
    {path:'index',component:IndexComponent},
];
