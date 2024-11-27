import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Steps,
  Card,
  Form,
  DatePicker,
  TimePicker,
  Button,
  List,
  message,
} from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import { AmenityReservationsAPI } from "../utils"; // 引入 API 请求函数

const { Step } = Steps;

const AmenityReservation = ({ userId }) => {
  const [currentStep, setCurrentStep] = useState(0); // 当前步骤
  const [selectedAmenity, setSelectedAmenity] = useState(null); // 选中的设施
  const [reservationDetails, setReservationDetails] = useState([]); // 历史预约
  const [amenities, setAmenities] = useState([]); // 设施列表
  const [form] = Form.useForm();
  const amenityMapping = {
    1: "Swimming Pool",
    2: "Gym",
    3: "Tennis Court",
  };

  // 获取设施列表
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const amenitiesList = await AmenityReservationsAPI.getAmenities();
        setAmenities(amenitiesList);
      } catch (error) {
        message.error("Failed to fetch amenities.");
      }
    };
    fetchAmenities();

    // 获取历史预约
    const fetchReservations = async () => {
      try {
        const reservations = await AmenityReservationsAPI.getReservations(
          userId
        );
        setReservationDetails(reservations);
      } catch (error) {
        message.error("Failed to fetch past reservations.");
      }
    };
    fetchReservations();
  }, [userId]);

  // 处理下一步
  const handleNext = () => {
    if (currentStep === 0 && !selectedAmenity) {
      message.error("Please select an amenity.");
      return;
    }
    if (currentStep === 1) {
      form
        .validateFields()
        .then(async (values) => {
          const { date, time } = values;
          try {
            // 创建预约
            const newReservation =
              await AmenityReservationsAPI.createReservation(
                userId,
                selectedAmenity.id,
                date.format("YYYY-MM-DD"),
                time.format("HH:mm")
              );
            setReservationDetails([...reservationDetails, newReservation]); // 更新历史预约
            form.resetFields();
            setCurrentStep(currentStep + 1);
          } catch (error) {
            message.error("Failed to create reservation.");
          }
        })
        .catch(() => {
          message.error("Please complete the form.");
        });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // 处理上一步
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // 处理设施选择
  const handleAmenitySelect = (amenity) => {
    setSelectedAmenity(amenity);
  };

  // 重置表单
  const resetForm = () => {
    setCurrentStep(0);
    setSelectedAmenity(null);
  };

  // 禁用过去的日期
  const disableDate = (current) => current && current < moment().startOf("day");

  // 禁用过去的时间
  const disableTime = (selectedDate) => {
    if (!selectedDate || selectedDate.isAfter(moment(), "day")) return {};
    const currentHour = moment().hour();
    const currentMinute = moment().minute();
    return {
      disabledHours: () =>
        Array.from({ length: 24 }, (_, i) => i).filter(
          (hour) => hour < currentHour
        ),
      disabledMinutes: (selectedHour) =>
        selectedHour === currentHour
          ? Array.from({ length: 60 }, (_, i) => i).filter(
              (minute) => minute < currentMinute
            )
          : [],
    };
  };

  return (
    <div style={{ padding: "24px", background: "#fff" }}>
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item style={{ color: "#aaa" }}>
          Calendar Schedule
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#000" }}>
          Amenity Reservation
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2>Amenity Reservation</h2>

      <Steps current={currentStep} style={{ marginBottom: "24px" }}>
        <Step title="Choose an Amenity" />
        <Step title="Choose Date and Time" />
        <Step title="Done" />
      </Steps>

      {currentStep === 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {amenities.map((amenity) => (
            <Card
              key={amenity.id}
              hoverable
              style={{
                width: 250,
                border:
                  selectedAmenity?.id === amenity.id
                    ? "2px solid #1890ff"
                    : "1px solid #f0f0f0",
              }}
              cover={<img alt={amenity.name} src={amenity.image} />}
              onClick={() => handleAmenitySelect(amenity)}
            >
              <Card.Meta title={amenity.amenityName} />
            </Card>
          ))}
        </div>
      )}

      {currentStep === 1 && (
        <Form
          form={form}
          layout="vertical"
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} disabledDate={disableDate} />
          </Form.Item>
          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker
              style={{ width: "100%" }}
              format="HH:mm"
              disabledTime={disableTime}
            />
          </Form.Item>
        </Form>
      )}

      {currentStep === 2 && (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <CheckCircleOutlined style={{ fontSize: "64px", color: "#52c41a" }} />
          <h2>Successfully Reserved</h2>
          <p>
            You have reserved <strong>{selectedAmenity?.name}</strong> on{" "}
            <strong>
              {reservationDetails[reservationDetails.length - 1]?.date}
            </strong>{" "}
            at{" "}
            <strong>
              {reservationDetails[reservationDetails.length - 1]?.time}
            </strong>
            .
          </p>
          <Button type="primary" onClick={resetForm}>
            Make Another Reservation
          </Button>
        </div>
      )}

      {currentStep < 2 && (
        <div style={{ marginTop: "24px" }}>
          <Button
            onClick={handlePrev}
            disabled={currentStep === 0}
            style={{ marginRight: "8px" }}
          >
            Previous
          </Button>
          <Button type="primary" onClick={handleNext}>
            {currentStep === 1 ? "Submit" : "Next"}
          </Button>
        </div>
      )}

      {currentStep === 0 && (
        <List
          style={{ marginTop: "32px" }}
          header={<h3>Past Reservations</h3>}
          dataSource={reservationDetails}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={amenityMapping[item.amenityId] || "Unknown Amenity"}
                description={`Date: ${item.reservationDate}, Time: ${item.reservationTime}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AmenityReservation;
