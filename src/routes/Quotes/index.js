import React, { useMemo, useState, useEffect, useContext } from 'react';
import {
  CreateProductDocument,
  ProductListDocument,
  RemoveManyProductsDocument,
  UpdateProductDocument,
  UpdateProductsDocument,
  useBooleanControls,
} from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {
  CrudProvider,
  PaginationProvider,
  SearchProvider,
  SelectedProvider,
  SortProvider,
  useFindContext,
  usePagination,
  useSort,
  useSearch,
} from '@elevatejs/material-crud-ui';
import { Paper } from '@material-ui/core';
import cn from 'classnames';
import ArrowLeft from '../../assets/Icons/ArrowLeft';
import QuoteDetailForCustomers from '../../components/QuoteDetail';
import ProductDetail from '../../components/ProductDetail';
import SupplierDetail from '../../components/SupplierDetail';
import {
  UpdateMultipleProvider,
  useUpdateMultiple,
} from '../../components/Update/context';
import MainLayoutStyles from '../../layouts/MainLayout/MainLayoutStyles';
import EmptyScreen from '../../components/EmptyScreen';
import { MainLayoutHeader } from '../../layouts/MainLayout/MainLayout';
import MainTable from '../../components/MainTable/MainTable';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import View from '../../assets/Icons/Prover/View';
import Supplier from '../../assets/Icons/Prover/Supplier';
import Edit from '../../assets/Icons/Prover/EditAction';
import Product from '../../assets/Icons/Prover/Product';
import { quotesCustomerColumns, customerData } from './CustomerData';
import { supplierColumns, supplierData } from './SupplierRole/SupplierData';
import roleContext from '../../utils/roleContext';
import QuoteDetailForSupplier from './SupplierRole/QuoteDetailForSupplier';
import QuoteHistoryForSuppliers from './SupplierRole/QuoteHistoryForSuppliers';
import Fuse from 'fuse.js';

const Quotes = React.memo(() => {
  const [{ searchText }] = useSearch();
  const { role } = useContext(roleContext);
  //const role = 'Supplier';
  const classes = MainLayoutStyles();
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  // const [isPageEmpty, setIsPageEmpty] = useState(false);

  const [isQuotesListOpen, setIsQuotesListOpen] = useState(true);
  const [isQuoteDetailOpen, setIsQuoteDetailOpen] = useState(false);
  const [isSupplierDetailOpen, setIsSupplierDetailOpen] = useState(false);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState('');
  const [selectedProductDetail, setSelectedProductDetail] = useState('');
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState('');

  const { data, loading } = useFindContext();

  const [filterOpen, filterControls] = useBooleanControls(false);
  //const { setIsEditingMultiple, isEditingMultiple } = useUpdateMultiple();

  useEffect(() => {
    const { quoteId, detailsId } = params;
    const isProductDetail = location.search.includes('product') ?? false;
    const isSuppliedDetail = location.search.includes('supplied') ?? false;

    setSelectedQuoteDetail(quoteId ?? '');
    setSelectedProductDetail((isProductDetail && detailsId) ?? '');
    setSelectedSupplierDetail((isSuppliedDetail && detailsId) ?? '');

    setIsQuotesListOpen(!detailsId);
    setIsQuoteDetailOpen(!!quoteId);
    setIsProductDetailOpen(!!detailsId && isProductDetail);
    setIsSupplierDetailOpen(!!detailsId && isSuppliedDetail);
  }, []);

  // const edit = () => {
  //   setIsEditingMultiple(true);
  // };

  const add = () => {
    history.push('/quotes/edit/draft');
  };

  const isPageEmpty = loading === false && data.length === 0;

  const overflowMenuContentSupplier = [
    {
      code: 'viewDetails',
      text: 'View Detail',
      icon: View,
      callback: () => {
        console.log('View Detail');
      },
    },
    {
      code: 'editQuote',
      text: 'Edit Quote',
      icon: Edit,
      callback: () => {
        console.log('Edit Quote');
      },
    },
    {
      code: 'viewProducts',
      text: 'View Products',
      icon: Product,
      callback: () => {
        console.log('View Products');
      },
    },
  ];

  const overflowMenuContentCustomer = [
    {
      code: 'viewDetails',
      text: 'View Detail',
      icon: View,
      callback: () => {
        console.log('View Detail');
      },
    },
    {
      code: 'editQuote',
      text: 'Edit Quote',
      icon: Edit,
      callback: (quoteId) => {
        history.push(`/quotes/edit/${quoteId}`, { id: quoteId });
      },
    },
    {
      code: 'viewProducts',
      text: 'View Products',
      icon: Product,
      callback: () => {
        console.log('View Products');
      },
    },
    {
      code: 'viewSuppliers',
      text: 'View Suppliers',
      icon: Supplier,
      callback: () => {
        console.log('View Suppliers');
      },
    },
  ];

  const getRoleData = (role) => {
    switch (role) {
      case 'Supplier':
        return {
          rowData: supplierData,
          headData: supplierColumns,
          overflowMenuContent: overflowMenuContentSupplier,
          QuoteDetail: QuoteDetailForSupplier,
          QuoteHistory: QuoteHistoryForSuppliers,
        };
        break;
      case 'Customer':
        return {
          rowData: customerData,
          headData: quotesCustomerColumns,
          overflowMenuContent: overflowMenuContentCustomer,
          QuoteDetail: QuoteDetailForCustomers,
          QuoteHistory: ProductDetail,
        };
        break;
      case 'Admin':
        return {
          rowData: [],
          headData: [],
          overflowMenuContent: [],
        };
    }
  };

  const {
    rowData,
    headData,
    overflowMenuContent,
    QuoteDetail,
    QuoteHistory,
  } = useMemo(() => getRoleData(role));

  const makeQuoteIndex = (quote) => {
    return new Fuse(quote, {
      keys: ['name'],
      threshold: 0,
    });
  };

  const quoteIndex = useMemo(() => makeQuoteIndex(rowData), [rowData]);

  const filteredQuotes = searchText ? quoteIndex.search(searchText) : rowData;

  return isPageEmpty ? (
    <EmptyScreen type="quote" />
  ) : (
    <Grid
      container
      justifyContent="center"
      className={classes.bodyGrid__container}
      style={
        !isQuotesListOpen
          ? { flexWrap: 'unset', flexDirection: 'column', alignItems: 'center' }
          : {}
      }
    >
      {isQuotesListOpen && (
        <Grid xs item className={classes.bodyGrid__item}>
          <Box className={classes.bodyGrid__itemTitle}>
            <MainLayoutHeader
              title="Quotes"
              filterOpen={filterOpen}
              filterControls={filterControls}
              add={add}
            />
          </Box>
          <MainTable
            onItemClick={(id) => {
              setSelectedQuoteDetail(id);
              setSelectedProductDetail('');
              setSelectedSupplierDetail('');
              setIsQuotesListOpen(true);
              setIsQuoteDetailOpen(true);
              setIsSupplierDetailOpen(false);
              setIsProductDetailOpen(false);
              history.push(`/quotes/${id}`);
            }}
            selected={selectedQuoteDetail}
            headCells={headData} //{quotesColumns}
            rows={filteredQuotes}
            isShort={
              isProductDetailOpen || isSupplierDetailOpen || isQuoteDetailOpen
            }
            overflowMenuContent={overflowMenuContent}
          />
        </Grid>
      )}

      {!isQuotesListOpen && (
        <div
          style={{
            width:
              isProductDetailOpen || isSupplierDetailOpen ? 784 * 2 + 32 : 784,
          }}
        >
          <Box className={classes.bodyGrid__itemTitle}>
            <Typography variant="h1" className={classes.mainExpandedPageTitle}>
              <IconButton
                className={classes.bodyGrid__itemTitleIconBack}
                onClick={() => {
                  setSelectedQuoteDetail(params?.quoteId);
                  setSelectedProductDetail('');
                  setSelectedSupplierDetail('');
                  setIsQuotesListOpen(true);
                  setIsQuoteDetailOpen(true);
                  setIsSupplierDetailOpen(false);
                  setIsProductDetailOpen(false);
                  history.push(`/quotes/${params?.quoteId ?? ''}`);
                }}
              >
                <ArrowLeft />
              </IconButton>
              Quote Details
            </Typography>
          </Box>
        </div>
      )}

      {isQuoteDetailOpen && (
        <Grid
          container
          xs={12}
          justifyContent="center"
          className={`${
            isQuotesListOpen ? classes.bodyGrid__itemWithMaxMinWidth : ''
          }`}
          style={
            !isQuotesListOpen
              ? { maxHeight: 'calc(100% - 65px)', flexWrap: 'nowrap' }
              : { maxHeight: '100%' }
          }
        >
          <Grid
            item
            xs={
              isQuotesListOpen
                ? true
                : !isProductDetailOpen && !isSupplierDetailOpen
                ? 12
                : true
            }
            className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
            style={{
              overflow: 'visible',
            }}
          >
            <Paper
              className={cn(classes.bodyGrid__itemPaper, {
                [classes.bodyGrid__itemPaperWithTitle]: !isQuotesListOpen,
              })}
              style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
            >
              <QuoteDetail
                quoteId={params?.quoteId}
                selected={selectedProductDetail}
                expandable={isQuotesListOpen}
                closable={isQuotesListOpen}
                onClose={() => {
                  setSelectedQuoteDetail('');
                  setSelectedProductDetail('');
                  setSelectedSupplierDetail('');
                  setIsQuotesListOpen(true);
                  setIsQuoteDetailOpen(false);
                  setIsSupplierDetailOpen(false);
                  setIsProductDetailOpen(false);
                  history.push(`/quotes`);
                }}
                openFullScreen={() => {
                  setIsQuotesListOpen(false);
                  setIsQuoteDetailOpen(true);
                  setIsSupplierDetailOpen(false);
                  setIsProductDetailOpen(false);
                  history.push(`/quotes/${params?.quoteId ?? ''}`);
                }}
                openProductDetailCallback={(productId) => {
                  setIsQuotesListOpen(false);
                  setIsQuoteDetailOpen(true);
                  setIsSupplierDetailOpen(false);
                  setIsProductDetailOpen(true);
                  history.push(
                    `/quotes/${params?.quoteId ? params.quoteId + '/' : ''}${
                      productId ? productId + '/?type=product' : ''
                    }`,
                  );
                }}
                openSupplierDetailCallback={(supplierId) => {
                  setIsQuotesListOpen(false);
                  setIsQuoteDetailOpen(true);
                  setIsSupplierDetailOpen(true);
                  setIsProductDetailOpen(false);
                  history.push(
                    `/quotes/${params?.quoteId ? params.quoteId + '/' : ''}${
                      supplierId ? supplierId + '/?type=supplier' : ''
                    }`,
                  );
                }}
                selectedProductDetail={selectedProductDetail}
                selectedSupplierDetail={selectedSupplierDetail}
              />
            </Paper>
          </Grid>
          {isProductDetailOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              {!isQuotesListOpen && (
                <Box className={classes.bodyGrid__itemTitle} />
              )}
              <Paper
                className={cn(classes.bodyGrid__itemPaper, {
                  [classes.bodyGrid__itemPaperWithTitle]: !isQuotesListOpen,
                })}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <QuoteHistory
                  selectedProductDetail={selectedProductDetail}
                  onClose={() => {
                    setSelectedProductDetail('');
                    setSelectedSupplierDetail('');
                    setIsQuotesListOpen(false);
                    setIsQuoteDetailOpen(true);
                    setIsSupplierDetailOpen(false);
                    setIsProductDetailOpen(false);
                    history.push(
                      `/quotes/${params?.quoteId ? params.quoteId : ''}`,
                    );
                  }}
                  openProductHistoryCallback={() => ({})}
                />
              </Paper>
            </Grid>
          )}

          {isSupplierDetailOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              {!isQuotesListOpen && (
                <Box className={classes.bodyGrid__itemTitle} />
              )}
              <Paper
                className={cn(classes.bodyGrid__itemPaper, {
                  [classes.bodyGrid__itemPaperWithTitle]: !isQuotesListOpen,
                })}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <SupplierDetail
                  selectedSupplierDetail={selectedSupplierDetail}
                  onClose={() => {
                    setSelectedProductDetail('');
                    setSelectedSupplierDetail('');
                    setIsQuotesListOpen(false);
                    setIsQuoteDetailOpen(true);
                    setIsSupplierDetailOpen(false);
                    setIsProductDetailOpen(false);
                    history.push(
                      `/quotes/${params?.quoteId ? params.quoteId : ''}`,
                    );
                  }}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      )}
    </Grid>
  );
});

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
const QuotesProvider = React.memo(({ children }) => {
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

export default React.memo(() => {
  return (
    <PaginationProvider initialPerPage={5}>
      <SortProvider>
        <SearchProvider>
          <SelectedProvider>
            <QuotesProvider>
              <Quotes />
            </QuotesProvider>
          </SelectedProvider>
        </SearchProvider>
      </SortProvider>
    </PaginationProvider>
  );
});
