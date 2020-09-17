import React from 'react';
import { StepTemplate } from './template';

export default (props) => {
  return (
    <StepTemplate
      {...props}
      primary={<>Easily track your Food Cost on near-real-time basis</>}
      secondary={
        <>
          Track paper vendor invoices as easily as any other expense. A quick
          connection to your POS and accounting systems gives you an accurate
          view of your Food Cost at all times.
        </>
      }
    />
  );
};
