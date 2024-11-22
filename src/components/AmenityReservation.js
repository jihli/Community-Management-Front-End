import React, { useState } from "react";
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

const { Step } = Steps;

// List of available amenities
const amenities = [
  { id: 1, name: "Study Room", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Swimming Pool", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sports Room", image: "https://via.placeholder.com/150" },
  {
    id: 4,
    name: "Entertainment Room",
    image: "https://via.placeholder.com/150",
  },
];

const AmenityReservation = () => {
  const [currentStep, setCurrentStep] = useState(0); // Current step in the process
  const [selectedAmenity, setSelectedAmenity] = useState(null); // Amenity selected by the user
  const [reservationDetails, setReservationDetails] = useState([]); // List of past reservations
  const [form] = Form.useForm();

  // Handle navigation to the next step
  const handleNext = () => {
    if (currentStep === 0 && !selectedAmenity) {
      message.error("Please select an amenity.");
      return;
    }
    if (currentStep === 1) {
      form
        .validateFields()
        .then((values) => {
          const { date, time } = values;
          const newReservation = {
            amenity: selectedAmenity.name,
            date: date.format("YYYY-MM-DD"),
            time: time.format("HH:mm"),
          };
          setReservationDetails([...reservationDetails, newReservation]); // Save the reservation
          form.resetFields();
          setCurrentStep(currentStep + 1);
        })
        .catch(() => {
          message.error("Please complete the form.");
        });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  // Handle navigation to the previous step
  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  // Handle amenity selection
  const handleAmenitySelect = (amenity) => {
    setSelectedAmenity(amenity);
  };

  // Reset form and steps
  const resetForm = () => {
    setCurrentStep(0);
    setSelectedAmenity(null);
  };

  // Disable past dates
  const disableDate = (current) => current && current < moment().startOf("day");

  // Disable past times for today
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
      {/* Breadcrumb navigation */}
      <Breadcrumb style={{ marginBottom: "16px" }}>
        <Breadcrumb.Item style={{ color: "#aaa" }}>
          Calendar Schedule
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#000" }}>
          Amenity Reservation
        </Breadcrumb.Item>
      </Breadcrumb>

      <h2>Amenity Reservation</h2>

      {/* Step navigation */}
      <Steps current={currentStep} style={{ marginBottom: "24px" }}>
        <Step title="Choose an Amenity" />
        <Step title="Choose Date and Time" />
        <Step title="Done" />
      </Steps>

      {/* Step 1: Select an amenity */}
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
              <Card.Meta title={amenity.name} />
            </Card>
          ))}
        </div>
      )}

      {/* Step 2: Select date and time */}
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

      {/* Step 3: Success message */}
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

      {/* Navigation buttons */}
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

      {/* Past reservations list */}
      {currentStep === 0 && (
        <List
          style={{ marginTop: "32px" }}
          header={<h3>Past Reservations</h3>}
          dataSource={reservationDetails}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={item.amenity}
                description={`Date: ${item.date}, Time: ${item.time}`}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default AmenityReservation;
