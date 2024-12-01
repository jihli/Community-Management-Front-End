const postsData = {
  notice: Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `Notice Post ${i + 1}`,
    content: `Content of Notice Post ${i + 1}`,
    date: `2024-11-${i + 1}`.padStart(2, "0"),
  })),
  discussion: Array.from({ length: 20 }, (_, i) => ({
    id: i + 11,
    title: `Discussion Post ${i + 1}`,
    content: `Content of Discussion Post ${i + 1}`,
    date: `2024-11-${i + 11}`.padStart(2, "0"),
  })),
};

postsData.notice[0].title = "Important Notice About Payment";
postsData.notice[0].content =
  "If you would like to make a payment for your order, please send the funds via e-transfer to the email xxxx@gmail.com and include your name, room number, and the order's reference number in the notes.";

postsData.notice[1].title = "Scheduled Power Outage Notice";
postsData.notice[1].content =
  "Please be aware that a scheduled power outage will occur on December 5th from 8:00 AM to 2:00 PM due to necessary maintenance work. We apologize for any inconvenience and appreciate your understanding.";

postsData.notice[2].title = "Reminder: Annual General Meeting";
postsData.notice[2].content =
  "Residents are reminded that the Annual General Meeting (AGM) will take place on January 15th at 7:00 PM in the main hall. We encourage all residents to attend and participate in the community discussions";

postsData.notice[3].title = "New Parking Policy Effective January 2022";
postsData.notice[3].content =
  "Starting January 2022, a new parking policy will be implemented to better manage our parking space availability. All vehicle owners are required to register their vehicles with the property management office by December 20th. Please refer to the attached policy document for detailed information.";

postsData.notice[4].title = "Water Supply Maintenance Notice";
postsData.notice[4].content =
  "Maintenance work on the building's water supply system is scheduled for November 30th, which may result in temporary water service interruptions between 9:00 AM and 5:00 PM. Please make any necessary arrangements to minimize disruption. Thank you for your cooperation";

postsData.discussion[0].title = "Anyone Up for a Hiking Adventure?";
postsData.discussion[0].content =
  "When: Saturday, November 2, 1:30–3:30 pm\nMeet: Elizabeth Street parking lot at Bell Park\nDistance: 6-7 km\nTerrain: Mostly maintained trails with optional climbing/descending rocky terrain.\nDress: Comfortable hiking shoes, dress for the weather\nLeader: Paul Haynes\nPre-registration required";

export const fetchPosts = (type) => {
  return Promise.resolve(postsData[type]);
};

export const fetchPostById = (id) => {
  const allPosts = [...postsData.notice, ...postsData.discussion];
  return Promise.resolve(allPosts.find((post) => post.id === parseInt(id)));
};
