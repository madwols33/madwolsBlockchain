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
import { submitInboundWeightTallyService } from './submitInboundWeightTally.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-submitinboundweighttally',
  templateUrl: './submitInboundWeightTally.component.html',
  styleUrls: ['./submitInboundWeightTally.component.css'],
  providers: [submitInboundWeightTallyService]
})
export class submitInboundWeightTallyComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  coffeeBatch = new FormControl('', Validators.required);
  dateStripped = new FormControl('', Validators.required);
  marks = new FormControl('', Validators.required);
  bagsExpected = new FormControl('', Validators.required);
  condition = new FormControl('', Validators.required);
  insectActivity = new FormControl('', Validators.required);
  batchId = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicesubmitInboundWeightTally: submitInboundWeightTallyService, fb: FormBuilder) {
    this.myForm = fb.group({
      coffeeBatch: this.coffeeBatch,
      dateStripped: this.dateStripped,
      marks: this.marks,
      bagsExpected: this.bagsExpected,
      condition: this.condition,
      insectActivity: this.insectActivity,
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
    return this.servicesubmitInboundWeightTally.getAll()
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
      $class: 'org.ibm.coffee.submitInboundWeightTally',
      'coffeeBatch': this.coffeeBatch.value,
      'dateStripped': this.dateStripped.value,
      'marks': this.marks.value,
      'bagsExpected': this.bagsExpected.value,
      'condition': this.condition.value,
      'insectActivity': this.insectActivity.value,
      'batchId': this.batchId.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'coffeeBatch': null,
      'dateStripped': null,
      'marks': null,
      'bagsExpected': null,
      'condition': null,
      'insectActivity': null,
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicesubmitInboundWeightTally.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'coffeeBatch': null,
        'dateStripped': null,
        'marks': null,
        'bagsExpected': null,
        'condition': null,
        'insectActivity': null,
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
      $class: 'org.ibm.coffee.submitInboundWeightTally',
      'coffeeBatch': this.coffeeBatch.value,
      'dateStripped': this.dateStripped.value,
      'marks': this.marks.value,
      'bagsExpected': this.bagsExpected.value,
      'condition': this.condition.value,
      'insectActivity': this.insectActivity.value,
      'batchId': this.batchId.value,
      'timestamp': this.timestamp.value
    };

    return this.servicesubmitInboundWeightTally.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.servicesubmitInboundWeightTally.deleteTransaction(this.currentId)
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

    return this.servicesubmitInboundWeightTally.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'coffeeBatch': null,
        'dateStripped': null,
        'marks': null,
        'bagsExpected': null,
        'condition': null,
        'insectActivity': null,
        'batchId': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.coffeeBatch) {
        formObject.coffeeBatch = result.coffeeBatch;
      } else {
        formObject.coffeeBatch = null;
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
      'coffeeBatch': null,
      'dateStripped': null,
      'marks': null,
      'bagsExpected': null,
      'condition': null,
      'insectActivity': null,
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
