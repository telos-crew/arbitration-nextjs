import { notification } from 'antd';

const createNotification = (type, message, description, duration) => {
  notification[type]({
    message,
    description,
    duration
  });
};
export default createNotification;
