import ApprovedIcon from "../../components/Icons/Approved";
import ArchiveIcon from "../../components/Icons/Archive";
import IllegibleIcon from "../../components/Icons/Illegible";
import ProcessingIcon from "../../components/Icons/Processing";
import ToReviewIcon from "../../components/Icons/ToReview";
import {
  SelectManyDrawer,
  createFilterContext
} from "../../components/SelectManyDrawer";
import React from "react";

const statusFilters = {
  to_review: true,
  //requested: true,
  processing: true,
  illegible: true,
  approved: true,
  archived: false,
  // deleted: true
};

const InvoiceFilterContext = createFilterContext(statusFilters)

export const InvoiceFilterProvider = InvoiceFilterContext.Provider

export const useInvoiceFilters = () => {
  return InvoiceFilterContext.useContext();
};

export const InvoiceFilterDrawer = ({
  selected,
  setSelected,
  filterOpen,
  filterControls,
  initial,
}) => {
  const changeFilters = f => {
    filterControls.setFalse();
    setSelected(f);
  };
  return (
    <SelectManyDrawer
      name="Filter Invoices"
      selected={selected}
      setSelected={setSelected}
      options={statusOptions}
      open={filterOpen}
      controls={filterControls}
      initial={initial}
    />
  );
};

const statusOptions = [
  {
    name: "Ready To Review",
    icon: <ToReviewIcon style={{ width: 24, height: 24, marginRight: 8 }} />,
    value: "to_review"
  },
  {
    name: "Approved",
    icon: <ApprovedIcon style={{ width: 24, height: 24, marginRight: 8 }} />,
    value: "approved"
  },
  {
    name: "Processing",
    icon: <ProcessingIcon style={{ width: 24, height: 24, marginRight: 8 }} />,
    value: "processing"
  },
  {
    name: "Illegible",
    icon: <IllegibleIcon style={{ width: 24, height: 24, marginRight: 8 }} />,
    value: "illegible"
  },
  {
    name: "Archived",
    icon: <ArchiveIcon style={{ width: 24, height: 24, marginRight: 8 }} />,
    value: "archived"
  }
];
