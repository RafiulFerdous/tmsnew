import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import Modal from "react-modal";
import axios from "axios";
import { Degital_Ocean_flag } from "../../Common/Linksidebar";
import { toast } from "react-toastify";

const columns = [
  { id: "statusGroupId", label: "GroupId", minWidth: 70, align: "center" },
  {
    id: "reportStatusGroup",
    label: "Report Status",
    minWidth: 170,
    align: "center",
  },
  {
    id: "fulfillmentStatusGroup",
    label: "Fulfillment Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "orderTrackStatusGroup",
    label: "Order Track Status",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toLocaleString("en-US"),
  },
  //   {
  //     id: "orderTrackStatusGroup",
  //     label: "orderTrackStatusGroup",
  //     minWidth: 170,
  //     align: "center",
  //     // format: (value) => value.toLocaleString("en-US"),
  //   },
  {
    id: "orderTrackStatusPublicGroup",
    label: "Order Track Status Public",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
  {
    id: "dashboardStatusGroup",
    label: "Dashboard Status",
    minWidth: 170,
    align: "center",
    // format: (value) => value.toFixed(2),
  },
];

export default function StatusTable({ data, setReFetch, reFetch }) {
  toast.configure();
  const rows = data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [deleteItem, setDeleteItem] = useState("");
  const [editModalData, setEditModalData] = useState(null);
  const [insertStatusGroup, setInsertStatusGroup] = useState({
    reportStatusGroup: "",
    fulfillmentStatusGroup: "",
    orderTrackStatusGroup: "",
    orderTrackStatusPublicGroup: "",
    dashboardStatusGroup: "",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const customStyles = {
    overlay: {
      zIndex: 9,
      position: "fixed",
      height: "100vh",
      width: "100vw",
    },
    content: {
      position: "absolute",
      top: "80px",
      left: "15%",
      right: "15%",
      bottom: "40px",
      border: "1px solid #ccc",
      background: "#fff",
      overflow: "auto",
      WebkitOverflowScrolling: "touch",
      borderRadius: "4px",
      outline: "none",
      padding: "20px",
    },
  };
  const customStylesDeleteModal = {
    overlay: {
      zIndex: 9,
    },
    content: {
      top: "55%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const customStylesAddModal = {
    overlay: {
      zIndex: 9,
    },
    content: {
      top: "55%",
      left: "50%",
      right: "30%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 9,
    },
  };

  // added new item by post request
  const handleInsertStatusGroup = () => {
    console.log(JSON.stringify(insertStatusGroup));
    const config = {
      method: "post",
      url: Degital_Ocean_flag
        ? "http://test.e-deshdelivery.com:8080/api/StatusGroup/InsertStatusGroup"
        : "http://test.e-deshdelivery.com:8080/api/StatusGroup/InsertStatusGroup",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(insertStatusGroup),
    };

    axios(config)
      .then((res) => {
        toast.success(res?.data?.message);
        console.log(res);
        setReFetch(!reFetch);
        setAddModal(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };
  // update Existing item by put request
  const handleUpdateStatusGroup = () => {
    console.log(JSON.stringify(editModalData));

    const config = {
      method: "put",
      url: Degital_Ocean_flag
        ? "http://test.e-deshdelivery.com:8080/api/StatusGroup/UpdateStatusGroup"
        : "http://test.e-deshdelivery.com:8080/api/StatusGroup/UpdateStatusGroup",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(editModalData),
    };
    axios(config)
      .then((res) => {
        console.log(res);
        toast.success(res?.data?.message);
        setReFetch(!reFetch);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });

    setEditModal(false);
  };

  // Delete Existing item by delete request
  const handleDelete = () => {
    console.log(deleteItem);
    setIsOpen(false);
  };

  return (
    <>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440, textAlign: "end" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, i) => (
                  <TableCell
                    key={i + 1}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, j) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={j + 2}>
                      {columns.map((column, k) => {
                        const value = row[column.id];
                        return (
                          <>
                            <TableCell key={k} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          </>
                        );
                      })}
                      <TableCell style={{ minWidth: "250px" }}>
                        <div className="d-flex justify-content-around">
                          <button
                            className="btn btn-info btn-sm px-3 fs-6 "
                            onClick={() => {
                              setEditModalData(row);
                              setEditModal(true);
                            }}
                          >
                            Edit
                            <span className="ps-2">
                              <BiEdit />
                            </span>
                          </button>
                          <button
                            className="btn btn-danger btn-sm px-3 fs-6 fw-light"
                            onClick={() => {
                              setDeleteItem(row);
                              setIsOpen(true);
                            }}
                          >
                            Delete{" "}
                            <span className="ps-2">
                              <RiDeleteBin6Line />
                            </span>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <button
            className="btn btn-sm btn-success px-5"
            onClick={() => setAddModal(true)}
          >
            ADD NEW
            <span className="ps-2 fs-6">
              <MdOutlineAddCircleOutline />
            </span>
          </button>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStylesDeleteModal}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="btn btn-outline-danger"
        >
          close
        </button>
        <div className="p-5">
          <h2>Are You Sure?</h2>
          <div className=" d-flex justify-content-between mt-5">
            <button
              className="btn btn-outline-danger px-3"
              onClick={handleDelete}
            >
              YES
            </button>
            <button
              className="btn btn-outline-success px-4"
              onClick={() => setIsOpen(false)}
            >
              NO
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={editModal}
        onRequestClose={() => setEditModal(false)}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <button
          onClick={() => setEditModal(false)}
          className="btn btn-outline-danger"
        >
          close
        </button>
        <div className="p-5">
          <h2>Edit Here</h2>
          <div className="p-3">
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Report Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  value={editModalData?.reportStatusGroup}
                  onChange={(e) => {
                    setEditModalData({
                      ...editModalData,
                      reportStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Report Status Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Fulfillment Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  value={editModalData?.fulfillmentStatusGroup}
                  onChange={(e) => {
                    setEditModalData({
                      ...editModalData,
                      fulfillmentStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Fulfillment Status Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Order TrackStatus Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  value={editModalData?.orderTrackStatusGroup}
                  onChange={(e) => {
                    setEditModalData({
                      ...editModalData,
                      orderTrackStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Order TrackStatus Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Order Track Status Public Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  value={editModalData?.orderTrackStatusPublicGroup}
                  onChange={(e) => {
                    setEditModalData({
                      ...editModalData,
                      orderTrackStatusPublicGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Order Track Status Public Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Dashboard Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  value={editModalData?.dashboardStatusGroup}
                  onChange={(e) => {
                    setEditModalData({
                      ...editModalData,
                      dashboardStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Dashboard Status Group"
                ></input>
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-success px-4"
                onClick={handleUpdateStatusGroup}
              >
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={addModal}
        onRequestClose={() => setAddModal(false)}
        style={customStylesAddModal}
        contentLabel="Example Modal"
        closeTimeoutMS={500}
      >
        <div className="w-100">
          <button
            onClick={() => setAddModal(false)}
            className="btn btn-outline-danger"
          >
            close
          </button>
          <h2 className="text-center mt-3">Add New Item</h2>
          <div className="p-3">
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Report Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  onChange={(e) => {
                    setInsertStatusGroup({
                      ...insertStatusGroup,
                      reportStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Report Status Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Fulfillment Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  onChange={(e) => {
                    setInsertStatusGroup({
                      ...insertStatusGroup,
                      fulfillmentStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Fulfillment Status Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Order TrackStatus Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  onChange={(e) => {
                    setInsertStatusGroup({
                      ...insertStatusGroup,
                      orderTrackStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Order TrackStatus Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Order Track Status Public Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  onChange={(e) => {
                    setInsertStatusGroup({
                      ...insertStatusGroup,
                      orderTrackStatusPublicGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Order Track Status Public Group"
                ></input>
              </div>
            </div>
            <div className="row my-2">
              <div className="col-lg-4 col-md-4 col-12">
                <p>Dashboard Status Group:</p>
              </div>
              <div className="col-lg-8 col-md-8 col-12">
                <input
                  onChange={(e) => {
                    setInsertStatusGroup({
                      ...insertStatusGroup,
                      dashboardStatusGroup: e.target.value,
                    });
                  }}
                  className="shadow-lg form-control  me-3 bg-white rounded"
                  type="text"
                  placeholder="Dashboard Status Group"
                ></input>
              </div>
            </div>

            <div className="text-end">
              <button
                className="btn btn-success px-4"
                onClick={handleInsertStatusGroup}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
