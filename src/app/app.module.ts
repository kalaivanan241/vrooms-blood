import { BloodPipe } from './pipes/blood.pipe';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DonorComponent } from './donor/donor.component';
import { RecipientComponent } from './recipient/recipient.component';

const routes: Routes = [
  {path: '', component: RecipientComponent},
  { path: 'donor', component: DonorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    DonorComponent,
    RecipientComponent,
    BloodPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

