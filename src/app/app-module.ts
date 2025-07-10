import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Characters } from './pages/characters/characters';
import { Monsters } from './pages/monsters/monsters';
import { Bosses } from './pages/bosses/bosses';
import { Dungeons } from './pages/dungeons/dungeons';
import { Items } from './pages/items/items';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Home } from './pages/home/home';
import { Entity } from './entity/entity';
import { Profile } from './pages/profile/profile';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveProfile } from './reactive-profile/reactive-profile';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateProfile } from './template-profile/template-profile';
import { CustomInput } from './custom-input/custom-input';
import { FQAs } from './pages/fqas/fqas';
import { OnlyNumbersDirective } from './directives/only-numbers-directive';

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
    Profile,
    ReactiveProfile,
    TemplateProfile,
    CustomInput,
    FQAs,
    OnlyNumbersDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [

    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CustomInput },
  ],
  bootstrap: [App],
})
export class AppModule {}
