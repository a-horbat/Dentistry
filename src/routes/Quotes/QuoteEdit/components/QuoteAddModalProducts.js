import React, { useMemo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  useBooleanControls,
  ProductListDocument,
  CreateProductDocument,
  UpdateProductDocument,
  RemoveManyProductsDocument,
  UpdateProductsDocument,
} from '@base86inc/apollo-client';
import {
  PaginationProvider,
  CrudProvider,
  usePagination,
  useSort,
  useFindContext,
} from '@elevatejs/material-crud-ui';
import { UpdateMultipleProvider } from '../../../../components/Update/context';
import { productTableData as data, addProductColumns } from './data';
import { MainLayoutHeader } from '../../../../layouts/MainLayout/MainLayout';
import MainTable from '../../../../components/MainTable/MainTable';

const AddModalProductsContent = ({ classes, addingItems, setAddingItems }) => {
  const [filterOpen, filterControls] = useBooleanControls(false);
  return (
    <PaginationProvider initialPerPage={5}>
      <ProductsProvider>
        <MainLayoutHeader
          titleComponent={
            <Box display="flex" alignItems="center">
              <Typography className={classes.addModalHeaderTypography}>
                Products list
              </Typography>
              <Typography
                className={classes.selectedItemsTypography}
              >{`${addingItems?.length} products selected`}</Typography>
            </Box>
          }
          filterOpen={filterOpen}
          filterControls={filterControls}
        />
        <MainTable
          hasActions={false}
          headCells={addProductColumns}
          rows={data}
          isViewExpanded={false}
          isShort={false}
          overflowMenuContent={false}
          withCheckbox
          setSelectedItems={setAddingItems}
          selectedItems={addingItems}
        />
      </ProductsProvider>
    </PaginationProvider>
  );
};

export default AddModalProductsContent;

const verifySingleUpdate = (update) => {
  if (!isNaN(Number(update?.annualQuantity)))
    return { ...update, annualQuantity: Number(update?.annualQuantity) };
  return update;
};
const verifyMultipleUpdate = (multipleUpdate) => {
  const productIds = Object.keys(multipleUpdate);
  if (!productIds.length) throw new Error('No updates to perform');
  const products = productIds.map((id) =>
    verifySingleUpdate(multipleUpdate[id]),
  );
  return {
    variables: {
      productIds,
      products,
    },
  };
};

const ProductsProvider = React.memo(({ children }) => {
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
      idField="_id"
      typeName="Quote"
      findDocument={ProductListDocument}
      insertDocument={CreateProductDocument}
      updateDocument={UpdateProductDocument}
      removeManyDocument={RemoveManyProductsDocument}
      variables={variables}
    >
      <UpdateMultipleProvider
        updateMultipleDocument={UpdateProductsDocument}
        verifyUpdate={verifyMultipleUpdate}
      >
        {children}
      </UpdateMultipleProvider>
    </CrudProvider>
  );
});
