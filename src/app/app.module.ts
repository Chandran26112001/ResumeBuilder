import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Form1Component } from './form1/form1.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PreviewComponent } from './preview/preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Form1Component,
    DashboardComponent,
    PreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatToolbarModule, MatStepperModule, MatButtonModule, MatIconModule, BrowserAnimationsModule, MatInputModule, MatFormFieldModule, MatListModule, FlexLayoutModule,
    FormsModule, MatFormFieldModule, ReactiveFormsModule, MatDatepickerModule, MatNativeDateModule, MatSelectModule, HttpClientModule
  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }
    },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
