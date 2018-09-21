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
import { submitFairTradeDataService } from './submitFairTradeData.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-submitfairtradedata',
  templateUrl: './submitFairTradeData.component.html',
  styleUrls: ['./submitFairTradeData.component.css'],
  providers: [submitFairTradeDataService]
})
export class submitFairTradeDataComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

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
  batchId = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicesubmitFairTradeData: submitFairTradeDataService, fb: FormBuilder) {
    this.myForm = fb.group({
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
      batchId: this.batchId,
      transactionId: this.transactionId,
      timestamp: this.timestamp
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicesubmitFairTradeData.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.ibm.coffee.submitFairTradeData',
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
      'batchId': this.batchId.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
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
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicesubmitFairTradeData.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
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
        'batchId': null,
        'transactionId': null,
        'timestamp': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.errorMessage = error;
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.ibm.coffee.submitFairTradeData',
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
      'batchId': this.batchId.value,
      'timestamp': this.timestamp.value
    };

    return this.servicesubmitFairTradeData.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.servicesubmitFairTradeData.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

    return this.servicesubmitFairTradeData.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
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
        'batchId': null,
        'transactionId': null,
        'timestamp': null
      };

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

      if (result.batchId) {
        formObject.batchId = result.batchId;
      } else {
        formObject.batchId = null;
      }

      if (result.transactionId) {
        formObject.transactionId = result.transactionId;
      } else {
        formObject.transactionId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
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
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
