import jsPDF from "jspdf";
import "jspdf-autotable";
import { getCurrentTime } from "./Common/common";

const downloadPdf = (data) => {
  var columns = [
    // { title: "FE Name", dataKey: "field_operative_name" },
    { title: "waybill", dataKey: "producT_WAYBILL_NUMBER" },
    { title: "Customer Name", dataKey: "consigneE_NAME" },
    { title: "Customer Number", dataKey: "contacT_NUMBER" },
    { title: "Customer Address", dataKey: "address" },
    { title: "Price", dataKey: "producT_VALUE_AMOUNT" },
    { title: "Open/Close Box", dataKey: "producT_TYPE" },
    { title: "Merchant Name", dataKey: "merchant_name" },
    { title: "dateTime", dataKey: "producT_ENTRY_TIME" },
  ];

  var rows = data;
  console.log("data", data);
  const count = data.length - 1;

  const feName = data?.map((e) => e?.field_operative_name)[0];
  const doc = new jsPDF("l", "in"[(8.5, 12)]);

  doc.autoTable(columns, rows, {
    margin: { top: 20 },
    addPageContent: function (data) {
      doc.text("Assign Product To : " + feName, 15, 10);
      doc.text("Total Assign Product : " + count, 15, 17);
      doc.text("Date Time : " + getCurrentTime(), 180, 10);
    },
  });

  doc.save("fe assign.pdf");
};

export default downloadPdf;
