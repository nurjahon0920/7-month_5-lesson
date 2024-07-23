import { Alert, Button, message } from "antd";
import React from "react";

const AntAlert = () => {
  const handleClick = () => {
    // message.success("Successfully clicked");
    // message.error("Something went wrong");
    message.warning("Warning");
  };
  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        Submit
      </Button>
      <Alert
        type="error"
        message="Something went wrong"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil explicabo tenetur velit, deleniti asperiores sequi soluta quae a vel impedit suscipit sapiente, itaque aspernatur nostrum culpa. Ipsum qui a perferendis."
      />
    </div>
  );
};

export default AntAlert;
