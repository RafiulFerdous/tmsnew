import { Modal } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Degital_Ocean_flag } from "../../../Common/Linksidebar";
import { Card } from "antd";
const { Meta } = Card;

const ShowCourierByName = ({ name, isModalOpen1, setIsModalOpen1 }) => {
  const [getCourierAreaByName, setGetCourierAreaByName] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   console.log(getCourierAreaByName);
  //   console.log(name);

  useEffect(() => {
    setIsLoading(true);
    var config = {
      method: "get",
      url: Degital_Ocean_flag
        ? `https://e-deshdelivery.com/api/v1.1/CourierArea/GetCourierAreaByName?name=${name}`
        : `http://test.e-deshdelivery.com/api/v1.1/CourierArea/GetCourierAreaByName?name=${name}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then((res) => {
        // console.log("res", res);
        setGetCourierAreaByName(res?.data?.data[0]);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
      });
  }, [name]);

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };

  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };
  return (
    <>
      <Modal
        title="Get Courier Area By Name"
        open={isModalOpen1}
        onOk={handleOk1}
        onCancel={handleCancel1}
      >
        <Card
          style={{
            // width: ,
            marginTop: 16,
          }}
          loading={isLoading}
        >
          <Meta
            title={`Courier Area Name : ${getCourierAreaByName?.courierAreaName}`}
            description={`courier company : ${getCourierAreaByName?.courier?.courieR_NAME}`}
            children={<div>hello</div>}
          />
        </Card>
      </Modal>
    </>
  );
};

export default ShowCourierByName;
