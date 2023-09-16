import JsBarcode from "jsbarcode";
import jsPDF from "jspdf";
import { getCurrentTime } from "../Common/common";

export const print_function = (print_data) => {
  // toast.info("Please Wait a Moment!", {
  //   position: "top-right",
  //   autoClose: 2500,
  // });

  let pdf = new jsPDF("l", "mm", [101.6, 76.2]);

  print_data &&
    print_data.map((single_product_information, list_index) => {
      // let elem = document.getElementById(single_product_information.waybill_number);
      // inputs.push(elem);
      // console.log("elem",elem)
      pdf.addPage([101.6, 76.2, "landscape"]);
      pdf.rect(3, 3, 96, 70, "D");

      pdf.addImage("/images/e_desh_logo.png", 4, 4, 24, 8);
      pdf.setFontSize(10);
      pdf.addFont("SolaimanLipi_20-04-07");
      pdf.setFont("SolaimanLipi_20-04-07");
      pdf.text(
        "Order ID: " + single_product_information.order_id,
        37,
        12,
        { maxWidth: 100 },
        0
      );
      pdf.setFontSize(10);
      pdf.text(
        "Date: " + single_product_information?.pickedup_date?.split("T")[0],
        37,
        8,
        { maxWidth: 50 },
        0
      );

      pdf.setFontSize(13);
      pdf.text("3PL-P", 88, 8, { maxWidth: 55, align: "center" }, 0);

      pdf.setFontSize(10);
      pdf.text(
        "----------------------------------------------------------------------------------",
        3,
        15
      );

      pdf.text("Merchant : ", 5, 18, { maxWidth: 55 }, 0);

      pdf.text(
        [single_product_information.customer_name],
        25,
        18,
        { maxWidth: 50 },
        0
      );
      //customer contact
      pdf.text(
        // single_product_information.customer_contact,
        "+8809642601777",
        5,
        22,
        { maxWidth: 55 },
        0
      );
      pdf.setFont("SolaimanLipi_20-04-07");
      //consignee name contact and address
      pdf.text(
        [
          "Consignee : " + single_product_information.consignee_name,
          "Contact: " + single_product_information.contact,
          "Address: " + single_product_information.address.length === 30
            ? single_product_information.address + `</br>`
            : single_product_information.address,
        ],
        5,
        27,
        {
          maxWidth: 100,
          //font: "SolaimanLipi_20-04-07"
        },
        0
      );
      // pdf.text(single_product_information.consignee_name, 25, 27);
      pdf.setFont("SolaimanLipi_20-04-07");

      //cod pin and dc name
      pdf.text(
        [
          "COD Amount: " + single_product_information.product_value,

          "Target Dc: " + single_product_information.dc_office_name,
        ],

        5,
        44,
        {
          maxWidth: 100,
          //font: "SolaimanLipi_20-04-07",
        },
        0
      );
      pdf.text("Pin: " + single_product_information.pincode, 50, 44);
      pdf.setFont("SolaimanLipi_20-04-07");

      JsBarcode("#PDFTable", single_product_information.waybill_number, {
        format: "CODE128",

        width: 5,
        height: 40,
        displayValue: false,
      });

      const img = document.querySelector("img#PDFTable");
      pdf.addImage(img.src, "WEBP", 25, 49, 50, 18);

      // pdf.addSvgAsImage(img.src,  19, 100, 65, 35);
      pdf.setFontSize(12);

      //waybill number
      pdf.text(
        single_product_information.waybill_number,
        37,
        68,
        { maxWidth: 55 },
        0
      );
      pdf.setFontSize(10);

      //disclaimer

      pdf.text(
        "Disclaimer: Please Do not accept Delivery if Packing is Torn",
        51,
        71,
        { maxWidth: 100, align: "center" },
        0
      );
      //   pdf.text("E-Desh LTD", 50, 155, { maxWidth: 55, align: "center" }, 0);
    });

  pdf.deletePage(1);

  // pdf.autoPrint();
  // pdf.output('dataurlnewwindow');
  // pdf.save('autoprint.pdf');
  pdf.save("Labels " + getCurrentTime() + ".pdf");
  // toast.success("Open Pdf to print", {
  //   position: "top-right",
  //   autoClose: 2500,
  // });
  pdf.autoPrint();
  pdf.addPage([101.6, 76.2, "landscape"]);
  pdf.deletePage(pdf.internal.getNumberOfPages());
  window.open(pdf.output("bloburl"), "_blank");
};

<img id="PDFTable" style={{ display: "none" }} />;
