import {
  NgModule,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Characters } from './pages/characters/characters';
import { MonsterComponent } from './pages/monsters/monsters';
import { DungeonsComponent } from './pages/dungeons/dungeons';
import { ItemsComponent } from './pages/items/items';

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
import { CustomDirective } from './directives/customThingsDirective';
import { Maps } from './pages/maps/maps';
import { CustomProfileForm } from './custom-profile-form/custom-profile-form';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BossesComponent } from './pages/bosses/bosses';
import { PlacesComponent } from './pages/places/places';
import { SocialComponent } from './pages/social-component/social-component';
import { errorHandlingInterceptor } from './services/error-handling-interceptor-interceptor';

@NgModule({
  declarations: [
    App,
    Characters,
    MonsterComponent,
    BossesComponent,
    DungeonsComponent,
    ItemsComponent,
    Home,
    Entity,
    Profile,
    ReactiveProfile,
    TemplateProfile,
    CustomInput,
    FQAs,
    CustomDirective,
    Maps,
    CustomProfileForm,
    PlacesComponent,
    SocialComponent,
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
    provideClientHydration(withEventReplay()),
    provideHttpClient( withInterceptors([errorHandlingInterceptor])),
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: CustomInput ,
    },
  ],
  bootstrap: [App],
})
export class AppModule {}
