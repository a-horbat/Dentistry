import React, { useMemo, useState, useEffect } from 'react';
import {
  useBooleanControls,
  FindSuppliersDocument,
  InsertSupplierDocument,
  UpdateSupplierDocument,
  RemoveManySuppliersDocument,
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
  useSearch,
} from '@elevatejs/material-crud-ui';
import { Box, Grid, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import cn from 'classnames';
import SupplierDetail from '../../components/SupplierDetail';
import { MainLayoutHeader } from '../../layouts/MainLayout/MainLayout';
import MainTable from '../../components/MainTable/MainTable';
import ArrowLeft from '../../assets/Icons/ArrowLeft';
import MainLayoutStyles from '../../layouts/MainLayout/MainLayoutStyles';
import EmptyScreen from '../../components/EmptyScreen';
import View from '../../assets/Icons/Prover/View';
import Catalog from '../../assets/Icons/Prover/Catalog';
import OrderList from '../../assets/Icons/Prover/OrderList';
import { useParams, useHistory } from 'react-router-dom';
import OrderListScreen from './OrderListScreen';
import SupplierHistory from '../../components/SupplierHistory';
import Fuse from 'fuse.js';

const suppliersColumns = [
  { id: 'name', label: 'Suppliers', info: 'name' },
  { id: 'products.total', label: 'Products' },
  {
    id: 'state',
    label: 'State',
  },
  {
    id: 'specialty',
    label: 'Specialty',
  },
  {
    id: 'minOrder',
    label: 'Min. Order',
  },
  {
    id: 'annualAmount',
    label: 'Annual Amount',
  },
  {
    id: 'lastPurchase',
    label: 'Last Purchase',
  },
];

const Suppliers = React.memo(() => {
  const [{ searchText }] = useSearch();
  const classes = MainLayoutStyles();

  const [isPageEmpty, setIsPageEmpty] = useState(false);

  const [isSuppliersListOpen, setIsSuppliersListOpen] = useState(true);
  const [isSupplierDetailOpen, setIsSupplierDetailOpen] = useState(false);
  const [isSupplierHistoryOpen, setIsSupplierHistoryOpen] = useState(false);

  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState('');
  const [selectedSupplierHistory, setSelectedSupplierHistory] = useState('');

  const [filterOpen, filterControls] = useBooleanControls(false);
  const [orderListOpen, orderListControls] = useBooleanControls(false);

  const { data, loading } = useFindContext();

  const params = useParams();
  const history = useHistory();

  //console.log('isSuppliersListOpen', isSuppliersListOpen);
  //console.log('isSupplierDetailOpen', isSupplierDetailOpen);
  //console.log('isSupplierHistoryOpen', isSupplierHistoryOpen);

  useEffect(() => {
    const { supplierId, productId } = params;
    setIsSuppliersListOpen(!productId);
    setIsSupplierDetailOpen(supplierId);
  }, []);

  if (isPageEmpty) {
    return <EmptyScreen />;
  }

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
      code: 'viewCatalog',
      text: 'View Catalog',
      icon: Catalog,
      callback: () => {
        console.log('View Catalog');
      },
    },
    {
      code: 'viewOrderList',
      text: 'View Order List',
      icon: OrderList,
      callback: (id) => {
        orderListControls.setTrue();
      },
    },
  ];

  const makeSupplierIndex = (suppliers) => {
    // const parsed = products.map((invoice) => ({
    //   rawDocumentText: parseScanResultsText(invoice.scanResultList),
    // }));
    return new Fuse(suppliers, {
      keys: ['name'],
      threshold: 0,
    });
  };

  const productIndex = useMemo(() => makeSupplierIndex(data), [data]);

  const filteredSuppliers = searchText ? productIndex.search(searchText) : data;

  return (
    <>
      <Grid
        container
        justifyContent="center"
        className={classes.bodyGrid__container}
        style={
          !isSuppliersListOpen
            ? {
                flexWrap: 'unset',
                flexDirection: 'column',
                alignItems: 'center',
              }
            : {}
        }
      >
        {isSuppliersListOpen && (
          <Grid xs item className={classes.bodyGrid__item}>
            <Box className={classes.bodyGrid__itemTitle}>
              <MainLayoutHeader
                title="Suppliers"
                filterOpen={filterOpen}
                filterControls={filterControls}
              />
            </Box>
            <MainTable
              onItemClick={(id) => {
                setSelectedSupplierDetail(id);
                setIsSuppliersListOpen(true);
                setIsSupplierDetailOpen(true);
                history.push(`/suppliers/${id}/`);
              }}
              selected={selectedSupplierDetail}
              headCells={suppliersColumns}
              rows={filteredSuppliers}
              isShort={isSupplierDetailOpen}
              overflowMenuContent={overflowMenuContent}
            />
          </Grid>
        )}

        {!isSuppliersListOpen && (
          <div style={{ width: isSupplierHistoryOpen ? 784 * 2 + 32 : 784 }}>
            <Box className={classes.bodyGrid__itemTitle}>
              <Typography
                variant="h1"
                className={classes.mainExpandedPageTitle}
              >
                <IconButton
                  className={classes.bodyGrid__itemTitleIconBack}
                  onClick={() => {
                    setIsSuppliersListOpen(true);
                    setIsSupplierDetailOpen(true);
                    setIsSupplierHistoryOpen(false);
                    setSelectedSupplierHistory('');
                    history.push(
                      `/suppliers/${
                        params.supplierId ? params.supplierId + '/' : ''
                      }`,
                    );
                  }}
                >
                  <ArrowLeft />
                </IconButton>
                Supplier Details
              </Typography>
            </Box>
          </div>
        )}

        {isSupplierDetailOpen && (
          <Grid
            item={true}
            container
            xs={12}
            justifyContent="center"
            className={`${
              isSuppliersListOpen ? classes.bodyGrid__itemWithMaxMinWidth : ''
            }`}
            style={
              !isSuppliersListOpen
                ? {
                    maxHeight: 'calc(100% - 65px)',
                    flexWrap: 'nowrap',
                    marginRight: 10,
                  }
                : { maxHeight: '100%', marginRight: 10 }
            }
          >
            <Grid
              item
              xs={isSuppliersListOpen ? 1 : 1 ? 12 : 1}
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              <Paper
                xs={isSuppliersListOpen ? 1 : 12}
                className={cn(
                  classes.bodyGrid__itemPaper,
                  classes.bodyGrid__itemWithMaxMinWidth,
                  {
                    [classes.bodyGrid__itemPaperWithTitle]: !isSuppliersListOpen,
                  },
                )}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <SupplierDetail
                  selected={selectedSupplierDetail}
                  expandable={isSuppliersListOpen}
                  closable={isSuppliersListOpen}
                  onClose={() => {
                    setIsSuppliersListOpen(true);
                    setIsSupplierDetailOpen(false);
                    setSelectedSupplierDetail('');
                    history.push(`/suppliers/`);
                  }}
                  openFullScreen={() => {
                    setIsSuppliersListOpen(false);
                    setIsSupplierDetailOpen(true);
                    setIsSupplierHistoryOpen(false);
                    history.push(
                      `/suppliers/${
                        params.supplierId ? params.supplierId + '/' : ''
                      }`,
                    );
                  }}
                  openSupplierHistoryCallback={(supplierId) => {
                    setIsSuppliersListOpen(false);
                    setIsSupplierDetailOpen(true);
                    setIsSupplierHistoryOpen(true);
                    setSelectedSupplierHistory(supplierId);
                    history.push(
                      `/suppliers/${
                        params.supplierId ? params.supplierId + '/' : ''
                      }${supplierId}/`,
                    );
                  }}
                  selectedSupplierHistory={selectedSupplierHistory}
                  setSelectedSupplierHistory={setSelectedSupplierHistory}
                />
              </Paper>
            </Grid>
            {isSupplierHistoryOpen && (
              <Grid
                item
                xs
                className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
                style={{ overflow: 'visible' }}
              >
                {!isSuppliersListOpen && (
                  <Box className={classes.bodyGrid__itemTitle} />
                )}
                <Paper
                  className={cn(classes.bodyGrid__itemPaper, {
                    [classes.bodyGrid__itemPaperWithTitle]: !isSuppliersListOpen,
                  })}
                  style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
                >
                  <SupplierHistory
                    selectedSupplierHistory={selectedSupplierHistory}
                    onClose={() => {
                      setIsSupplierHistoryOpen(false);
                      setSelectedSupplierHistory('');
                      history.push(
                        `/suppliers/${
                          params.supplierId ? params.supplierId + '/' : ''
                        }`,
                      );
                    }}
                  />
                </Paper>
              </Grid>
            )}
          </Grid>
        )}
      </Grid>
      <OrderListScreen
        open={orderListOpen}
        close={orderListControls.setFalse}
      />
    </>
  );
});
//const [orderListOpen, orderListControls] = useBooleanControls(false);

// const selectFindData = (type, data) => data?.findSuppliers?.data ?? [];
// const selectFindTotal = (type, data) => data?.findSuppliers?.total ?? 0;
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

export default React.memo(() => {
  return (
    <PaginationProvider initialPerPage={5}>
      <SortProvider>
        <SearchProvider>
          <SelectedProvider>
            <SuppliersProvider>
              <Suppliers />
            </SuppliersProvider>
          </SelectedProvider>
        </SearchProvider>
      </SortProvider>
    </PaginationProvider>
  );
});
