import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Box } from '@material-ui/core';
import MainTable from '../../../../components/MainTable/MainTable';
import { MainLayoutHeader } from '../../../../layouts/MainLayout/MainLayout';
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
  SortProvider,
  SearchProvider,
  SelectedProvider,
  CrudProvider,
  usePagination,
  useSort,
  useFindContext,
} from '@elevatejs/material-crud-ui';
import {
  UpdateMultipleProvider,
  useUpdateMultiple,
} from '../../../../components/Update/context';
import {
  productTableData as data,
  productColumns,
  productTableDataForSuppliers as supplierData,
  productColumnsForSuppliers,
} from './data';
import RoleContext from '../../../../utils/roleContext';
import { View, Remove, LinkCatalog } from '../../../../assets/Icons/Prover';
import { Add } from '@material-ui/icons';

const overflowMenuContent = [
  {
    code: 'viewDetails',
    text: 'View Detail',
    icon: View,
    callback: () => {
      console.log('View Detail');
    },
  },
  {
    code: 'removeQuote',
    text: 'Remove from Quote',
    icon: Remove,
    callback: () => {
      console.log('Remove from Quote');
    },
  },
];

const changeViewContain = [
  { id: 'default', optionName: 'Default', optionValue: true },
  { id: 'expanded', optionName: 'Expanded', optionValue: false },
];

const QuoteEditStepProducts = ({
  step,
  isProductDetailOpen,
  selectedProductDetail,
  handleAddClick,
  setEditMode,
  handleItemClick,
  handleLinkProduct,
  hanldeAlternativeItemClick,
}) => {
  const [filterOpen, filterControls] = useBooleanControls(false);
  const [changeView, setChangeView] = useState(changeViewContain);
  const isViewExpanded = changeView && changeView[1].optionValue; // will be changed when we get new options;
  const { isEditingMultiple, setIsEditingMultiple } = useUpdateMultiple();

  const user = useContext(RoleContext);

  const edit = () => {
    setIsEditingMultiple(true);
  };

  useEffect(() => {
    setEditMode(isEditingMultiple);
  }, [isEditingMultiple]);

  const overflowLinkContent = [
    {
      code: 'linkNewProduct',
      text: 'Link new Product',
      icon: Add,
      callback: () => {
        handleLinkProduct();
        console.log('Link new Product');
      },
    },
    {
      code: 'linkCatalogProduct',
      text: 'Link catalog product',
      icon: LinkCatalog,
      callback: () => {
        console.log('Link catalog product');
      },
    },
  ];
  const getUserRoleProps = (role) => ({
    tableProps: {
      headCells:
        role === 'Supplier' ? productColumnsForSuppliers : productColumns,
      overflowLinkContent:
        role === 'Supplier' && step !== 1 ? overflowLinkContent : null,
      withCollapse: role === 'Supplier',
      rows: role === 'Supplier' ? supplierData : data,
      handleDelete: role === 'Supplier' && step !== 1 ? () => ({}) : null,
      handleExtendedClick:
        role === 'Supplier' ? hanldeAlternativeItemClick : null,
      // hasActions: role === 'Supplier' && step == 1,
    },
  });
  const { tableProps } = useMemo(() => getUserRoleProps(user.role));

  return (
    <Box>
      <MainLayoutHeader
        titleStyles={{ fontSize: 20 }}
        filterOpen={filterOpen}
        filterControls={filterControls}
        add={handleAddClick ? handleAddClick : null}
        editMode={isEditingMultiple}
        edit={
          user.role == 'Customer' || (step === 1 && user.role === 'Supplier')
            ? edit
            : null
        }
        title={`Products(${data?.length})`}
      />
      <MainTable
        onItemClick={handleItemClick}
        selected={selectedProductDetail}
        isViewExpanded={isViewExpanded}
        isShort={isProductDetailOpen}
        overflowMenuContent={overflowMenuContent}
        disableEditButtons
        {...tableProps}
      />
    </Box>
  );
};

const selectFindData = (type, data) => data?.productList?.data ?? [];
const selectFindTotal = (type, data) => data?.productList?.total ?? 0;
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
      selectFindData={selectFindData}
      selectFindTotal={selectFindTotal}
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

export default React.memo(
  ({
    isProductDetailOpen,
    selectedProductDetail,
    setSelectedProductDetail,
    setIsProductDetailOpen,
    handleAddClick,
    setEditMode,
    step,
    hanldeAlternativeItemClick,
    handleItemClick,
    handleLinkProduct,
  }) => {
    return (
      <PaginationProvider initialPerPage={5}>
        <SortProvider>
          <SearchProvider>
            <SelectedProvider>
              <ProductsProvider>
                <QuoteEditStepProducts
                  setSelectedProductDetail={setSelectedProductDetail}
                  isProductDetailOpen={isProductDetailOpen}
                  selectedProductDetail={selectedProductDetail}
                  setIsProductDetailOpen={setIsProductDetailOpen}
                  handleAddClick={handleAddClick}
                  setEditMode={setEditMode}
                  step={step}
                  hanldeAlternativeItemClick={hanldeAlternativeItemClick}
                  handleItemClick={handleItemClick}
                  handleLinkProduct={handleLinkProduct}
                />
              </ProductsProvider>
            </SelectedProvider>
          </SearchProvider>
        </SortProvider>
      </PaginationProvider>
    );
  },
);
