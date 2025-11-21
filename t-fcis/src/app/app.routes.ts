import { Routes } from '@angular/router';
import { PlotListComponent } from './mobile/plot-list/plot-list';
import { PlotDetailComponent } from './mobile/plot-detail/plot-detail';
import { TreeTallyComponent } from './mobile/tree-tally/tree-tally';

export const routes: Routes = [
  { path: '', redirectTo: 'plots', pathMatch: 'full' },
  { path: 'plots', component: PlotListComponent },
  { path: 'plot/:id', component: PlotDetailComponent },
  { path: 'plot/:id/tally', component: TreeTallyComponent },
];
