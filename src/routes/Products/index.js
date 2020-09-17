import React, { useState, useMemo, useEffect, useContext } from 'react';
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
  useSearch,
} from '@elevatejs/material-crud-ui';
import 'firebase/auth';
import Typography from '@material-ui/core/Typography';
import { Grid, Paper, Box } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import cn from 'classnames';
import {
  UpdateMultipleProvider,
  useUpdateMultiple,
} from '../../components/Update/context';
import ProductDetailForCustomer from '../../components/ProductDetail';
import ProductDetailForSupplier from './ProductDetailForSupplier';
import EmptyScreen from '../../components/EmptyScreen';
import UploadGuide from '../../components/UploadGuide';
import Base86Modal from '../../components/Modal';
import { MainLayoutHeader } from '../../layouts/MainLayout/MainLayout';
import MainLayoutStyles from '../../layouts/MainLayout/MainLayoutStyles';
import ProductHistoryForCustomer from '../../components/ProductHistory';
import ProductHistoryForSupplier from './ProductHistoryForSupplier';
import QuoteDetailForSupplier from '../Quotes/SupplierRole/QuoteDetailForSupplier';
import ProductDetailEdit from './ProductDetailEdit';
import ArrowLeft from '../../assets/Icons/ArrowLeft';
import MainTable from '../../components/MainTable/MainTable';
import View from '../../assets/Icons/Prover/View';
import Quotes from '../../assets/Icons/Quotes';
import { useParams, useHistory } from 'react-router-dom';
import roleContext from '../../utils/roleContext';
import {
  SupplierData,
  SupplierColumns,
  //overflowMenuContent as supplierOverflow,
} from './SupplierData';
import {
  ProductColumns,
  overflowMenuContent as customerOverflow,
} from './CustomerData';
import Fuse from 'fuse.js';

const changeViewContain = [
  { id: 'default', optionName: 'Default', optionValue: true },
  { id: 'expanded', optionName: 'Expanded', optionValue: false },
];

const Products = React.memo(() => {
  const [{ searchText }] = useSearch();
  const { role } = useContext(roleContext);
  //const role = 'Supplier';

  const classes = MainLayoutStyles();
  const params = useParams();
  const history = useHistory();

  // const [isPageEmpty, setIsPageEmpty] = useState(false);

  const [isProductsListOpen, setIsProductsListOpen] = useState(true);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isProductHistoryOpen, setIsProductHistoryOpen] = useState(false);

  const [isQuoteDetailOpen, setIsQuoteDetailOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState('');

  const [selectedProductDetail, setSelectedProductDetail] = useState('');
  const [selectedProductHistory, setSelectedProductHistory] = useState('');

  const { data, loading } = useFindContext();
  const [filterOpen, filterControls] = useBooleanControls(false);

  const [isDetailEdit, detailEditControls] = useBooleanControls(false);
  const { setIsEditingMultiple, isEditingMultiple } = useUpdateMultiple();
  const [uploadOpen, uploadControl] = useBooleanControls(false);
  const [guideOpen, guideControl] = useBooleanControls(false);
  const [changeView, setChangeView] = useState(changeViewContain);
  const isViewExpanded = changeView && changeView[1].optionValue; // will be changed when we get new options;

  const isPageEmpty = loading === false && data.length === 0;

  const ProductDetailSupplier = isDetailEdit
    ? ProductDetailEdit
    : ProductDetailForSupplier;

  const changeViewValue = (id) => {
    setChangeView(
      changeView.map((element) => {
        element.optionValue = element.id === id;
        return element;
      }),
    );
  };

  const edit = () => {
    setIsEditingMultiple(true);
    setIsProductDetailOpen(false);
    setSelectedProductDetail(false);
    history.push('/products');
  };

  const add = () => {
    uploadControl.setTrue();
  };

  const showInfo = () => {
    guideControl.setTrue();
  };

  useEffect(() => {
    const { productId, supplierId } = params;
    setIsProductsListOpen(!supplierId);
    setIsProductDetailOpen(productId);
    setIsProductHistoryOpen(supplierId);
    setSelectedProductDetail(productId);
    setSelectedProductHistory(supplierId);
  }, []);

  const supplierOverflow = [
    {
      code: 'viewDetails',
      text: 'View Detail',
      icon: View,
      callback: () => {
        console.log('View Detail');
      },
    },
    {
      code: 'viewQuotes',
      text: 'View Quotes',
      icon: Quotes,
      callback: () => {
        console.log('View Quotes');
      },
    },
  ];

  const getRoleData = (role, isViewExpanded) => {
    switch (role) {
      case 'Customer':
        return {
          rowData: data,
          headData: ProductColumns,
          overflowMenuContent: customerOverflow,
          ProductDetail: ProductDetailForCustomer,
          ProductHistory: ProductHistoryForCustomer,
        };
        break;
      case 'Supplier':
        const headData = SupplierColumns.filter((element) => {
          if (!isViewExpanded && element.isDefaultModeAvailable) {
            return element;
          }
          if (isViewExpanded) return element;
        });
        return {
          rowData: SupplierData,
          headData,
          overflowMenuContent: supplierOverflow,
          ProductDetail: ProductDetailSupplier,
          ProductHistory: ProductHistoryForSupplier,
        };
        break;
      case 'Admin':
        return { rowData: [], headData: [], overflowMenuContent: [] };
      default:
        return {};
    }
  };

  const {
    rowData,
    headData,
    overflowMenuContent,
    ProductDetail,
    ProductHistory,
  } = useMemo(() => getRoleData(role, isViewExpanded));

  const makeProductIndex = (products) => {
    // const parsed = products.map((invoice) => ({
    //   rawDocumentText: parseScanResultsText(invoice.scanResultList),
    // }));
    return new Fuse(products, {
      keys: ['name'],
      threshold: 0,
    });
  };

  const productIndex = useMemo(() => makeProductIndex(rowData), [rowData]);

  const filteredProducts = searchText
    ? productIndex.search(searchText)
    : rowData;

  return isPageEmpty ? (
    <>
      <EmptyScreen type="product" showInfo={showInfo} />
      <UploadGuide open={guideOpen} close={guideControl.setFalse} />
    </>
  ) : (
    <Grid
      container
      justifyContent="center"
      className={classes.bodyGrid__container}
      style={
        !isProductsListOpen
          ? { flexWrap: 'unset', flexDirection: 'column', alignItems: 'center' }
          : {}
      }
    >
      {isProductsListOpen && (
        <Grid xs item className={classes.bodyGrid__item}>
          <Box className={classes.bodyGrid__itemTitle}>
            <MainLayoutHeader
              title="Products"
              edit={edit}
              editMode={isEditingMultiple}
              filterOpen={filterOpen}
              filterControls={filterControls}
              viewExpand
              isViewExpanded={isViewExpanded}
              changeView={changeView}
              changeViewValue={changeViewValue}
              add={add}
            />
          </Box>
          <MainTable
            onItemClick={(id) => {
              setSelectedProductDetail(id);
              setIsProductsListOpen(true);
              setIsProductDetailOpen(true);
              setIsProductHistoryOpen(false);
              setSelectedProductDetail(id);
              history.push(`/products/${id}/`);
            }}
            selected={selectedProductDetail}
            headCells={headData}
            rows={filteredProducts}
            isViewExpanded={isViewExpanded}
            isShort={isProductDetailOpen || isProductHistoryOpen}
            overflowMenuContent={overflowMenuContent}
          />
        </Grid>
      )}

      {!isProductsListOpen && (
        <div
          style={{
            width:
              isProductHistoryOpen || isQuoteDetailOpen ? 784 * 2 + 32 : 784,
          }}
        >
          <Box className={classes.bodyGrid__itemTitle}>
            <Typography variant="h1" className={classes.mainExpandedPageTitle}>
              <IconButton
                className={classes.bodyGrid__itemTitleIconBack}
                onClick={() => {
                  setIsProductsListOpen(true);
                  setIsProductDetailOpen(true);
                  setIsProductHistoryOpen(false);
                  setSelectedProductHistory('');
                  setSelectedQuote('');
                  setIsQuoteDetailOpen(false);
                  history.push(
                    `/products/${
                      params.productId ? params.productId + '/' : ''
                    }`,
                  );
                }}
              >
                <ArrowLeft />
              </IconButton>
              {isDetailEdit ? 'Edit Product' : 'Product Details'}
            </Typography>
          </Box>
        </div>
      )}

      {isProductDetailOpen && (
        <Grid
          container
          xs={12}
          justifyContent="center"
          className={`${
            isProductsListOpen ? classes.bodyGrid__itemWithMaxMinWidth : ''
          }`}
          style={
            !isProductsListOpen
              ? {
                  maxHeight: 'calc(100% - 65px)',
                  flexWrap: 'nowrap',
                  // marginRight: 10,
                }
              : { maxHeight: '100%', marginRight: 10 }
          }
        >
          <Grid
            item
            xs={isProductsListOpen ? true : !isProductHistoryOpen ? 12 : true}
            className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
            style={{
              overflow: 'visible',
            }}
          >
            <Paper
              className={cn(
                classes.bodyGrid__itemPaper,
                classes.bodyGrid__itemWithMaxMinWidth,
                {
                  [classes.bodyGrid__itemPaperWithTitle]: !isProductsListOpen,
                },
              )}
              style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
            >
              <ProductDetail
                selected={selectedProductHistory}
                expandable={isProductsListOpen}
                closable={isProductsListOpen}
                onClose={() => {
                  setIsProductsListOpen(true);
                  setIsProductDetailOpen(false);
                  setIsProductHistoryOpen(false);
                  setSelectedProductHistory('');
                  setSelectedProductDetail('');
                  history.push(`/products/`);
                }}
                openFullScreen={() => {
                  setIsProductsListOpen(false);
                  setIsProductDetailOpen(true);
                  setIsProductHistoryOpen(false);
                  history.push(
                    `/products/${
                      params.productId ? params.productId + '/' : ''
                    }`,
                  );
                }}
                openProductHistoryCallback={(supplierId) => {
                  setIsProductsListOpen(false);
                  setIsProductDetailOpen(true);
                  setIsProductHistoryOpen(true);
                  setSelectedProductHistory(supplierId);
                  history.push(
                    `/products/${
                      params.productId ? params.productId + '/' : ''
                    }${supplierId}/`,
                  );
                  setSelectedQuote('');
                  setIsQuoteDetailOpen(false);
                }}
                openQuoteDetailCallback={(quoteId) => {
                  setIsProductsListOpen(false);
                  setIsProductDetailOpen(true);
                  setIsQuoteDetailOpen(true);

                  setSelectedQuote(quoteId);
                  history.push(
                    `/products/${
                      params.productId ? params.productId + '/' : ''
                    }${quoteId}/`,
                  );
                  setIsProductHistoryOpen(false);
                  setSelectedProductHistory('');
                }}
                selectedProductHistory={selectedProductHistory}
                setSelectedProductHistory={setSelectedProductHistory}
                detailEditControls={detailEditControls}
              />
            </Paper>
          </Grid>

          {isProductHistoryOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{ overflow: 'visible' }}
            >
              {!isProductsListOpen && (
                <Box className={classes.bodyGrid__itemTitle} />
              )}
              <Paper
                className={cn(classes.bodyGrid__itemPaper, {
                  [classes.bodyGrid__itemPaperWithTitle]: !isProductsListOpen,
                })}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <ProductHistory
                  selectedProductHistory={selectedProductHistory}
                  onClose={() => {
                    setIsProductHistoryOpen(false);
                    setSelectedProductHistory('');
                    history.push(
                      `/products/${
                        params.productId ? params.productId + '/' : ''
                      }`,
                    );
                  }}
                />
              </Paper>
            </Grid>
          )}
          {isQuoteDetailOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{ overflow: 'visible' }}
            >
              {!isProductsListOpen && (
                <Box className={classes.bodyGrid__itemTitle} />
              )}
              <Paper
                className={cn(classes.bodyGrid__itemPaper, {
                  [classes.bodyGrid__itemPaperWithTitle]: !isProductsListOpen,
                })}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <QuoteDetailForSupplier
                  setSelectedQuote={setSelectedQuote}
                  onClose={() => {
                    setIsQuoteDetailOpen(false);
                    setSelectedQuote('');
                    history.push(
                      `/products/${
                        params.productId ? params.productId + '/' : ''
                      }`,
                    );
                  }}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      )}

      <Base86Modal
        title="Upload Purchase History Report"
        open={uploadOpen}
        onClose={uploadControl.setFalse}
        submitText="Upload File"
        infoText="Help text"
        size="s"
        showInfo={showInfo}
      >
        <Typography
          style={{
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: 16,
            lineHeight: '24px',
            letterSpacing: '0.001em',
          }}
        >
          Please upload the Henry Schein "Items Purchased by Manufacturer and
          Category with Invoice Details" Report for the period of the previous
          12 months
        </Typography>
      </Base86Modal>
      <UploadGuide open={guideOpen} close={guideControl.setFalse} />
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

export default React.memo(() => {
  return (
    <PaginationProvider initialPerPage={5}>
      <SortProvider>
        <SearchProvider>
          <SelectedProvider>
            <ProductsProvider>
              <Products />
            </ProductsProvider>
          </SelectedProvider>
        </SearchProvider>
      </SortProvider>
    </PaginationProvider>
  );
});
