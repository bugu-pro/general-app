import { message } from 'antd';

export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
      message.error(err.message, 3);
    },
  },
};
