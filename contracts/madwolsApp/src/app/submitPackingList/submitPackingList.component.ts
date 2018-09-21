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
import { submitPackingListService } from './submitPackingList.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-submitpackinglist',
  templateUrl: './submitPackingList.component.html',
  styleUrls: ['./submitPackingList.component.css'],
  providers: [submitPackingListService]
})
export class submitPackingListComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  grower = new FormControl('', Validators.required);
  trader = new FormControl('', Validators.required);
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
  batchId = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicesubmitPackingList: submitPackingListService, fb: FormBuilder) {
    this.myForm = fb.group({
      grower: this.grower,
      trader: this.trader,
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
    return this.servicesubmitPackingList.getAll()
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
      $class: 'org.ibm.coffee.submitPackingList',
      'grower': this.grower.value,
      'trader': this.trader.value,
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
      'batchId': this.batchId.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'grower': null,
      'trader': null,
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
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicesubmitPackingList.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'grower': null,
        'trader': null,
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
      $class: 'org.ibm.coffee.submitPackingList',
      'grower': this.grower.value,
      'trader': this.trader.value,
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
      'batchId': this.batchId.value,
      'timestamp': this.timestamp.value
    };

    return this.servicesubmitPackingList.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.servicesubmitPackingList.deleteTransaction(this.currentId)
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

    return this.servicesubmitPackingList.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'grower': null,
        'trader': null,
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
        'batchId': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.grower) {
        formObject.grower = result.grower;
      } else {
        formObject.grower = null;
      }

      if (result.trader) {
        formObject.trader = result.trader;
      } else {
        formObject.trader = null;
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
      'grower': null,
      'trader': null,
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
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
