import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  CalendarOutlined,
  MessageOutlined,
  WalletOutlined,
  GiftOutlined,
  ToolOutlined,
  ScheduleOutlined,
  NotificationOutlined, // 通知图标
} from "@ant-design/icons";

// Sidebar menu component
const SiderMenu = ({ onSelect }) => {
  // Handle menu item selection and pass the key to parent component
  const handleClick = (e) => {
    onSelect(e.key);
  };

  return (
    <Menu
      theme="dark" // Set the menu theme to dark
      mode="inline" // Display menu in inline mode
      defaultSelectedKeys={["maintenance"]} // Default selected menu item
      onClick={handleClick} // Trigger handleClick on item selection
    >
      {/* Main menu items */}
      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        Dashboard
      </Menu.Item>

      <Menu.Item key="notice" icon={<NotificationOutlined />}>
        Notice
      </Menu.Item>
      <Menu.Item key="discussion" icon={<MessageOutlined />}>
        Discussion
      </Menu.Item>

      {/* Submenu for Calendar Schedule */}
      <Menu.SubMenu
        key="calendar"
        icon={<CalendarOutlined />}
        title="Calendar Schedule"
      >
        {/* Maintenance option under Calendar Schedule */}
        <Menu.Item key="maintenance" icon={<ToolOutlined />}>
          Maintenance
        </Menu.Item>
        {/* Amenity Reservation option under Calendar Schedule */}
        <Menu.Item key="amenityReservation" icon={<ScheduleOutlined />}>
          Amenity Reservation
        </Menu.Item>
      </Menu.SubMenu>

      {/* Other main menu items */}
      <Menu.Item key="chat" icon={<MessageOutlined />}>
        Chat Thread
      </Menu.Item>
      <Menu.Item key="payments" icon={<WalletOutlined />}>
        Payments
      </Menu.Item>
      <Menu.Item key="packageTracker" icon={<GiftOutlined />}>
        Package Tracker
      </Menu.Item>
    </Menu>
  );
};

export default SiderMenu;
