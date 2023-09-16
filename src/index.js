import React from "react";
import ReactDom from "react-dom";
import "./Login_Registration/login.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { HashRouter, BrowserRouter, Route, Switch } from "react-router-dom";

import {
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
  Managepickupstore,
} from "./indexImport";
import NotPicked from "./Operation_panel/Js/NotPicked";
import StatusGrup from "./Super_Admin_Panel/js/StatusGrup";
import Locationadd from "./Super_Admin_Panel/js/Locationadd";
import Hubadd from "./Super_Admin_Panel/js/Hubadd";
import Addmerchantarea from "./Super_Admin_Panel/js/Addmerchantarea";
import Courierareaadd from "./Super_Admin_Panel/js/Courierareaadd";

import OperationNewReport from "./Operation_panel/Js/OperationNewReport";
import ThreePLAreaMap from "./Super_Admin_Panel/js/ThreePLAreaMap";
import Courier from "./Super_Admin_Panel/js/Courier";
import SalesHome from "./Sales_panel/Js/SalesHome";
import PickUpStore from "./CustomerPanel/js/PickUpStore";
import LocationList from "./Super_Admin_Panel/js/locationComponents/LocationList";
import Hubmapping from "./Super_Admin_Panel/js/locationComponents/Hubmapping";
import Hublist from "./Super_Admin_Panel/js/locationComponents/Hublist";
import Courierarealist from "./Super_Admin_Panel/js/locationComponents/Courierarealist";
import Assigntofenew from "./DC_panel/JS/Assigntofenew";
import Assigntofetable from "../src/Model/Dcpanel/Assigntofetable";
import Assigntofenewdispatch from "./DC_panel/JS/Assigntofenewdispatch";

function Full_web_page() {
  const user = JSON.parse(localStorage.getItem("logingInformation_LocalStore"))
    ?.all_user_list?.employeE_NAME;
  console.log("main route", user && "hello");
  return (
    <React.StrictMode>
      <HashRouter>
        {/* <BrowserRouter> */}
        <Switch>
          {/* product Information page */}
          <Route path="/ProductInformation/:waybill">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Test />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          {/* product Information page */}
          {/*fe panel start*/}

          <Route path="/Individualproductlist" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Individualproductlist />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/notPicked" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <NotPicked />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Reportdownloaddc">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Reportdownloaddc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Dashboard">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Dashboard />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/createPickUpStore">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <PickUpStore />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Newpartnerchangeops">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Newpartnerchangeops />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Bagserch">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Bagsearch />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Nextdayreceive">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Nextdayreceive />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Newpartnerchange">
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Newpartnerchange />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Receiveparcelfe" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Receiveparcelfe />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Employeeactive" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Employeeactive />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/locationadd" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Locationadd />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/courierareaadd" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Courierareaadd />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/hubdd" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Hubadd />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/addmerchantarea" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Addmerchantarea />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/locationlist" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <LocationList />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/hubmaping" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Hubmapping />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/hublist" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Hublist />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/courierarealist" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Courierarealist />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/threePLAreaMap" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLAreaMap />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/courier" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Courier />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ThreePLParcelListpartnerchange" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLParcelListpartnerchange />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ThreePLParcelListpartnerchangeops" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLParcelListpartnerchangeops />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ThreePLParcelListworword" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLParcelListworword />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ThreePLParcelListworwordops" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLParcelListworwordops />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Partnerreturn" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Partnerreturn />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Partnerwrongmenifestation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Partnerwrongmenifestation />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/multipleWaybillOps" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <MultipleWaybill />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/3plstatuschange" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Threeplstatuschange />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Confirmpickup" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmpickup />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Threepl" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePl />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ThreePLParcelList" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ThreePLParcelList></ThreePLParcelList>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Parceldelivery" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parceldelivery />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*fepanel end*/}

          <Route path="/shipmentd" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Shipment />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*directrto*/}

          <Route path="/Directrto" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Directrto />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/customerd" exact>
            <LoginContextProvider>
              <CustomerDetails />
            </LoginContextProvider>
          </Route>

          <Route path="/billd" exact>
            <LoginContextProvider>
              <Billdetails />
            </LoginContextProvider>
          </Route>

          <Route path="/billg" exact>
            <LoginContextProvider>
              <Generatebill />
            </LoginContextProvider>
          </Route>

          {/* account confirm payment */}

          <Route path="/Confirmpayment" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmpayment></Confirmpayment>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* Financial Home */}

          <Route path="/FinancialHome" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <FinancialHome></FinancialHome>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* Pending Amount Home */}
          <Route path="/PendingAmountHome" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <PendingAmountHome></PendingAmountHome>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* invoice summary */}

          <Route path="/InvoiceSummary" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <InvoiceSummary></InvoiceSummary>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* invoice paid */}

          <Route path="/InvoiceSummarypaid" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <InvoiceSummarypaid></InvoiceSummarypaid>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Duepayment" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Duepayment></Duepayment>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* OPS Dashboard */}
          <Route path="/Dashboard" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <DashboardO />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*  ops employee reg*/}

          <Route path="/Employeeregops" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Employeeregops />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/employeereg" exact>
            <LoginContextProvider>
              <Employeereg />
            </LoginContextProvider>
          </Route>

          <Route path="/employeelist" exact>
            <LoginContextProvider>
              <Employeelist />
            </LoginContextProvider>
          </Route>

          <Route path="/leave" exact>
            <LoginContextProvider>
              <Leaveapp />
            </LoginContextProvider>
          </Route>

          <Route path="/kpi" exact>
            <LoginContextProvider>
              <Kpi />
            </LoginContextProvider>
          </Route>

          <Route path="/" exact>
            <LoginContextProvider>
              <Login></Login>
            </LoginContextProvider>
          </Route>

          <Route path="/navbar" exact>
            <LoginContextProvider>
              <Navbar></Navbar>
            </LoginContextProvider>
          </Route>
          <Route path="/errorPage" exact>
            <LoginContextProvider>
              <Errorpage></Errorpage>
            </LoginContextProvider>
          </Route>

          <Route path="/maintance" exact>
            <LoginContextProvider>
              <Maintance />
            </LoginContextProvider>
          </Route>

          <Route path="/manifest" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <UploadCSV></UploadCSV>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/bagcreation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Bagcreation></Bagcreation>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Bagcreationdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Bagcreationdc></Bagcreationdc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/centerchangepc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <CenterChangePc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/scanner" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Scanner />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/product" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Product />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/productdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Productdc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/productreturn" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnproductassign />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*dc return bag*/}

          <Route path="/productreturndc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnproductassigndc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/vehiclecreate" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Vehicle></Vehicle>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Vehiclecreatedc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Vehiclecreatedc></Vehiclecreatedc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Returnvehicledc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnvehicledc></Returnvehicledc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/own" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Own />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/plvehicle" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Plvehicle />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/HomePC" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Home></Home>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Parcellistdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parcellistdc></Parcellistdc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Homeopstable" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Homeopstable></Homeopstable>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Monitorproduct" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <MonitorProduct />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Monitorproductacc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Monitorproductacc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*accounts report Download*/}

          <Route path="/Reportdownloadacc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Reportdownloadacc></Reportdownloadacc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* return  */}

          <Route path="/Returnedpcreceivedbag" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnedpcreceivedbag></Returnedpcreceivedbag>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ReturnPcBag" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ReturnPcBag />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Returnbagcreation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnbagcreation></Returnbagcreation>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* returned product in pc */}
          <Route path="/ReturnedProduct" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ReturnedProduct />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Returnvehiclecreate" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Vehicle></Vehicle>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Confirmreturn" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmreturn></Confirmreturn>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* return end */}

          <Route path="/supportPC" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Support></Support>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Pickup" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Pickuprequest></Pickuprequest>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/HomeC" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <HomeC />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* customer invoice summary */}

          <Route path="/Invoicesummaryc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Invoicesummaryc></Invoicesummaryc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Managepickupstorec" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Managepickupstore></Managepickupstore>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/singleProduct" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Singleproduct />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/PickuprequestC" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <PickuprequestC />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Parceltracking" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parceltracking />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          {/* sales parcel tracking */}

          <Route path="/Parceltrackings" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parceltrackings />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Parceltrackingwaybill" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parceltrackingwaybill />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/multiwaybill" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <MultiWaybillSearch />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/manageclientotp" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ClientOtp />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Parceltrackingpc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Parceltrackingpc />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Waybilltrackingsales" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Waybilltrackingsales />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Report" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Reportdownload />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Reportdownloadops" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Reportdownloadops></Reportdownloadops>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/operationNewReport" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <OperationNewReport />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*monitor bag*/}

          <Route path="/Monitorbag" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Monitorbag></Monitorbag>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/payment" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Payment />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/SupportC" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SupportC />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* singleproduct confirm */}

          <Route path="/Confirmsingleproduct" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmsingleproduct></Confirmsingleproduct>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*Operation */}

          <Route path="/otp" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Otp />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/pickupoperation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <PickuprequestO />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/HomeOperation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <HomeO />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/fedcreport" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <OpsDcPerformance />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/lock" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <LockO />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/OperationSupport" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SupportO />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Oreportdownload" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Oreportdownload></Oreportdownload>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/sla" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Sla />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/Csla" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <OClientsla></OClientsla>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Fdperformance" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ODcfeperformance></ODcfeperformance>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/datefiltering" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Datefiltering></Datefiltering>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Rsla" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Oreturnsla></Oreturnsla>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Dsla" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Odeliverysla></Odeliverysla>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Fda" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <OFda></OFda>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Thold" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Ohold></Ohold>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Pcod" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Opending></Opending>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Tlost" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Olost></Olost>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Treturn" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Oreturn></Oreturn>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/volume" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Ovolume></Ovolume>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Dpcontrol" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Odcpccontrol></Odcpccontrol>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*Sales */}

          <Route path="/pickupSales" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SalesPickup></SalesPickup>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/salespickup" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SalesPickupform />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/productSales" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Salesproduct />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/salesHome" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SalesHome></SalesHome>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          <Route path="/ClientP" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ClientProfile></ClientProfile>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/SalesSupport" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <SalesSupport></SalesSupport>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Salesreportdownload" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Salesreportdownload></Salesreportdownload>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ClientR" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ClientRegistration />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Paymentconfirm" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Paymentconfirm></Paymentconfirm>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>
          {/* dcpanel start */}

          <Route path="/Homeopsdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Homeopsdc></Homeopsdc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Homedc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Homedc></Homedc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Eodstatus" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Eodstatus></Eodstatus>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/receivebagdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ReceivedBag />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Assigntofe" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Assigntofe></Assigntofe>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Assigntofenewdispatch" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Assigntofenewdispatch></Assigntofenewdispatch>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Assigntofenew" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Assigntofenew></Assigntofenew>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Assigntoferto" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Assigntoferto></Assigntoferto>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Returndc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returndc></Returndc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Returnbag" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Returnbag></Returnbag>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/settings" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Change></Change>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Unconfirmlist" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Unconfirmlist></Unconfirmlist>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/finalEod" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <FinalEod />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Pendingeodstatus" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Pendingeodstatus></Pendingeodstatus>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Confirmpaymentdc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmpaymentdc></Confirmpaymentdc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/*accounts */}

          <Route path="/Confirmpaymentdcacc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Confirmpaymentdcacc></Confirmpaymentdcacc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/viewinvoice" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ViewInvoice />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/viewpayment" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ViewDcPayment />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Unconfirmpayment" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Unconfirmpayment></Unconfirmpayment>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/dcperformance" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <DcPerformence />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Lostmark" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Lostmark />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/changeaddress" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ClientRequestChange />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/reroutedproduct" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <ReRoutedProduct />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Viewinvoiceacc" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Viewinvoiceacc></Viewinvoiceacc>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Lostmarkops" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Lostmarkops></Lostmarkops>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/Wrongcorrection" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Wrongcorrection></Wrongcorrection>
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/reroutebagcreation" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Reroutebagcreation />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/overallperformance" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <OverallPerformance />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          {/* dcpanel end */}
          {/* superadmin start */}
          <Route path="/superhome" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <Opsadmin />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/statusGrup" exact>
            <LoginContextProvider>
              <SearchContextProvider>
                <SearchButtonContextProvider>
                  <StatusGrup />
                </SearchButtonContextProvider>
              </SearchContextProvider>
            </LoginContextProvider>
          </Route>

          <Route path="/ParcelTrack/:id">
            <ParcelTrack />
          </Route>

          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
        {/* </BrowserRouter>    */}
      </HashRouter>
    </React.StrictMode>
  );
}

ReactDom.render(
  <Full_web_page></Full_web_page>,
  document.getElementById("root")
);
