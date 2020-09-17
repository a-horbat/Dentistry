import React from "react";
import ApprovedIcon from "./Icons/Approved";
import ArchiveIcon from "./Icons/Archive";
import DeleteIcon from "./Icons/Delete";
import IllegibleIcon from "./Icons/Illegible";
import ProcessingIcon from "./Icons/Processing";
import ToReviewIcon from "./Icons/ToReview";
import IgnoredIcon from "./Icons/Ignore";
import TransferredIcon from "./Icons/Transferred";

export const ItemStatusIcon = ({ status, ...props }) => {
  switch (status) {
    case "active":
    case "approved":
      return <ApprovedIcon {...props} />;
    case "archived":
      return <ArchiveIcon {...props} />;
    case "ignore":
    case "ignored":
      return <IgnoredIcon {...props} />;
    case "illegible":
      return <IllegibleIcon {...props} />;
    case "to_review":
      return <ToReviewIcon {...props} />;
    case "queued":
    case "processing":
    case "pending":
      return <ProcessingIcon {...props} />;
    case "deleted":
      return <DeleteIcon {...props} />;
    case "transferred":
      return <TransferredIcon {...props} />;
    default:
      return null;
  }
};