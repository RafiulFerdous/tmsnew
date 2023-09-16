import React, { useContext, useEffect, useState } from "react";
import { employee_degignation_list } from "../../Super_Admin_Panel/js/Accountadmin";
import {
  CustomerCareLinksidebar,
  Degital_Ocean_flag,
  Linksidebar,
} from "../../Common/Linksidebar";
import { LoginContext } from "../../Context/loginContext";
import { Navbar } from "../../Common/Navbar";
import Footer from "../../Common/Footer";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const PickUpStore = () => {
  const [storeName, setStoreName] = useState("");
  const [selectedArea, setSelectedArea] = useState("");
  const [areaList, setAreaList] = useState([]);
  const [clientId, setclientId] = useState("");
  var { loginInformation, setloginInformation } = useContext(LoginContext);

  const [logingInformation_LocalStore, setlogingInformation_LocalStore] =
    useState(loginInformation);
  const [siteBarInformation_LocalStore, setsiteBarInformation_LocalStore] =
    useState([]);

  let setLogin_Sidebar_LocalStore = (
    current_value_login_context,
    sidebar_context
  ) => {
    localStorage.setItem(
      "logingInformation_LocalStore",
      JSON.stringify(current_value_login_context)
    );
  };

  let getLogingInformation_LocalStore = () => {
    let value = JSON.parse(
      localStorage.getItem("logingInformation_LocalStore")
    );
    return value;
  };

  useEffect(() => {
    let final_sideBar = null;
    let context_flag_obj = null;
    context_flag_obj = getLogingInformation_LocalStore();

    if (context_flag_obj == undefined) {
      if (loginInformation.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
        final_sideBar = CustomerCareLinksidebar;
      } else {
        if (
          loginInformation.all_user_list.employeE_DEGIGNATION ==
          employee_degignation_list.ProcessingCenter
        ) {
          setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
          final_sideBar = Linksidebar;
        }
      }
      setLogin_Sidebar_LocalStore(loginInformation, final_sideBar); //local store a set kore rakhlam.
      setclientId(loginInformation.all_user_list_Client.customeR_ID);

      setlogingInformation_LocalStore(loginInformation); //useState a set kore rakhlam.
      console.log(
        "value set up if: ",
        loginInformation.all_user_list_Client.customeR_ID
      );
    } else {
      if (context_flag_obj.user_type == employee_degignation_list.Customer) {
        setsiteBarInformation_LocalStore(CustomerCareLinksidebar); //useState a set kore rakhlam.
      } else if (
        context_flag_obj.all_user_list.employeE_DEGIGNATION ==
        employee_degignation_list.ProcessingCenter
      ) {
        setsiteBarInformation_LocalStore(Linksidebar); //useState a set kore rakhlam.
      }
      setclientId(context_flag_obj?.all_user_list_Client?.customeR_ID);

      setlogingInformation_LocalStore(context_flag_obj);
    }
  }, [loginInformation]);

  // customer Information from local storage

  //   const customerIdFromLocal = JSON.parse(
  //     localStorage?.getItem("logingInformation_LocalStore")
  //   );
  const token = JSON.parse(
    localStorage?.getItem("logingInformation_LocalStore")
  )?.token;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      MerchantId: clientId,
      StroreName: storeName,
      StoreAreaId: parseInt(selectedArea),
      PostedById: 0,
      UpdatedById: 0,
    });

    var config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/MultiPickupStrore/CreatePickupStoreNew"
        : "http://test.e-deshdelivery.com/api/v1.1/MultiPickupStrore/CreatePickupStoreNew",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        return response;
      })
      .then((res) => {
        console.log("new response", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //   api call for get area list
  useEffect(() => {
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? "https://e-deshdelivery.com/api/v1.1/Location/GetAreaList"
        : "https://test.e-deshdelivery.com/api/v1.1/Location/GetAreaList",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios(config)
      .then(function (response) {
        return response;
      })
      .then((res) => {
        console.log("new response", res);
        setAreaList(res?.data?.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [token]);

  return (
    <div>
      <div className="row">
        <div className="col-12 ">
          <Navbar sidebar_manu={siteBarInformation_LocalStore} />
        </div>
      </div>

      <div>
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-5 pt-5">
            <h4 className="text-dark text-center">
              <u>CREATE PICKUP STORE</u>
            </h4>

            <div className="container shadow my-3 py-3 rounded single-product-upload-bg">
              <div>
                {/* store name input */}
                <div className="row justify-content-between">
                  <div className="col-12 col-lg-5 col-md-5 my-2">
                    <TextField
                      //   id="outlined-basic"
                      className="bg-light w-100"
                      onChange={(e) => {
                        setStoreName(e.target.value);
                      }}
                      required
                      label="Area Name"
                      variant="outlined"
                    />
                  </div>
                  <div className="col-12 col-lg-5 col-md-5">
                    <Autocomplete
                      className="bg-light"
                      // id="country-select-demo"
                      // sx={{ width: 300 }}
                      options={areaList}
                      autoHighlight
                      getOptionLabel={(option) => option.value}
                      renderOption={(props, option) => (
                        <Box component="li" {...props}>
                          {setSelectedArea(option.text)}
                          {option.value} - {option.text}
                        </Box>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Choose a Area"
                          inputProps={{
                            ...params.inputProps,
                          }}
                        />
                      )}
                    />
                  </div>
                </div>

                {/*  */}
              </div>
            </div>
          </div>

          <div className="">
            <div className="d-flex justify-content-center text-align-center">
              <button
                type="submit"
                className="btn btn-sm btn-success rounded-3 px-3"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="">
        <div className="col-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default PickUpStore;
