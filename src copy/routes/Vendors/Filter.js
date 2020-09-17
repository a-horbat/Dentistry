import React from "react";
import { SelectManyDrawer, useSelectManyControls } from "../../components/SelectManyDrawer";

export const useSelectManyCategoriesControls = () => {
  return useSelectManyControls({})
}

export const VendorFilterDrawer = ({ controls, open, options, loading, selected, setSelected }) => {
  return (
    <SelectManyDrawer
      loading={loading}
      id="select-many-categories"
      name="Filter by category"
      selected={selected}
      setSelected={setSelected}
      options={options || []}
      controls={controls}
      open={open}
    />
  );
};
