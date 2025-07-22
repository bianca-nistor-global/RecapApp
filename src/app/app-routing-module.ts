import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profile } from './pages/profile/profile';
import { Home } from './pages/home/home';
import { BossesComponent } from './pages/bosses/bosses';
import { Characters } from './pages/characters/characters';
import { DungeonsComponent } from './pages/dungeons/dungeons';
import { ItemsComponent } from './pages/items/items';
import { MonsterComponent } from './pages/monsters/monsters';
import { PlacesComponent } from './pages/places/places';
import { Maps } from './pages/maps/maps';
import { FQAs } from './pages/fqas/fqas';
import { CatGallery } from './pages/cat-gallery/cat-gallery';
import { SocialComponent } from './pages/social-component/social-component';
import { NotFound } from './pages/not-found/not-found';
import { BossDetails } from './pages/boss-details/boss-details';
import { HomeDetails } from './pages/home/home-details/home-details';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'profile', component: Profile },
  { path: 'home', component: Home , children:[{path:'details',component:HomeDetails}]},
  { path: 'bosses', component: BossesComponent , children:[{ path: 'boss-details/:id', component: BossDetails }] },
  { path: 'characters', component: Characters },
  { path: 'dungeons', component: DungeonsComponent },
  { path: 'items', component: ItemsComponent},
  { path: 'monsters', component: MonsterComponent },
  { path: 'place', component: PlacesComponent },
  { path: 'maps', component: Maps },
  { path: 'faq', component: FQAs },
  { path: 'cat', component: CatGallery },
  { path: 'postsAlbums', component: SocialComponent },
  { path: '**', component: NotFound },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
