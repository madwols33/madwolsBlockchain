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
import { cupCoffeeService } from './cupCoffee.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-cupcoffee',
  templateUrl: './cupCoffee.component.html',
  styleUrls: ['./cupCoffee.component.css'],
  providers: [cupCoffeeService]
})
export class cupCoffeeComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  cupId = new FormControl('', Validators.required);
  drinkType = new FormControl('', Validators.required);
  barista = new FormControl('', Validators.required);
  beanType = new FormControl('', Validators.required);
  count = new FormControl('', Validators.required);
  lastPour = new FormControl('', Validators.required);

  constructor(public servicecupCoffee: cupCoffeeService, fb: FormBuilder) {
    this.myForm = fb.group({
      cupId: this.cupId,
      drinkType: this.drinkType,
      barista: this.barista,
      beanType: this.beanType,
      count: this.count,
      lastPour: this.lastPour
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicecupCoffee.getAll()
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
      $class: 'org.ibm.coffee.cupCoffee',
      'cupId': this.cupId.value,
      'drinkType': this.drinkType.value,
      'barista': this.barista.value,
      'beanType': this.beanType.value,
      'count': this.count.value,
      'lastPour': this.lastPour.value
    };

    this.myForm.setValue({
      'cupId': null,
      'drinkType': null,
      'barista': null,
      'beanType': null,
      'count': null,
      'lastPour': null
    });

    return this.servicecupCoffee.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'cupId': null,
        'drinkType': null,
        'barista': null,
        'beanType': null,
        'count': null,
        'lastPour': null
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
      $class: 'org.ibm.coffee.cupCoffee',
      'drinkType': this.drinkType.value,
      'barista': this.barista.value,
      'beanType': this.beanType.value,
      'count': this.count.value,
      'lastPour': this.lastPour.value
    };

    return this.servicecupCoffee.updateAsset(form.get('cupId').value, this.asset)
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

    return this.servicecupCoffee.deleteAsset(this.currentId)
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

    return this.servicecupCoffee.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'cupId': null,
        'drinkType': null,
        'barista': null,
        'beanType': null,
        'count': null,
        'lastPour': null
      };

      if (result.cupId) {
        formObject.cupId = result.cupId;
      } else {
        formObject.cupId = null;
      }

      if (result.drinkType) {
        formObject.drinkType = result.drinkType;
      } else {
        formObject.drinkType = null;
      }

      if (result.barista) {
        formObject.barista = result.barista;
      } else {
        formObject.barista = null;
      }

      if (result.beanType) {
        formObject.beanType = result.beanType;
      } else {
        formObject.beanType = null;
      }

      if (result.count) {
        formObject.count = result.count;
      } else {
        formObject.count = null;
      }

      if (result.lastPour) {
        formObject.lastPour = result.lastPour;
      } else {
        formObject.lastPour = null;
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
      'cupId': null,
      'drinkType': null,
      'barista': null,
      'beanType': null,
      'count': null,
      'lastPour': null
      });
  }

}
