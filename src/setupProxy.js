const { createProxyMiddleware } = require("http-proxy-middleware");
// const baseurl = "https://e-deshdelivery.com";
// const baseurl="http://103.106.241.168:5000";
// const baseurl="http://192.168.10.41:5000";
// const baseurl = "https://bridge.e-deshdelivery.com";
const baseurl = "http://test.e-deshdelivery.com";
//const baseurl="http://159.138.91.199";

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/loginRegistration/login", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getProductinDc", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/removeProductfromBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/productInPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/all_bag_information", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/bagProductInformationForPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/monitorPickupRequestbyPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accept_or_cancel_pickupRequest",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientUploadCsv", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/readAllFiles", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/bagcreation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/insertProductinBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/pickupRequestByClient", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/pickupRequestByClient", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getAllDCName", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/readAllFiles", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/vehicle_information", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/insertBagInVehicle", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientFinance", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/ClientReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/individualClientReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/pickupRequestByClient", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientMonitorPickupRequest", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/salesPanelClientReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/salesPanelClientInformation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/salesMonitorPickupRequest", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/firstOrderAttempt", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/salesPanelProduct_information",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/whichProductshouldbeLocked", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/deleverySLA", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/unlockProduct", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/product_volumes", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/product_COD_Status", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/operation_allproductInformation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/product_status_types", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/operationPanel_customerSupport",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/salesPanelClientInformation_waiting_tobe_confirmed",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/confirmClientRegistrationbySales",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/confirmLockedForProducts", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/salesPanelClientSupport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/clientQueryRequest", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/customerregistration", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/operationPanelOTPSupport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confirmSingleProductbyPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/pcPanelSingleProductWaitingtobeConfirmed",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelReceivePaymentProductListFromDC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelReceivePaymentFromDC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelAllProductFinantialCondition",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/getAllClientName", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelPandingAmountInDC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelSubmitPaymenttoClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/clientPanelProductPaymentWaitingtobeConfirmed",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/clientPanelProductPaymentConfirmedbyClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelPaymentInvoiceGenerateforClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  // invoice summary

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelallInvoiceSummary",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  // invoice summarypaid

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelallInvoiceSummaryPaid",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelSinglePaymentInvoiceDisplay",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  // invoice confirm

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelPaymentInvoiceConfirm",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelPaymentInvoiceGenerateProductListforClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientPanelallInvoiceSummary", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPaneldateWisePaymentfromClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientSingleProductUpload", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/operationPanelSingleProductInformation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  // universalapi/allapi/operationPanelSingleProductInformation_update

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/operationPanelSingleProductInformation_update",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/pcReceiveddBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/pcAssignedBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/receiveReturnedProductBagbyPC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getReturnedProductinPc", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confermReturnBagProducts", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/insertReturnProductinBagPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/insertedBagInVehiclefor3pl", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/loginRegistration/registration", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/confirmReturnProductListToClient",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confirmReturnProductbyClient", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/allDcList", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getCoverageArea", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getAreaCode_and_pinCode", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/dcAssignedBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/dcReceiveddBag", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/receiveBagbyDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confermBagProducts", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/confermBagProducts", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/getFeinDc", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/all_panel_all_search", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/loginRegistration/change_username_and_password", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/salesPanelClientChargeInformation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/unAuthorized_parcel_tracking", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/allmerchentname", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/assignProducttoFe", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/SeeFEperformancebyDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confermFEreportbyDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/GettingReturnProductbyDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/returnBagCreationByDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/allReturn_bag_informationInDC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/insertReturnProductinBagDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/bagReturnProductInformationForDC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/insertReturnProductBagInVehicle",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/clientPanelseeProductwaitingtobeConfirmed",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/employeeEod", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/feEodincompleteProductlistforDc",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/feEODComplete", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/dcIncompletePaymentProductList",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/dcPaymentInvoiceGenerate", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/dcPaymentInvoiceDisplay", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/dcPaymentInvoice_confirm", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/order_id_validation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/performanceReportdcandfe", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/all_dcandfe_information", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/sendOtpToConsignee", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/lostProduct", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/gettingReroutedProductbyDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/operationPanel_Homeapi", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/clientRequest_reroute", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/lostProductInformation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/lostResponsible_update", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/wrongMenifestCorrection", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/DCpincode", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/dcOverallPerformance", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/otpAccessInformation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/otpAccessInformationUpdate", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/superAdmin_deliveredToUndelivered",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );
  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/superAdmin_returnToUndelivered",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/accountPanelDeletenotPaidInvoice",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/delete_product", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/dcPaymentInvoice_display", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/monitorBagFromOperation", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/monitorBagProductFromOperation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/directRTOMarkfromPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/monitorProductstages", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/superAdmin_picktoUnPick", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/superAdmin_UnpicktoPick", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getReturnProductinDc", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/assignReturnProducttoFe", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getProductbyFe", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/all_panel_all_search_Finance", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confirmProductByFE", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/getConfirmProductbyFe", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/checkif_otpisRequired", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/productDeliveredTo", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/sendOtpToConsignee", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/holdProduct", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/returnedProduct", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/returnConferm", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/submitReturnProductToClient", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/feUnderDc", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/clientPanelCoverageAreawithDistictCity",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/partnerDeliverycompanyProductList",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/edeshStroreRegisteredtoPathao",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/coverageAreaParterInformation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/coverageAreaParterChange", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/allcourierlist", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/pathaoSendProducts", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/productPartnerDeliveryCompanyChange",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/deleted_pathaoUpdateStatus", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/needToPickupProductList", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/confirmProductPickedUp", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/SqlCommand/Faltu_kaj", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/partnerKorearCompanyReturnProductList", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/partnerKorearCompanyReturnProdutConfirmbyPC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/menifestedProblemProductListforCorrection",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/menifestedProblemProductListforCorrection_update",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/coverageAreaUnderDC", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/partnerKorearCompanyReturnProductList",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/partnerKorearCompanyReturnProdutConfirmbyPC",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/ThreeplSatusChangeStatus", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/allEmployee_information", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/updateEmployee_active_or_inactive",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/makeDCParcelReadytoDispatch", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/universalapi/allapi/operationBagProductInformation",
      {
        target: baseurl,
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/Merchantdashboard", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/allapi/individualClientReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/api/Report/OperationReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/universalapi/api/Report/MerchentReport", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/universalapi/allapi/NotPickProduct", {
      target: baseurl,
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/api/StatusGroup/GetAllStatusGroup", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
  app.use(
    createProxyMiddleware("/api/StatusGroup/InsertStatusGroup", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/api/v1.1/LocationType/GetAllLocationType", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/api/v1.1/MultiPickupStrore/GetAllStoresByMerChantId",
      {
        target: "http://test.e-deshdelivery.com:8080",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/api/v1.1/MultiPickupStrore/CreatePickupStoreNew", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/api/v1.1/MultiPickupStrore/UpdatePickUpStore", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware(
      "/api/v1.1/MultiPickupStrore/GetPickupStoreByStoreId",
      {
        target: "http://test.e-deshdelivery.com:8080",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      }
    )
  );

  app.use(
    createProxyMiddleware("/api/v1.1/MultiPickupStrore/UpdatePickUpStore", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/api/v1.1/MerchantArea/CreateMerchantArea", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );

  app.use(
    createProxyMiddleware("/api/v1.1/Location/GetAreaList", {
      target: "http://test.e-deshdelivery.com:8080",
      changeOrigin: true,
      pathRewrite: {
        "/api": "",
      },
    })
  );
};
