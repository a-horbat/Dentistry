import React from "react";
import { StepTemplate } from "./template";

export default (props) => {
  return (
    <StepTemplate 
      {...props}
      primary={<>Paper invoice tracking is a snap, literally</>}
      secondary={<>Quickly snap a paper invoice, and we'll extract all the information, including breaking down line item entries, quantities and cost. No more manual data entry by your team or your accountant, saving time and money.</>}
    />
  );
};
