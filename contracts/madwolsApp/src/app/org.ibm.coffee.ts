import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.ibm.coffee{
   export enum CoffeeRoast {
      LIGHT,
      MEDIUM,
      DARK,
   }
   export enum Size {
      SMALL,
      MEDIUM,
      LARGE,
   }
   export enum State {
      READY_FOR_DISTRIBUTION,
      ORGANIC_CERTIFICATION_APPROVED,
      REGULATION_TEST_PASSED,
      IMPORTED,
      READY_FOR_SALE,
   }
   export class Address {
      city: string;
      country: string;
      street: string;
      zip: string;
   }
   export class Investment {
      title: string;
      amount: number;
      additionalDescription: string;
   }
   export class Condition {
      condensation: boolean;
      holeInContainer: boolean;
   }
   export abstract class Business extends Participant {
      organization: string;
      address: Address;
   }
   export class Regulator extends Business {
      regulatorId: string;
   }
   export class Grower extends Business {
      isFairTrade: boolean;
      growerId: string;
   }
   export class Trader extends Business {
      traderId: string;
   }
   export class Shipper extends Business {
      shipperId: string;
   }
   export class Retailer extends Business {
      retailerId: string;
   }
   export class cupCoffee extends Asset {
      cupId: string;
      drinkType: string;
      barista: string;
      beanType: string;
      count: number;
      lastPour: string;
   }
   export class Coffee extends Asset {
      batchId: string;
      size: Size;
      roast: CoffeeRoast;
      batchState: State;
      reportName: string;
      organizationDescription: string;
      reportYear: number;
      fairtradePremiumInvested: string;
      investmentTitle1: string;
      investmentAmount1: string;
      investmentTitle2: string;
      investmentAmount2: string;
      investmentTitle3: string;
      investmentAmount3: string;
      PL_Invoice_no: string;
      PL_IssueDate: Date;
      PL_ICO_no: string;
      PL_ICO_Lot: string;
      PL_FDA_NO: string;
      PL_Bill_of_Lading_No: string;
      PL_LoadedVessel: string;
      PL_VesselVoyage_No: string;
      PL_Container_No: string;
      PL_Seal_no: string;
      PL_timestamp: string;
      dateStripped: Date;
      marks: string;
      bagsExpected: number;
      condition: Condition;
      insectActivity: boolean;
      date: Date;
      cupper: string;
      aroma: number;
      flavor: number;
      afterTaste: number;
      acidity: number;
      body: number;
      finalScore: number;
      owner: Business;
   }
   export class addCoffee extends Transaction {
      size: Size;
      roast: CoffeeRoast;
      batchState: State;
      grower: Grower;
   }
   export class pourCup extends Transaction {
      cupId: string;
      timeStamp: string;
   }
   export abstract class transferCoffee extends Transaction {
      batchId: string;
   }
   export class submitFairTradeData extends transferCoffee {
      reportName: string;
      organizationDescription: string;
      reportYear: number;
      fairtradePremiumInvested: string;
      investmentTitle1: string;
      investmentAmount1: string;
      investmentTitle2: string;
      investmentAmount2: string;
      investmentTitle3: string;
      investmentAmount3: string;
   }
   export class submitPackingList extends transferCoffee {
      grower: Business;
      trader: Business;
      PL_Invoice_no: string;
      PL_IssueDate: Date;
      PL_ICO_no: string;
      PL_ICO_Lot: string;
      PL_FDA_NO: string;
      PL_Bill_of_Lading_No: string;
      PL_LoadedVessel: string;
      PL_VesselVoyage_No: string;
      PL_Container_No: string;
      PL_Seal_no: string;
      PL_timestamp: string;
   }
   export class submitInboundWeightTally extends transferCoffee {
      coffeeBatch: Coffee;
      dateStripped: Date;
      marks: string;
      bagsExpected: number;
      condition: Condition;
      insectActivity: boolean;
   }
   export class submitCupping extends transferCoffee {
      coffeeBatch: Coffee;
      date: Date;
      cupper: string;
      aroma: number;
      flavor: number;
      afterTaste: number;
      acidity: number;
      body: number;
      finalScore: number;
   }
   export class getPackingList extends Event {
      grower: Business;
      consignee: Business;
      PL_Invoice_no: string;
      PL_IssueDate: Date;
      PL_ICO_no: string;
      PL_ICO_Lot: string;
      PL_FDA_NO: string;
      PL_Bill_of_Lading_No: string;
      PL_LoadedVessel: string;
      PL_VesselVoyage_No: string;
      PL_Container_No: string;
      PL_Seal_no: string;
      PL_timestamp: string;
      batchId: string;
   }
   export class getFairTradeData extends Event {
      reportName: string;
      organizationDescription: string;
      reportYear: number;
      fairtradePremiumInvested: string;
      investmentTitle1: string;
      investmentAmount1: string;
      investmentTitle2: string;
      investmentAmount2: string;
      investmentTitle3: string;
      investmentAmount3: string;
      batchId: string;
   }
   export class getInboundWeightTally extends Event {
      dateStripped: Date;
      marks: string;
      bagsExpected: number;
      condition: Condition;
      insectActivity: boolean;
      batchId: string;
      timeStamp: string;
      asset: Coffee;
   }
   export class getCupping extends Event {
      date: Date;
      cupper: string;
      aroma: number;
      flavor: number;
      afterTaste: number;
      acidity: number;
      body: number;
      finalScore: number;
      batchId: string;
      timeStamp: string;
      asset: Coffee;
   }
   export class cupData extends Event {
      cupId: string;
      drinkType: string;
      barista: string;
      beanType: string;
      count: number;
      lastPour: string;
   }
// }
