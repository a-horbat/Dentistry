import React from "react";
import { StepTemplate } from "./template";

export default (props) => {
  return (
    <StepTemplate 
      {...props}
      primary={<>Simplify your Food Cost tracking</>}
      secondary={<>Create amazing dining experiences, not paperwork</>}
    />
  );
};
