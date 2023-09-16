import Dashboard from "./CustomerPanel/js/Dashboard";
import Newpartnerchangeops from "./Operation_panel/Js/Newpartnerchangeops";
import Login from "./Login_Registration/Login";
import { Navbar } from "./Common/Navbar";
import Errorpage from "./Errorpage";
import Maintance from "./maintaince";
import Test from "./Test";
import UploadCSV from "./ProcessingCenter/Js/UploadCSV";
import Vehicle from "./ProcessingCenter/Js/Vehicle";
import Home from "./ProcessingCenter/Js/Home";
import Support from "./ProcessingCenter/Js/Support";
import Pickuprequest from "./ProcessingCenter/Js/Pickuprequest";
import Bagcreation from "./ProcessingCenter/Js/BagCreation";
import Bagcreationdc from "./DC_panel/JS/Bagcreationdc";
import Product from "./ProcessingCenter/Js/Productassign";
import Productdc from "./DC_panel/JS/Productdc";
import Returnproductassign from "./ProcessingCenter/Js/Returnproductassign";
import CenterChangePc from "./ProcessingCenter/Js/CenterChangePc";
import Homeopstable from "./ProcessingCenter/Js/Homeopstable";
import OverallPerformance from "./Operation_panel/Js/OverallPerformance";
import MonitorProduct from "./Operation_panel/Js/MonitorProduct";
import Scanner from "./ProcessingCenter/Js/Scanner";
import Own from "./ProcessingCenter/Js/Ownvehicle";
import Plvehicle from "./ProcessingCenter/Js/3plvehicle";
import Confirmsingleproduct from "./ProcessingCenter/Js/Confirmsingleproduct";
import { LoginContextProvider } from "./Context/loginContext";
import { SearchContextProvider } from "./Context/searchContext";
import { SearchButtonContextProvider } from "./Context/buttonContext";
import Reroutebagcreation from "./ProcessingCenter/Js/RerouteBagCreation";
import HomeC from "./CustomerPanel/js/Home";
import Parceltracking from "./CustomerPanel/js/Parceltracking";
import PickuprequestC from "./CustomerPanel/js/Pickuprequest";
import Payment from "./CustomerPanel/js/Paymentupdate";
import SupportC from "./CustomerPanel/js/Support";
import Reportdownload from "./CustomerPanel/js/Reportdownload";
import Invoicesummaryc from "./CustomerPanel/js/Invoicesummaryc";
import Managepickupstore from "./CustomerPanel/CustomerPanel/js/Managepickupstore";
import Singleproduct from "./CustomerPanel/js/Singleproduct";
import DashboardO from "./Operation_panel/Js/DashboardO";
import HomeO from "./Operation_panel/Js/HomeO";
import LockO from "./Operation_panel/Js/Oproductlock";
import SupportO from "./Operation_panel/Js/Support";
import PickuprequestO from "./Operation_panel/Js/PickUprequestO";
import Oreportdownload from "./Operation_panel/Js/Oreportdownload";
import OClientsla from "./Operation_panel/Js/CLientsla";
import Sla from "./Operation_panel/Js/Sla";
import ODcfeperformance from "./Operation_panel/Js/DcFeperformanceO";
import Oreturnsla from "./Operation_panel/Js/ReturnslaO";
import Odeliverysla from "./Operation_panel/Js/DeliveryslaO";
import OFda from "./Operation_panel/Js/Fdao";
import Ohold from "./Operation_panel/Js/TotalholdO";
import Opending from "./Operation_panel/Js/Pendingcodo";
import Olost from "./Operation_panel/Js/TotallostO";
import Oreturn from "./Operation_panel/Js/totalreturnO";
import Ovolume from "./Operation_panel/Js/volumeO";
import Odcpccontrol from "./Operation_panel/Js/DcpccontrolpanelO";
import Datefiltering from "./Operation_panel/Js/DatefilteringO";
import Otp from "./Operation_panel/Js/Otp";
import Reportdownloadacc from "./Accounts_Panel/js/Reportdownloadacc";
import ClientProfile from "./Sales_panel/Js/Clientprofile";
import SalesPickup from "./Sales_panel/Js/SalesPickUprequest";
import SalesSupport from "./Sales_panel/Js/SalesSupport";
import Salesreportdownload from "./Sales_panel/Js/Salesreportdownload";
import SalesPickupform from "./Sales_panel/Js/pickupfor";
import Salesproduct from "./Sales_panel/Js/Salesproduct";
import ClientRegistration from "./Sales_panel/Js/clientregistration";
import Paymentconfirm from "./CustomerPanel/js/Paymentconfirm";
import Parceltrackings from "./Sales_panel/Js/Parceltrackings";
import Parceltrackingwaybill from "./Sales_panel/Js/Parceltrackingwaybill";
import Parceltrackingpc from "./ProcessingCenter/Js/Parceltrackingpc";
import Waybilltrackingsales from "./CustomerPanel/js/Waybilltrackingsales";
import Reportdownloadops from "./Operation_panel/Js/Reportdownloadops";
import FinalEod from "./DC_panel/JS/FinalEod";
import ViewDcPayment from "./DC_panel/JS/ViewDcPayment";
import ViewInvoice from "./Operation_panel/Js/ViewInvoice";
import Wrongcorrection from "./Operation_panel/Js/Wrongcorrection";
import Employeeregops from "./Operation_panel/Js/Employeeregops";
import Monitorbag from "./Operation_panel/Js/Monitorbag";
import PageNotFound from "./PageNotFound";
//import Oclientsla from './Model/operation_content/Oclientsla';
import Lostmarkops from "./Operation_panel/Js/Lostmarkops";
import Confirmpaymentdcacc from "./Accounts_Panel/js/Confirmpaymentdcacc";
import Employeereg from "./HR_Panel/js/Employeereg";
import Employeelist from "./HR_Panel/js/Employyelist";
import Leaveapp from "./HR_Panel/js/Leaveapp";
import Kpi from "./HR_Panel/js/Kpi";
import Shipment from "./Accounts_Panel/js/shipment";
import CustomerDetails from "./Accounts_Panel/js/Customerdetails";
import Billdetails from "./Accounts_Panel/js/Billdetails";
import Generatebill from "./Accounts_Panel/js/Generatebill";
import Confirmpayment from "./Accounts_Panel/js/Confirmpayment";
import FinancialHome from "./Accounts_Panel/js/FinancialHome";
import PendingAmountHome from "./Accounts_Panel/js/PendingAmountHome";
// invoice summary
import InvoiceSummary from "./Accounts_Panel/js/InvoiceSummary";
import InvoiceSummarypaid from "./Accounts_Panel/js/Invoicesummarypaid";
import Duepayment from "./Accounts_Panel/js/Duepayment";
// return api
import Returnedpcreceivedbag from "./ProcessingCenter/Js/Returnedpcreceivedbag";
import ReturnPcBag from "./ProcessingCenter/Js/ReturnPcBag";
import ReturnedProduct from "./ProcessingCenter/Js/ReturnedProduct";
import Returnbagcreation from "./ProcessingCenter/Js/Returnbagcreation";
import Returnvehicle from "./ProcessingCenter/Js/Returnvehicle";
import Confirmreturn from "./CustomerPanel/js/Confirmreturn";
//import Returnvehicle from './ProcessingCenter/Js/Returnvehicle';
import Directrto from "./ProcessingCenter/Js/Directrto";
// dcpanel
import Parcellistdc from "./DC_panel/JS/Parcellistdc";
import Homedc from "./DC_panel/JS/Homedc";
import ReceivedBag from "./DC_panel/JS/ReceivedBag";
import Assigntofe from "./DC_panel/JS/Assigntofe";
import Assigntoferto from "./DC_panel/JS/Assigntoferto";
import Eodstatus from "./DC_panel/JS/Eodstatus";
import Returndc from "./DC_panel/JS/Returndc";
import Returnbag from "./DC_panel/JS/Returnbag";
import Returnproductassigndc from "./DC_panel/JS/Returnproductassigndc";
import Returnvehicledc from "./DC_panel/JS/Returnvehicledc";
import Vehiclecreatedc from "./DC_panel/JS/Vehiclecreatedc";
import Homeopsdc from "./DC_panel/JS/Homeopsdc";
import Unconfirmlist from "./CustomerPanel/js/Unconfirmlist";
import Pendingeodstatus from "./DC_panel/JS/Pendingeodstatus";
import Confirmpaymentdc from "./DC_panel/JS/Confirmpaymentdc";
import DcPerformence from "./DC_panel/JS/DcPerformence";
import Lostmark from "./DC_panel/JS/Lostmark";
import ReRoutedProduct from "./DC_panel/JS/ReRoutedProduct";
import ClientRequestChange from "./DC_panel/JS/ClientRequestChange";
import Threeplstatuschange from "./Operation_panel/Js/Threeplstatuschange";
import Unconfirmpayment from "./Operation_panel/Js/Unconfirmpayment";
import Change from "./Operation_panel/Js/Change";
import OpsDcPerformance from "./Operation_panel/Js/OpsDcPerformance";
import Viewinvoiceacc from "./Accounts_Panel/js/Viewinvoiceacc";
import MultiWaybillSearch from "./Sales_panel/Js/MultiWaybillSearch";
import ClientOtp from "./Sales_panel/Js/ClientOtp";
import Opsadmin from "./Super_Admin_Panel/js/Opsadmin";
import Monitorproductacc from "./Accounts_Panel/js/Monitorproductacc";
import Individualproductlist from "./CustomerPanel/js/Individualproductlist";
//fe panel
import Receiveparcelfe from "./Fe_panel/js/Receiveparcelfe";
import Parceldelivery from "./Fe_panel/js/Parceldelivery";
import ThreePLParcelList from "./ProcessingCenter/Js/ThreePLParcelList";
import ThreePl from "./Operation_panel/Js/ThreePl";
import Confirmpickup from "./ProcessingCenter/Js/Confirmpickup";
import MultipleWaybill from "./Operation_panel/Js/MultipleWaybill";
import Partnerwrongmenifestation from "./ProcessingCenter/Js/Partnerwrongmenifestation";
import Partnerreturn from "./ProcessingCenter/Js/Partnerreturn";
import ParcelTrack from "./Common/ParcelTrack";
import ThreePLParcelListpartnerchange from "./ProcessingCenter/Js/ThreePLParcelListpartnerchange";
import ThreePLParcelListworword from "./ProcessingCenter/Js/ThreePLParcelListworword";
import ThreePLParcelListpartnerchangeops from "./Operation_panel/Js/ThreePLParcelListpartnerchangeops";
import ThreePLParcelListworwordops from "./Operation_panel/Js/ThreePLParcelListworwordops";
import Employeeactive from "./Super_Admin_Panel/js/Employeeactive";
import Newpartnerchange from "./ProcessingCenter/Js/Newpartnerchange";
import Reportdownloaddc from "./DC_panel/JS/Reportdownloaddc";
import Nextdayreceive from "./DC_panel/JS/Nextdayreceive";
import Bagsearch from "./Operation_panel/Js/Bagserch";
export {
  Dashboard,
  Newpartnerchangeops,
  Login,
  Errorpage,
  Navbar,
  Maintance,
  Test,
  UploadCSV,
  Vehicle,
  Home,
  Support,
  Pickuprequest,
  Bagcreation,
  Bagcreationdc,
  Product,
  Productdc,
  Returnproductassign,
  CenterChangePc,
  Homeopstable,
  OverallPerformance,
  MonitorProduct,
  Scanner,
  Own,
  Plvehicle,
  Confirmsingleproduct,
  Reroutebagcreation,
  HomeC,
  Parceltracking,
  PickuprequestC,
  Payment,
  SupportC,
  Reportdownload,
  Invoicesummaryc,
  Managepickupstore,
  Singleproduct,
  DashboardO,
  HomeO,
  LockO,
  SupportO,
  PickuprequestO,
  Oreportdownload,
  OClientsla,
  Sla,
  ODcfeperformance,
  Oreturnsla,
  Odeliverysla,
  OFda,
  Ohold,
  Opending,
  Olost,
  Oreturn,
  Ovolume,
  Odcpccontrol,
  Datefiltering,
  Otp,
  Reportdownloadacc,
  ClientProfile,
  SalesPickup,
  SalesSupport,
  Salesreportdownload,
  SalesPickupform,
  Salesproduct,
  ClientRegistration,
  Paymentconfirm,
  Parceltrackings,
  Parceltrackingwaybill,
  Parceltrackingpc,
  Waybilltrackingsales,
  Reportdownloadops,
  FinalEod,
  ViewDcPayment,
  ViewInvoice,
  Wrongcorrection,
  Employeeregops,
  Monitorbag,
  PageNotFound,
  Lostmarkops,
  Confirmpaymentdcacc,
  Employeereg,
  Employeelist,
  Leaveapp,
  Kpi,
  Shipment,
  CustomerDetails,
  Billdetails,
  Generatebill,
  Confirmpayment,
  FinancialHome,
  PendingAmountHome,
  InvoiceSummary,
  InvoiceSummarypaid,
  Duepayment,
  Returnedpcreceivedbag,
  ReturnPcBag,
  ReturnedProduct,
  Returnbagcreation,
  Returnvehicle,
  Confirmreturn,
  Directrto,
  Parcellistdc,
  Homedc,
  ReceivedBag,
  Assigntofe,
  Assigntoferto,
  Eodstatus,
  Returndc,
  Returnbag,
  Returnproductassigndc,
  Returnvehicledc,
  Vehiclecreatedc,
  Homeopsdc,
  Unconfirmlist,
  Pendingeodstatus,
  Confirmpaymentdc,
  DcPerformence,
  Lostmark,
  ReRoutedProduct,
  ClientRequestChange,
  Threeplstatuschange,
  Unconfirmpayment,
  Change,
  OpsDcPerformance,
  Viewinvoiceacc,
  MultiWaybillSearch,
  ClientOtp,
  Opsadmin,
  Monitorproductacc,
  Individualproductlist,
  Receiveparcelfe,
  Parceldelivery,
  ThreePLParcelList,
  ThreePl,
  Confirmpickup,
  MultipleWaybill,
  Partnerwrongmenifestation,
  Partnerreturn,
  ParcelTrack,
  ThreePLParcelListpartnerchange,
  ThreePLParcelListworword,
  ThreePLParcelListpartnerchangeops,
  ThreePLParcelListworwordops,
  Employeeactive,
  Newpartnerchange,
  Reportdownloaddc,
  Nextdayreceive,
  Bagsearch,
  LoginContextProvider,
  SearchContextProvider,
  SearchButtonContextProvider,
};
