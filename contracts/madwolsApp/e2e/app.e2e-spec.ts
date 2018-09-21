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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for madwolsApp', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be madwolsApp', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('madwolsApp');
    })
  });

  it('network-name should be madwolscoffetracker@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('madwolscoffetracker@0.0.1.bna');
    });
  });

  it('navbar-brand should be madwolsApp',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('madwolsApp');
    });
  });

  
    it('cupCoffee component should be loadable',() => {
      page.navigateTo('/cupCoffee');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('cupCoffee');
      });
    });

    it('cupCoffee table should have 7 columns',() => {
      page.navigateTo('/cupCoffee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(7); // Addition of 1 for 'Action' column
      });
    });
  
    it('Coffee component should be loadable',() => {
      page.navigateTo('/Coffee');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Coffee');
      });
    });

    it('Coffee table should have 40 columns',() => {
      page.navigateTo('/Coffee');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(40); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('Regulator component should be loadable',() => {
      page.navigateTo('/Regulator');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Regulator');
      });
    });

    it('Regulator table should have 4 columns',() => {
      page.navigateTo('/Regulator');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Grower component should be loadable',() => {
      page.navigateTo('/Grower');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Grower');
      });
    });

    it('Grower table should have 5 columns',() => {
      page.navigateTo('/Grower');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('Trader component should be loadable',() => {
      page.navigateTo('/Trader');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Trader');
      });
    });

    it('Trader table should have 4 columns',() => {
      page.navigateTo('/Trader');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Shipper component should be loadable',() => {
      page.navigateTo('/Shipper');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Shipper');
      });
    });

    it('Shipper table should have 4 columns',() => {
      page.navigateTo('/Shipper');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  
    it('Retailer component should be loadable',() => {
      page.navigateTo('/Retailer');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('Retailer');
      });
    });

    it('Retailer table should have 4 columns',() => {
      page.navigateTo('/Retailer');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('addCoffee component should be loadable',() => {
      page.navigateTo('/addCoffee');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('addCoffee');
      });
    });
  
    it('pourCup component should be loadable',() => {
      page.navigateTo('/pourCup');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('pourCup');
      });
    });
  
    it('submitFairTradeData component should be loadable',() => {
      page.navigateTo('/submitFairTradeData');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('submitFairTradeData');
      });
    });
  
    it('submitPackingList component should be loadable',() => {
      page.navigateTo('/submitPackingList');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('submitPackingList');
      });
    });
  
    it('submitInboundWeightTally component should be loadable',() => {
      page.navigateTo('/submitInboundWeightTally');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('submitInboundWeightTally');
      });
    });
  
    it('submitCupping component should be loadable',() => {
      page.navigateTo('/submitCupping');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('submitCupping');
      });
    });
  

});