import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Team } from './pages/team/team';
import { Spiele } from './pages/spiele/spiele';
import { Kontakt } from './pages/kontakt/kontakt';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'team', component: Team },
    { path: 'spiele', component: Spiele },
    { path: 'kontakt', component: Kontakt },
    { path: '**', redirectTo: '' }
];
