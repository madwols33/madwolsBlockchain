/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { cupCoffeeComponent } from './cupCoffee/cupCoffee.component';
import { CoffeeComponent } from './Coffee/Coffee.component';

import { RegulatorComponent } from './Regulator/Regulator.component';
import { GrowerComponent } from './Grower/Grower.component';
import { TraderComponent } from './Trader/Trader.component';
import { ShipperComponent } from './Shipper/Shipper.component';
import { RetailerComponent } from './Retailer/Retailer.component';

import { addCoffeeComponent } from './addCoffee/addCoffee.component';
import { pourCupComponent } from './pourCup/pourCup.component';
import { submitFairTradeDataComponent } from './submitFairTradeData/submitFairTradeData.component';
import { submitPackingListComponent } from './submitPackingList/submitPackingList.component';
import { submitInboundWeightTallyComponent } from './submitInboundWeightTally/submitInboundWeightTally.component';
import { submitCuppingComponent } from './submitCupping/submitCupping.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    cupCoffeeComponent,
    CoffeeComponent,
    RegulatorComponent,
    GrowerComponent,
    TraderComponent,
    ShipperComponent,
    RetailerComponent,
    addCoffeeComponent,
    pourCupComponent,
    submitFairTradeDataComponent,
    submitPackingListComponent,
    submitInboundWeightTallyComponent,
    submitCuppingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
