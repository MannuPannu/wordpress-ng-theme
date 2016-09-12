import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { ArticleListComponent } from './components/blog/articlelist/articlelist.component';
import { AboutmeComponent } from './components/aboutme/aboutme.component';
import { GamesComponent } from './components/games/games.component';

const appRoutes: Routes = [
  {
    path: 'wordpress',
    redirectTo: 'wordpress/blog',
    pathMatch: 'full'
  },
  {
    path: 'wordpress/blog', //Same as wordpress application name :)
    component: ArticleListComponent
  },
  {
    path: 'wordpress/games',
    component: GamesComponent
  },
  {
    path: 'wordpress/aboutme', 
    component: AboutmeComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

export const routedComponents: any[] = [ArticleListComponent, GamesComponent, AboutmeComponent];