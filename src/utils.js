// src/utils.js

// 通用的请求函数
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error; // 抛出错误以便调用者处理
  }
}

// MaintenanceRequests API
export const MaintenanceRequestsAPI = {
  /**
   * 新增维修请求
   * @param {number} userId - 用户 ID
   * @param {string} description - 问题描述
   * @param {string} requestDate - 维修日期
   * @returns {Promise<object>} - 创建成功的维修请求信息
   */
  createRequest: (userId, description, requestDate) =>
    request("/maintenance-requests", {
      method: "POST",
      body: JSON.stringify({
        userId,
        description,
        requestDate,
      }),
    }),

  /**
   * 查看历史维修请求
   * @param {number} userId - 用户 ID
   * @returns {Promise<Array>} - 用户的历史维修请求列表
   */
  getRequests: (userId) => request(`/maintenance-requests?user_id=${userId}`),
};

// AmenityReservations API
export const AmenityReservationsAPI = {
  /**
   * 获取设施列表
   * @returns {Promise<Array>} - 可用设施列表
   */
  getAmenities: () => request("/amenity-reservations/amenities"),

  /**
   * 新增设施预约
   * @param {number} userId - 用户 ID
   * @param {number} amenityId - 设施 ID
   * @param {string} date - 预约日期
   * @param {string} time - 预约时间
   * @returns {Promise<object>} - 创建成功的预约信息
   */
  createReservation: (userId, amenityId, reservationDate, reservationTime) =>
    request("/amenity-reservations", {
      method: "POST",
      body: JSON.stringify({
        userId,
        amenityId,
        reservationDate,
        reservationTime,
      }),
    }),

  /**
   * 查看历史预约
   * @param {number} userId - 用户 ID
   * @returns {Promise<Array>} - 用户的历史预约列表
   */
  getReservations: (userId) =>
    request(`/amenity-reservations?user_id=${userId}`),
};

export default {
  MaintenanceRequestsAPI,
  AmenityReservationsAPI,
};
