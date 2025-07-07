import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Characters } from './characters/characters';
import { Monsters } from './monsters/monsters';
import { Bosses } from './bosses/bosses';
import { Dungeons } from './dungeons/dungeons';
import { Items } from './items/items';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Home } from './home/home';
import { Entity } from './entity/entity';
import { Profile } from './profile/profile';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    App,
    Characters,
    Monsters,
    Bosses,
    Dungeons,
    Items,
    Home,
    Entity,
    Profile
  ],
  imports: [
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    BrowserModule,
    MatFormFieldModule, 
    MatInputModule  
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
