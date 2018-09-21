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
import { submitCuppingService } from './submitCupping.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-submitcupping',
  templateUrl: './submitCupping.component.html',
  styleUrls: ['./submitCupping.component.css'],
  providers: [submitCuppingService]
})
export class submitCuppingComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  coffeeBatch = new FormControl('', Validators.required);
  date = new FormControl('', Validators.required);
  cupper = new FormControl('', Validators.required);
  aroma = new FormControl('', Validators.required);
  flavor = new FormControl('', Validators.required);
  afterTaste = new FormControl('', Validators.required);
  acidity = new FormControl('', Validators.required);
  body = new FormControl('', Validators.required);
  finalScore = new FormControl('', Validators.required);
  batchId = new FormControl('', Validators.required);
  transactionId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);


  constructor(private servicesubmitCupping: submitCuppingService, fb: FormBuilder) {
    this.myForm = fb.group({
      coffeeBatch: this.coffeeBatch,
      date: this.date,
      cupper: this.cupper,
      aroma: this.aroma,
      flavor: this.flavor,
      afterTaste: this.afterTaste,
      acidity: this.acidity,
      body: this.body,
      finalScore: this.finalScore,
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
    return this.servicesubmitCupping.getAll()
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
      $class: 'org.ibm.coffee.submitCupping',
      'coffeeBatch': this.coffeeBatch.value,
      'date': this.date.value,
      'cupper': this.cupper.value,
      'aroma': this.aroma.value,
      'flavor': this.flavor.value,
      'afterTaste': this.afterTaste.value,
      'acidity': this.acidity.value,
      'body': this.body.value,
      'finalScore': this.finalScore.value,
      'batchId': this.batchId.value,
      'transactionId': this.transactionId.value,
      'timestamp': this.timestamp.value
    };

    this.myForm.setValue({
      'coffeeBatch': null,
      'date': null,
      'cupper': null,
      'aroma': null,
      'flavor': null,
      'afterTaste': null,
      'acidity': null,
      'body': null,
      'finalScore': null,
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });

    return this.servicesubmitCupping.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'coffeeBatch': null,
        'date': null,
        'cupper': null,
        'aroma': null,
        'flavor': null,
        'afterTaste': null,
        'acidity': null,
        'body': null,
        'finalScore': null,
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
      $class: 'org.ibm.coffee.submitCupping',
      'coffeeBatch': this.coffeeBatch.value,
      'date': this.date.value,
      'cupper': this.cupper.value,
      'aroma': this.aroma.value,
      'flavor': this.flavor.value,
      'afterTaste': this.afterTaste.value,
      'acidity': this.acidity.value,
      'body': this.body.value,
      'finalScore': this.finalScore.value,
      'batchId': this.batchId.value,
      'timestamp': this.timestamp.value
    };

    return this.servicesubmitCupping.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.servicesubmitCupping.deleteTransaction(this.currentId)
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

    return this.servicesubmitCupping.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'coffeeBatch': null,
        'date': null,
        'cupper': null,
        'aroma': null,
        'flavor': null,
        'afterTaste': null,
        'acidity': null,
        'body': null,
        'finalScore': null,
        'batchId': null,
        'transactionId': null,
        'timestamp': null
      };

      if (result.coffeeBatch) {
        formObject.coffeeBatch = result.coffeeBatch;
      } else {
        formObject.coffeeBatch = null;
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
      'date': null,
      'cupper': null,
      'aroma': null,
      'flavor': null,
      'afterTaste': null,
      'acidity': null,
      'body': null,
      'finalScore': null,
      'batchId': null,
      'transactionId': null,
      'timestamp': null
    });
  }
}
