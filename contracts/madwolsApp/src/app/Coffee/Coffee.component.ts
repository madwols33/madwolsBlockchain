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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CoffeeService } from './Coffee.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-coffee',
  templateUrl: './Coffee.component.html',
  styleUrls: ['./Coffee.component.css'],
  providers: [CoffeeService]
})
export class CoffeeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  batchId = new FormControl('', Validators.required);
  size = new FormControl('', Validators.required);
  roast = new FormControl('', Validators.required);
  batchState = new FormControl('', Validators.required);
  reportName = new FormControl('', Validators.required);
  organizationDescription = new FormControl('', Validators.required);
  reportYear = new FormControl('', Validators.required);
  fairtradePremiumInvested = new FormControl('', Validators.required);
  investmentTitle1 = new FormControl('', Validators.required);
  investmentAmount1 = new FormControl('', Validators.required);
  investmentTitle2 = new FormControl('', Validators.required);
  investmentAmount2 = new FormControl('', Validators.required);
  investmentTitle3 = new FormControl('', Validators.required);
  investmentAmount3 = new FormControl('', Validators.required);
  PL_Invoice_no = new FormControl('', Validators.required);
  PL_IssueDate = new FormControl('', Validators.required);
  PL_ICO_no = new FormControl('', Validators.required);
  PL_ICO_Lot = new FormControl('', Validators.required);
  PL_FDA_NO = new FormControl('', Validators.required);
  PL_Bill_of_Lading_No = new FormControl('', Validators.required);
  PL_LoadedVessel = new FormControl('', Validators.required);
  PL_VesselVoyage_No = new FormControl('', Validators.required);
  PL_Container_No = new FormControl('', Validators.required);
  PL_Seal_no = new FormControl('', Validators.required);
  PL_timestamp = new FormControl('', Validators.required);
  dateStripped = new FormControl('', Validators.required);
  marks = new FormControl('', Validators.required);
  bagsExpected = new FormControl('', Validators.required);
  condition = new FormControl('', Validators.required);
  insectActivity = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  cupper = new FormControl('', Validators.required);
  aroma = new FormControl('', Validators.required);
  flavor = new FormControl('', Validators.required);
  afterTaste = new FormControl('', Validators.required);
  acidity = new FormControl('', Validators.required);
  body = new FormControl('', Validators.required);
  finalScore = new FormControl('', Validators.required);
  owner = new FormControl('', Validators.required);

  constructor(public serviceCoffee: CoffeeService, fb: FormBuilder) {
    this.myForm = fb.group({
      batchId: this.batchId,
      size: this.size,
      roast: this.roast,
      batchState: this.batchState,
      reportName: this.reportName,
      organizationDescription: this.organizationDescription,
      reportYear: this.reportYear,
      fairtradePremiumInvested: this.fairtradePremiumInvested,
      investmentTitle1: this.investmentTitle1,
      investmentAmount1: this.investmentAmount1,
      investmentTitle2: this.investmentTitle2,
      investmentAmount2: this.investmentAmount2,
      investmentTitle3: this.investmentTitle3,
      investmentAmount3: this.investmentAmount3,
      PL_Invoice_no: this.PL_Invoice_no,
      PL_IssueDate: this.PL_IssueDate,
      PL_ICO_no: this.PL_ICO_no,
      PL_ICO_Lot: this.PL_ICO_Lot,
      PL_FDA_NO: this.PL_FDA_NO,
      PL_Bill_of_Lading_No: this.PL_Bill_of_Lading_No,
      PL_LoadedVessel: this.PL_LoadedVessel,
      PL_VesselVoyage_No: this.PL_VesselVoyage_No,
      PL_Container_No: this.PL_Container_No,
      PL_Seal_no: this.PL_Seal_no,
      PL_timestamp: this.PL_timestamp,
      dateStripped: this.dateStripped,
      marks: this.marks,
      bagsExpected: this.bagsExpected,
      condition: this.condition,
      insectActivity: this.insectActivity,
      date: this.date,
      cupper: this.cupper,
      aroma: this.aroma,
      flavor: this.flavor,
      afterTaste: this.afterTaste,
      acidity: this.acidity,
      body: this.body,
      finalScore: this.finalScore,
      owner: this.owner
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCoffee.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.ibm.coffee.Coffee',
      'batchId': this.batchId.value,
      'size': this.size.value,
      'roast': this.roast.value,
      'batchState': this.batchState.value,
      'reportName': this.reportName.value,
      'organizationDescription': this.organizationDescription.value,
      'reportYear': this.reportYear.value,
      'fairtradePremiumInvested': this.fairtradePremiumInvested.value,
      'investmentTitle1': this.investmentTitle1.value,
      'investmentAmount1': this.investmentAmount1.value,
      'investmentTitle2': this.investmentTitle2.value,
      'investmentAmount2': this.investmentAmount2.value,
      'investmentTitle3': this.investmentTitle3.value,
      'investmentAmount3': this.investmentAmount3.value,
      'PL_Invoice_no': this.PL_Invoice_no.value,
      'PL_IssueDate': this.PL_IssueDate.value,
      'PL_ICO_no': this.PL_ICO_no.value,
      'PL_ICO_Lot': this.PL_ICO_Lot.value,
      'PL_FDA_NO': this.PL_FDA_NO.value,
      'PL_Bill_of_Lading_No': this.PL_Bill_of_Lading_No.value,
      'PL_LoadedVessel': this.PL_LoadedVessel.value,
      'PL_VesselVoyage_No': this.PL_VesselVoyage_No.value,
      'PL_Container_No': this.PL_Container_No.value,
      'PL_Seal_no': this.PL_Seal_no.value,
      'PL_timestamp': this.PL_timestamp.value,
      'dateStripped': this.dateStripped.value,
      'marks': this.marks.value,
      'bagsExpected': this.bagsExpected.value,
      'condition': this.condition.value,
      'insectActivity': this.insectActivity.value,
      'date': this.date.value,
      'cupper': this.cupper.value,
      'aroma': this.aroma.value,
      'flavor': this.flavor.value,
      'afterTaste': this.afterTaste.value,
      'acidity': this.acidity.value,
      'body': this.body.value,
      'finalScore': this.finalScore.value,
      'owner': this.owner.value
    };

    this.myForm.setValue({
      'batchId': null,
      'size': null,
      'roast': null,
      'batchState': null,
      'reportName': null,
      'organizationDescription': null,
      'reportYear': null,
      'fairtradePremiumInvested': null,
      'investmentTitle1': null,
      'investmentAmount1': null,
      'investmentTitle2': null,
      'investmentAmount2': null,
      'investmentTitle3': null,
      'investmentAmount3': null,
      'PL_Invoice_no': null,
      'PL_IssueDate': null,
      'PL_ICO_no': null,
      'PL_ICO_Lot': null,
      'PL_FDA_NO': null,
      'PL_Bill_of_Lading_No': null,
      'PL_LoadedVessel': null,
      'PL_VesselVoyage_No': null,
      'PL_Container_No': null,
      'PL_Seal_no': null,
      'PL_timestamp': null,
      'dateStripped': null,
      'marks': null,
      'bagsExpected': null,
      'condition': null,
      'insectActivity': null,
      'date': null,
      'cupper': null,
      'aroma': null,
      'flavor': null,
      'afterTaste': null,
      'acidity': null,
      'body': null,
      'finalScore': null,
      'owner': null
    });

    return this.serviceCoffee.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'batchId': null,
        'size': null,
        'roast': null,
        'batchState': null,
        'reportName': null,
        'organizationDescription': null,
        'reportYear': null,
        'fairtradePremiumInvested': null,
        'investmentTitle1': null,
        'investmentAmount1': null,
        'investmentTitle2': null,
        'investmentAmount2': null,
        'investmentTitle3': null,
        'investmentAmount3': null,
        'PL_Invoice_no': null,
        'PL_IssueDate': null,
        'PL_ICO_no': null,
        'PL_ICO_Lot': null,
        'PL_FDA_NO': null,
        'PL_Bill_of_Lading_No': null,
        'PL_LoadedVessel': null,
        'PL_VesselVoyage_No': null,
        'PL_Container_No': null,
        'PL_Seal_no': null,
        'PL_timestamp': null,
        'dateStripped': null,
        'marks': null,
        'bagsExpected': null,
        'condition': null,
        'insectActivity': null,
        'date': null,
        'cupper': null,
        'aroma': null,
        'flavor': null,
        'afterTaste': null,
        'acidity': null,
        'body': null,
        'finalScore': null,
        'owner': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.ibm.coffee.Coffee',
      'size': this.size.value,
      'roast': this.roast.value,
      'batchState': this.batchState.value,
      'reportName': this.reportName.value,
      'organizationDescription': this.organizationDescription.value,
      'reportYear': this.reportYear.value,
      'fairtradePremiumInvested': this.fairtradePremiumInvested.value,
      'investmentTitle1': this.investmentTitle1.value,
      'investmentAmount1': this.investmentAmount1.value,
      'investmentTitle2': this.investmentTitle2.value,
      'investmentAmount2': this.investmentAmount2.value,
      'investmentTitle3': this.investmentTitle3.value,
      'investmentAmount3': this.investmentAmount3.value,
      'PL_Invoice_no': this.PL_Invoice_no.value,
      'PL_IssueDate': this.PL_IssueDate.value,
      'PL_ICO_no': this.PL_ICO_no.value,
      'PL_ICO_Lot': this.PL_ICO_Lot.value,
      'PL_FDA_NO': this.PL_FDA_NO.value,
      'PL_Bill_of_Lading_No': this.PL_Bill_of_Lading_No.value,
      'PL_LoadedVessel': this.PL_LoadedVessel.value,
      'PL_VesselVoyage_No': this.PL_VesselVoyage_No.value,
      'PL_Container_No': this.PL_Container_No.value,
      'PL_Seal_no': this.PL_Seal_no.value,
      'PL_timestamp': this.PL_timestamp.value,
      'dateStripped': this.dateStripped.value,
      'marks': this.marks.value,
      'bagsExpected': this.bagsExpected.value,
      'condition': this.condition.value,
      'insectActivity': this.insectActivity.value,
      'date': this.date.value,
      'cupper': this.cupper.value,
      'aroma': this.aroma.value,
      'flavor': this.flavor.value,
      'afterTaste': this.afterTaste.value,
      'acidity': this.acidity.value,
      'body': this.body.value,
      'finalScore': this.finalScore.value,
      'owner': this.owner.value
    };

    return this.serviceCoffee.updateAsset(form.get('batchId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCoffee.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCoffee.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'batchId': null,
        'size': null,
        'roast': null,
        'batchState': null,
        'reportName': null,
        'organizationDescription': null,
        'reportYear': null,
        'fairtradePremiumInvested': null,
        'investmentTitle1': null,
        'investmentAmount1': null,
        'investmentTitle2': null,
        'investmentAmount2': null,
        'investmentTitle3': null,
        'investmentAmount3': null,
        'PL_Invoice_no': null,
        'PL_IssueDate': null,
        'PL_ICO_no': null,
        'PL_ICO_Lot': null,
        'PL_FDA_NO': null,
        'PL_Bill_of_Lading_No': null,
        'PL_LoadedVessel': null,
        'PL_VesselVoyage_No': null,
        'PL_Container_No': null,
        'PL_Seal_no': null,
        'PL_timestamp': null,
        'dateStripped': null,
        'marks': null,
        'bagsExpected': null,
        'condition': null,
        'insectActivity': null,
        'date': null,
        'cupper': null,
        'aroma': null,
        'flavor': null,
        'afterTaste': null,
        'acidity': null,
        'body': null,
        'finalScore': null,
        'owner': null
      };

      if (result.batchId) {
        formObject.batchId = result.batchId;
      } else {
        formObject.batchId = null;
      }

      if (result.size) {
        formObject.size = result.size;
      } else {
        formObject.size = null;
      }

      if (result.roast) {
        formObject.roast = result.roast;
      } else {
        formObject.roast = null;
      }

      if (result.batchState) {
        formObject.batchState = result.batchState;
      } else {
        formObject.batchState = null;
      }

      if (result.reportName) {
        formObject.reportName = result.reportName;
      } else {
        formObject.reportName = null;
      }

      if (result.organizationDescription) {
        formObject.organizationDescription = result.organizationDescription;
      } else {
        formObject.organizationDescription = null;
      }

      if (result.reportYear) {
        formObject.reportYear = result.reportYear;
      } else {
        formObject.reportYear = null;
      }

      if (result.fairtradePremiumInvested) {
        formObject.fairtradePremiumInvested = result.fairtradePremiumInvested;
      } else {
        formObject.fairtradePremiumInvested = null;
      }

      if (result.investmentTitle1) {
        formObject.investmentTitle1 = result.investmentTitle1;
      } else {
        formObject.investmentTitle1 = null;
      }

      if (result.investmentAmount1) {
        formObject.investmentAmount1 = result.investmentAmount1;
      } else {
        formObject.investmentAmount1 = null;
      }

      if (result.investmentTitle2) {
        formObject.investmentTitle2 = result.investmentTitle2;
      } else {
        formObject.investmentTitle2 = null;
      }

      if (result.investmentAmount2) {
        formObject.investmentAmount2 = result.investmentAmount2;
      } else {
        formObject.investmentAmount2 = null;
      }

      if (result.investmentTitle3) {
        formObject.investmentTitle3 = result.investmentTitle3;
      } else {
        formObject.investmentTitle3 = null;
      }

      if (result.investmentAmount3) {
        formObject.investmentAmount3 = result.investmentAmount3;
      } else {
        formObject.investmentAmount3 = null;
      }

      if (result.PL_Invoice_no) {
        formObject.PL_Invoice_no = result.PL_Invoice_no;
      } else {
        formObject.PL_Invoice_no = null;
      }

      if (result.PL_IssueDate) {
        formObject.PL_IssueDate = result.PL_IssueDate;
      } else {
        formObject.PL_IssueDate = null;
      }

      if (result.PL_ICO_no) {
        formObject.PL_ICO_no = result.PL_ICO_no;
      } else {
        formObject.PL_ICO_no = null;
      }

      if (result.PL_ICO_Lot) {
        formObject.PL_ICO_Lot = result.PL_ICO_Lot;
      } else {
        formObject.PL_ICO_Lot = null;
      }

      if (result.PL_FDA_NO) {
        formObject.PL_FDA_NO = result.PL_FDA_NO;
      } else {
        formObject.PL_FDA_NO = null;
      }

      if (result.PL_Bill_of_Lading_No) {
        formObject.PL_Bill_of_Lading_No = result.PL_Bill_of_Lading_No;
      } else {
        formObject.PL_Bill_of_Lading_No = null;
      }

      if (result.PL_LoadedVessel) {
        formObject.PL_LoadedVessel = result.PL_LoadedVessel;
      } else {
        formObject.PL_LoadedVessel = null;
      }

      if (result.PL_VesselVoyage_No) {
        formObject.PL_VesselVoyage_No = result.PL_VesselVoyage_No;
      } else {
        formObject.PL_VesselVoyage_No = null;
      }

      if (result.PL_Container_No) {
        formObject.PL_Container_No = result.PL_Container_No;
      } else {
        formObject.PL_Container_No = null;
      }

      if (result.PL_Seal_no) {
        formObject.PL_Seal_no = result.PL_Seal_no;
      } else {
        formObject.PL_Seal_no = null;
      }

      if (result.PL_timestamp) {
        formObject.PL_timestamp = result.PL_timestamp;
      } else {
        formObject.PL_timestamp = null;
      }

      if (result.dateStripped) {
        formObject.dateStripped = result.dateStripped;
      } else {
        formObject.dateStripped = null;
      }

      if (result.marks) {
        formObject.marks = result.marks;
      } else {
        formObject.marks = null;
      }

      if (result.bagsExpected) {
        formObject.bagsExpected = result.bagsExpected;
      } else {
        formObject.bagsExpected = null;
      }

      if (result.condition) {
        formObject.condition = result.condition;
      } else {
        formObject.condition = null;
      }

      if (result.insectActivity) {
        formObject.insectActivity = result.insectActivity;
      } else {
        formObject.insectActivity = null;
      }

      if (result.date) {
        formObject.date = result.date;
      } else {
        formObject.date = null;
      }

      if (result.cupper) {
        formObject.cupper = result.cupper;
      } else {
        formObject.cupper = null;
      }

      if (result.aroma) {
        formObject.aroma = result.aroma;
      } else {
        formObject.aroma = null;
      }

      if (result.flavor) {
        formObject.flavor = result.flavor;
      } else {
        formObject.flavor = null;
      }

      if (result.afterTaste) {
        formObject.afterTaste = result.afterTaste;
      } else {
        formObject.afterTaste = null;
      }

      if (result.acidity) {
        formObject.acidity = result.acidity;
      } else {
        formObject.acidity = null;
      }

      if (result.body) {
        formObject.body = result.body;
      } else {
        formObject.body = null;
      }

      if (result.finalScore) {
        formObject.finalScore = result.finalScore;
      } else {
        formObject.finalScore = null;
      }

      if (result.owner) {
        formObject.owner = result.owner;
      } else {
        formObject.owner = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'batchId': null,
      'size': null,
      'roast': null,
      'batchState': null,
      'reportName': null,
      'organizationDescription': null,
      'reportYear': null,
      'fairtradePremiumInvested': null,
      'investmentTitle1': null,
      'investmentAmount1': null,
      'investmentTitle2': null,
      'investmentAmount2': null,
      'investmentTitle3': null,
      'investmentAmount3': null,
      'PL_Invoice_no': null,
      'PL_IssueDate': null,
      'PL_ICO_no': null,
      'PL_ICO_Lot': null,
      'PL_FDA_NO': null,
      'PL_Bill_of_Lading_No': null,
      'PL_LoadedVessel': null,
      'PL_VesselVoyage_No': null,
      'PL_Container_No': null,
      'PL_Seal_no': null,
      'PL_timestamp': null,
      'dateStripped': null,
      'marks': null,
      'bagsExpected': null,
      'condition': null,
      'insectActivity': null,
      'date': null,
      'cupper': null,
      'aroma': null,
      'flavor': null,
      'afterTaste': null,
      'acidity': null,
      'body': null,
      'finalScore': null,
      'owner': null
      });
  }

}
