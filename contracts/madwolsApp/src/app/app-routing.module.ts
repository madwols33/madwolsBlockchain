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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cupCoffee', component: cupCoffeeComponent },
  { path: 'Coffee', component: CoffeeComponent },
  { path: 'Regulator', component: RegulatorComponent },
  { path: 'Grower', component: GrowerComponent },
  { path: 'Trader', component: TraderComponent },
  { path: 'Shipper', component: ShipperComponent },
  { path: 'Retailer', component: RetailerComponent },
  { path: 'addCoffee', component: addCoffeeComponent },
  { path: 'pourCup', component: pourCupComponent },
  { path: 'submitFairTradeData', component: submitFairTradeDataComponent },
  { path: 'submitPackingList', component: submitPackingListComponent },
  { path: 'submitInboundWeightTally', component: submitInboundWeightTallyComponent },
  { path: 'submitCupping', component: submitCuppingComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
