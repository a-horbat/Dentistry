import React, { useState, useMemo, useEffect } from 'react';
import { Box } from '@material-ui/core';
import MainTable from '../../../../components/MainTable/MainTable';
import { MainLayoutHeader } from '../../../../layouts/MainLayout/MainLayout';
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
  useBooleanControls,
  FindSuppliersDocument,
  InsertSupplierDocument,
  UpdateSupplierDocument,
  RemoveManySuppliersDocument,
} from '@base86inc/apollo-client';
import {
  UpdateMultipleProvider,
  useUpdateMultiple,
} from '../../../../components/Update/context';
import View from '../../../../assets/Icons/Prover/View';
import Remove from '../../../../assets/Icons/Prover/Remove';
import { suppliersTableData as data, suppliersColumns } from './data';

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

const QuoteEditStepSuppliers = ({
  params,
  history,
  selectedSupplierDetail,
  setSelectedSupplierDetail,
  isSupplierDetailOpen,
  setIsSupplierDetailOpen,
  handleAddClick,
}) => {
  const [filterOpen, filterControls] = useBooleanControls(false);

  return (
    <Box>
      <MainLayoutHeader
        title={`Suppliers (${data.length})`}
        titleStyles={{ fontSize: 20 }}
        filterOpen={filterOpen}
        filterControls={filterControls}
        add={handleAddClick}
      />

      <MainTable
        onItemClick={(id) => {
          setIsSupplierDetailOpen(true);
          setSelectedSupplierDetail(id);
          history.push(
            `/quotes/edit/${
              params?.quoteId ? params.quoteId : ''
            }/${id}?type="supplier"`,
          );
        }}
        selected={selectedSupplierDetail}
        headCells={suppliersColumns}
        rows={data}
        isShort={isSupplierDetailOpen}
        overflowMenuContent={overflowMenuContent}
      />
    </Box>
  );
};

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
      <UpdateMultipleProvider
        updateMultipleDocument={UpdateSupplierDocument}
        // verifyUpdate={verifyMultipleUpdate}
      >
        {children}
      </UpdateMultipleProvider>
    </CrudProvider>
  );
});

export default React.memo(
  ({
    params,
    history,
    selectedSupplierDetail,
    setSelectedSupplierDetail,
    isSupplierDetailOpen,
    setIsSupplierDetailOpen,
    handleAddClick,
  }) => {
    return (
      <PaginationProvider initialPerPage={5}>
        <SortProvider>
          <SearchProvider>
            <SelectedProvider>
              <SuppliersProvider>
                <QuoteEditStepSuppliers
                  params={params}
                  history={history}
                  selectedSupplierDetail={selectedSupplierDetail}
                  setSelectedSupplierDetail={setSelectedSupplierDetail}
                  isSupplierDetailOpen={isSupplierDetailOpen}
                  setIsSupplierDetailOpen={setIsSupplierDetailOpen}
                  handleAddClick={handleAddClick}
                />
              </SuppliersProvider>
            </SelectedProvider>
          </SearchProvider>
        </SortProvider>
      </PaginationProvider>
    );
  },
);
