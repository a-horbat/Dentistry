import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  useBooleanControls,
  FindSuppliersDocument,
  InsertSupplierDocument,
  UpdateSupplierDocument,
  RemoveManySuppliersDocument,
} from '@base86inc/apollo-client';
import {
  PaginationProvider,
  CrudProvider,
  usePagination,
  useSort,
  useFindContext,
} from '@elevatejs/material-crud-ui';
import { suppliersTableData as data, addSuppliersColumns } from './data';
import { MainLayoutHeader } from '../../../../layouts/MainLayout/MainLayout';
import MainTable from '../../../../components/MainTable/MainTable';

const AddModalSuppliersContent = ({ classes, addingItems, setAddingItems }) => {
  const [filterOpen, filterControls] = useBooleanControls(false);
  return (
    <PaginationProvider initialPerPage={5}>
      <SuppliersProvider>
        <MainLayoutHeader
          titleComponent={
            <Box display="flex" alignItems="center">
              <Typography className={classes.addModalHeaderTypography}>
                Suppliers list
              </Typography>
              <Typography
                className={classes.selectedItemsTypography}
              >{`${addingItems?.length} suppliers selected`}</Typography>
            </Box>
          }
          filterOpen={filterOpen}
          filterControls={filterControls}
        />
        <MainTable
          hasActions={false}
          headCells={addSuppliersColumns}
          rows={data}
          isViewExpanded={false}
          isShort={false}
          overflowMenuContent={false}
          withCheckbox
          setSelectedItems={setAddingItems}
          selectedItems={addingItems}
        />
      </SuppliersProvider>
    </PaginationProvider>
  );
};

export default AddModalSuppliersContent;

const SuppliersProvider = React.memo(({ children }) => {
  const [sort] = useSort();
  const [pagination] = usePagination();
  const variables = useMemo(
    () => ({
      pagination,
      sort,
    }),
    [pagination, sort],
  );
  return (
    <CrudProvider
      idField="id"
      typeName="Supplier"
      // selectFindData={selectFindData}
      // selectFindTotal={selectFindTotal}
      findDocument={FindSuppliersDocument}
      insertDocument={InsertSupplierDocument}
      updateDocument={UpdateSupplierDocument}
      removeManyDocument={RemoveManySuppliersDocument}
      variables={variables}
    >
      {children}
    </CrudProvider>
  );
});
