import { Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import { Card } from "antd";
const { Meta } = Card;

const ShowCourierById = ({ id, isModalOpen, setIsModalOpen }) => {
  const [getCourierAreaById, setGetCourierAreaById] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(getCourierAreaById);

  useEffect(() => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/v1.1/CourierArea/GetCourierAreaById/${id}`
        : `http://test.e-deshdelivery.com/api/v1.1/CourierArea/GetCourierAreaById/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        // console.log("res", res);
        setGetCourierAreaById(res?.data?.data);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Get Courier Area By Id"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card
          style={{
            // width: ,
            marginTop: 16,
          }}
          loading={isLoading}
        >
          <Meta
            title={`Courier Area Name : ${getCourierAreaById?.courierAreaName}`}
            description={`courier company : ${getCourierAreaById?.courier?.courieR_NAME}`}
            children={<div>hello</div>}
          />
        </Card>
      </Modal>
    </>
  );
};

export default ShowCourierById;
