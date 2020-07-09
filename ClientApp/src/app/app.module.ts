import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { WizardComponent } from './wizard/wizard.component';
import { WizardStepBarComponent } from './wizard/wizard-step-bar/wizard-step-bar.component';
import { WizardStepBarLinkComponent } from './wizard/wizard-step-bar-link/wizard-step-bar-link.component';
import { WizardStepDetailsComponent } from './wizard/wizard-step-details/wizard-step-details.component';
import { WizardStepItemComponent } from './wizard/wizard-step-item/wizard-step-item.component';
import { EmptyStringValidatorDirective } from './directives/empty-string.validator';
import { WizardAddeditStepItemComponent } from './wizard/wizard-addedit-step-item/wizard-addedit-step-item.component';
import { WizardStepPagingComponent } from './wizard/wizard-step-paging/wizard-step-paging.component';
import { WizardStepService } from './services/wizard-step.service';
import { WizardStepItemService } from './services/wizard-step-item.service';
import { HttpErrorInterceptor } from './http.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    WizardComponent,
    WizardStepBarComponent,
    WizardStepBarLinkComponent,
    WizardStepDetailsComponent,
    WizardStepItemComponent,
    EmptyStringValidatorDirective,
    WizardAddeditStepItemComponent,
    WizardStepPagingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ])
  ],
  providers: [
    WizardStepService,
    WizardStepItemService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
