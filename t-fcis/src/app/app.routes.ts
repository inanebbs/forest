import { Routes } from '@angular/router';
import { PlotListComponent } from './mobile/plot-list/plot-list';
import { PlotDetailComponent } from './mobile/plot-detail/plot-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'plots', pathMatch: 'full' },
  { path: 'plots', component: PlotListComponent },
  { path: 'plot/:id', component: PlotDetailComponent },
];
