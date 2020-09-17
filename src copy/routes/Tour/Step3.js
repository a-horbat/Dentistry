import React from "react";
import { StepTemplate } from "./template";

export default (props) => {
  return (
    <StepTemplate 
      {...props}
      primary={<>Smart alerting</>}
      secondary={<>We track the history of your line item prices. When the price goes up above a threshold, we'll alert you automatically, so you can take action with the vendor or make changes to your menu.</>}
    />
  );
};
