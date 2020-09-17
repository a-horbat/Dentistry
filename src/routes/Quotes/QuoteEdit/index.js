import React, { useState, useEffect, useMemo, useContext } from 'react';
import { Grid, Box, Paper, Typography, IconButton } from '@material-ui/core';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useBooleanControls } from '@base86inc/apollo-client';

import MainLayoutStyles from '../../../layouts/MainLayout/MainLayoutStyles';

import EditNavigation from '../../../components/EditNavigation';
import ProductDetail from '../../../components/ProductDetail';
import SupplierDetail from '../../../components/SupplierDetail';
import QuoteDetail from '../../../components/QuoteDetail';
import Base86Modal from '../../../components/Modal';
import QuoteRequestModalContent from '../../../components/QuoteRequestModalContent';
import { useUpdateMultiple } from '../../../components/Update/context';

import QuoteInfoCard from './components/QuoteInfoCard';
import QuoteEditStepProducts from './components/ProductsStep';
import QuoteEditStepSuppliers from './components/SuppliersStep';
import QuoteEditFooter from './components/QuoteEditFooter';
import QuoteAddModal from './components/QuoteAddModal';
import LinkNewProductModal from './components/LinkNewProductModal';
import RoleContext from '../../../utils/roleContext';
import CustomerTopContent from './components/CustomerRoleQuoteEdit';
import SupplierTopContent from './components/SupplierRoleQuoteEdit';
import RoleRender from '../../../components/RoleRender';
import ProductDetailEdit from '../../Products/ProductDetailEdit';

import quoteData, { productDetaisColumnsSupplier } from './components/data';
import {
  View,
  Remove,
  LinkCatalog,
  Supplier,
  Product,
  Archive,
} from '../../../assets/Icons/Prover';
import ArrowLeft from '../../../assets/Icons/ArrowLeft';
import { Add } from '@material-ui/icons';
import AlternativeDetail from '../../../components/AlternativeDetail';

const productDetailPopover = [
  {
    code: 'archiveProduct',
    text: 'Archive',
    icon: <Archive />,
    callback: () => {
      console.log('Archive product');
    },
  },
  {
    withDivider: true,
    code: 'removeProduct',
    text: 'Remove from quote',
    icon: <Remove />,
    callback: () => {
      console.log('Remove product');
    },
  },
];

const productDetailPopoverSupplier = [
  {
    code: 'linkNewProduct',
    text: 'Link new Product',
    icon: <Add />,
    callback: () => {
      console.log('Link new Product');
    },
  },
  {
    code: 'linkCatalogProduct',
    text: 'Link catalog product',
    icon: <LinkCatalog />,
    callback: () => {
      console.log('Link catalog product');
    },
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: 90,
  },
}));

const QuoteEdit = () => {
  const classes = MainLayoutStyles();
  const classesEdit = useStyles();
  const params = useParams();
  const history = useHistory();
  const location = useLocation();

  const [step, setStep] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState('');

  const [isListOpen, setIsListOpen] = useState(true);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const [isSupplierDetailOpen, setIsSupplierDetailOpen] = useState(false);
  const [selectedSupplierDetail, setSelectedSupplierDetail] = useState('');
  const [isQuoteDetailOpen, setIsQuoteDetailOpen] = useState(false);
  const [selectedQuoteDetail, setSelectedQuoteDetail] = useState('');
  const [isLinkedProductOpen, setIsLinkedProductOpen] = useState(false);
  const [requestModalOpen, requestModalOpenControl] = useBooleanControls(false);
  const [addModalOpen, addModalOpenControl] = useBooleanControls(false);
  const [linkProductModal, linkProductModalControl] = useBooleanControls(false);

  const [isAlternativeDetailOpen, setAlternativeDetailOpen] = useState(false);
  const [selectedAlternativeDetail, setSelectedAlternativeDetail] = useState(
    '',
  );

  useEffect(() => {
    const { detailsId, alternativeId, relatedQuoteId } = params;
    const isProductDetail = location.search.includes('product') ?? false;
    const isSupplierDetail = location.search.includes('supplier') ?? false;

    setIsListOpen(!(detailsId && alternativeId));

    setSelectedProductDetail(isProductDetail ? detailsId : '');
    setIsProductDetailOpen(isProductDetail && !!detailsId);

    setSelectedSupplierDetail(isSupplierDetail ? detailsId : '');
    setIsSupplierDetailOpen(isSupplierDetail && !!detailsId);

    setAlternativeDetailOpen(
      isProductDetail && alternativeId ? !!alternativeId : false,
    );
    setSelectedAlternativeDetail(isProductDetail ? alternativeId : '');

    setIsQuoteDetailOpen(!!relatedQuoteId ?? false);
    setSelectedQuoteDetail(relatedQuoteId ?? '');
  }, []);

  const handleChangeStep = (step) => {
    setSelectedProductDetail('');
    setIsProductDetailOpen(false);
    setSelectedSupplierDetail('');
    setIsSupplierDetailOpen(false);
    setStep(step);
  };
  const handleAddClick = () => {
    addModalOpenControl.setTrue();
  };
  const linkNewProduct = () => {
    linkProductModalControl.setTrue();
  };
  const handleItemClick = (id) => {
    setIsProductDetailOpen(true);
    setSelectedProductDetail(id);
    setSelectedAlternativeDetail('');
    setAlternativeDetailOpen(false);
    history.push(
      `/quotes/edit/${
        params?.quoteId ? params.quoteId : ''
      }/${id}?type="product"`,
    );
  };
  const hanldeAlternativeItemClick = (id) => {
    setIsProductDetailOpen(false);
    setSelectedProductDetail('');
    setSelectedAlternativeDetail(id);
    setAlternativeDetailOpen(true);
    history.push(
      `/quotes/edit/${
        params?.quoteId ? params.quoteId : ''
      }/${id}?type="product"`,
    );
  };

  const user = useContext(RoleContext);
  let editPageContent = null;

  switch (step) {
    case 0:
      editPageContent = (
        <RoleRender
          supplier={
            <QuoteEditStepProducts
              step={step}
              selectedProductDetail={selectedProductDetail}
              setSelectedProductDetail={setSelectedProductDetail}
              isProductDetailOpen={isProductDetailOpen}
              setIsProductDetailOpen={setIsProductDetailOpen}
              setEditMode={setEditMode}
              hanldeAlternativeItemClick={hanldeAlternativeItemClick}
              handleItemClick={handleItemClick}
              handleLinkProduct={linkNewProduct}
            />
          }
          customer={
            <QuoteEditStepProducts
              step={step}
              selectedProductDetail={selectedProductDetail}
              setSelectedProductDetail={setSelectedProductDetail}
              isProductDetailOpen={isProductDetailOpen}
              setIsProductDetailOpen={setIsProductDetailOpen}
              handleAddClick={handleAddClick}
              handleItemClick={handleItemClick}
              setEditMode={setEditMode}
            />
          }
        />
      );

      break;
    case 1:
      editPageContent = (
        <RoleRender
          customer={
            <QuoteEditStepSuppliers
              params={params}
              history={history}
              selectedSupplierDetail={selectedSupplierDetail}
              setSelectedSupplierDetail={setSelectedSupplierDetail}
              isSupplierDetailOpen={isSupplierDetailOpen}
              setIsSupplierDetailOpen={setIsSupplierDetailOpen}
              handleAddClick={handleAddClick}
              setEditMode={setEditMode}
            />
          }
          supplier={
            <QuoteEditStepProducts
              step={step}
              selectedProductDetail={selectedProductDetail}
              setSelectedProductDetail={setSelectedProductDetail}
              isProductDetailOpen={isProductDetailOpen}
              setIsProductDetailOpen={setIsProductDetailOpen}
              setEditMode={setEditMode}
              handleItemClick={handleItemClick}
              hanldeAlternativeItemClick={hanldeAlternativeItemClick}
            />
          }
        />
      );

      break;
  }

  const sendQuoteRequest = () => {
    requestModalOpenControl.setTrue();
  };

  const getUserRoleProps = (role) => ({
    productDetailProps: {
      isLinking: role === 'Supplier' ? editMode : null,
      closable: role === 'Supplier' ? !editMode : true,
      onLinkNewProductCallback:
        role === 'Supplier'
          ? () => {
              setIsListOpen(false);
              setSelectedProductDetail('');
              setIsLinkedProductOpen(true);
              setEditMode(true);
            }
          : null,

      tableColumns:
        role === 'Supplier'
          ? [...productDetailPopoverSupplier, ...productDetailPopover]
          : productDetailPopover,
      openProductHistoryCallback:
        role === 'Supplier'
          ? (id) => {
              setIsListOpen(false);
              setIsProductDetailOpen(true);
              setAlternativeDetailOpen(true);
              setSelectedAlternativeDetail(id);
              console.log(id);

              history.push(
                `/quotes/edit/${params?.quoteId ? params.quoteId + '/' : ''}${
                  params.detailsId ? params.detailsId + '/' : ''
                }${id ? id : ''}?type=product`,
              );
            }
          : () => ({}),
    },
  });
  const { productDetailProps } = getUserRoleProps(user.role);

  return (
    <Grid
      container
      justifyContent="center"
      className={`${classes.bodyGrid__container} ${classesEdit.root}`}
      style={
        !isListOpen
          ? { flexWrap: 'unset', flexDirection: 'column', alignItems: 'center' }
          : {}
      }
    >
      {isListOpen && (
        <Grid xs item className={classes.bodyGrid__item}>
          <RoleRender
            supplier={
              <SupplierTopContent
                quote={quoteData}
                step={step}
                title={params.quoteId === 'draft' ? 'Add Quote' : 'Edit Quote'}
              />
            }
            customer={
              <CustomerTopContent
                quote={quoteData}
                step={step}
                title={params.quoteId === 'draft' ? 'Add Quote' : 'Edit Quote'}
              />
            }
          />
          {editPageContent}
        </Grid>
      )}
      {!isListOpen && (
        <div
          style={{
            width:
              (isAlternativeDetailOpen || isLinkedProductOpen) &&
              (isProductDetailOpen || isQuoteDetailOpen)
                ? 784 * 2 + 32
                : 784,
          }}
        >
          <Box className={classes.bodyGrid__itemTitle}>
            <Typography variant="h1" className={classes.mainExpandedPageTitle}>
              <IconButton
                className={classes.bodyGrid__itemTitleIconBack}
                onClick={() => {
                  setIsListOpen(true);
                  setIsProductDetailOpen(true);
                  setAlternativeDetailOpen(false);
                  setSelectedAlternativeDetail('');
                  setIsLinkedProductOpen(false);
                  setIsQuoteDetailOpen(false);
                  setSelectedQuoteDetail('');
                  history.push(
                    `/quotes/edit/${params?.quoteId ? params.quoteId : ''}`,
                  );
                }}
              >
                <ArrowLeft />
              </IconButton>
              {isLinkedProductOpen
                ? 'Link new prdouct'
                : isProductDetailOpen
                ? 'Product details'
                : 'My product details'}
            </Typography>
          </Box>
        </div>
      )}
      {(isProductDetailOpen || isAlternativeDetailOpen) && (
        <Grid
          container
          xs={12}
          justifyContent="center"
          className={`${
            isListOpen ? classes.bodyGrid__itemWithMaxMinWidth : ''
          }`}
          style={
            !isListOpen
              ? {
                  maxHeight: 'calc(100% - 65px)',
                  flexWrap: 'nowrap',
                  // marginRight: 10,
                }
              : { maxHeight: '100%', marginRight: 10 }
          }
        >
          {isProductDetailOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              <Paper
                className={classes.bodyGrid__itemPaper}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <ProductDetail
                  columns={productDetaisColumnsSupplier}
                  selectedProductDetail={selectedProductDetail}
                  expandable={isListOpen || isAlternativeDetailOpen}
                  openFullScreen={(id) => {
                    setIsListOpen(false);
                    setAlternativeDetailOpen(false);
                  }}
                  onClose={() => {
                    setSelectedProductDetail('');
                    setSelectedSupplierDetail('');
                    setIsProductDetailOpen(false);
                    setIsSupplierDetailOpen(false);
                    history.push(
                      `/quotes/edit/${params?.quoteId ? params.quoteId : ''}`,
                    );
                  }}
                  {...productDetailProps}
                />
              </Paper>
            </Grid>
          )}

          {isAlternativeDetailOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              <Paper
                className={classes.bodyGrid__itemPaper}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <AlternativeDetail
                  openQuoteDetailCallback={(id) => {
                    setIsListOpen(false);
                    setIsProductDetailOpen(false);
                    setSelectedQuoteDetail(id);
                    setIsQuoteDetailOpen(true);
                  }}
                  selectedSupplierDetail={selectedSupplierDetail}
                  expandable={isListOpen || isProductDetailOpen}
                  openFullScreen={() => {
                    setIsListOpen(false);
                    setIsProductDetailOpen(false);
                  }}
                  onClose={() => {
                    setIsListOpen(true);
                    setSelectedProductDetail('');
                    setSelectedSupplierDetail('');
                    setIsSupplierDetailOpen(false);
                    setIsProductDetailOpen(false);
                    setAlternativeDetailOpen(false);
                    history.push(
                      `/quotes/edit/${params?.quoteId ? params.quoteId : ''}`,
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
              style={{
                overflow: 'visible',
              }}
            >
              <Paper
                className={classes.bodyGrid__itemPaper}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <QuoteDetail
                  selectedSupplierDetail={selectedSupplierDetail}
                  expandable={false}
                  closable={true}
                  openQuoteDetailCallback={(id) => {
                    setSelectedQuoteDetail(id);
                    setIsQuoteDetailOpen(true);
                  }}
                  onClose={() => {
                    setIsListOpen(false);
                    setSelectedProductDetail('');
                    setIsProductDetailOpen(true);
                    setAlternativeDetailOpen(false);
                    setIsQuoteDetailOpen(false);
                    setSelectedQuoteDetail(false);
                    history.push(
                      `/quotes/edit/${params.detailId}?type=product}`,
                    );
                  }}
                />
              </Paper>
            </Grid>
          )}
          {isLinkedProductOpen && (
            <Grid
              item
              xs
              className={`${classes.bodyGrid__item} ${classes.bodyGrid__itemWithMaxMinWidth}`}
              style={{
                overflow: 'visible',
              }}
            >
              <Paper
                className={classes.bodyGrid__itemPaper}
                style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
              >
                <ProductDetailEdit setIsEditingMultiple={() => ({})} />
              </Paper>
            </Grid>
          )}
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
          <Paper
            className={classes.bodyGrid__itemPaper}
            style={{ boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)' }}
          >
            <SupplierDetail
              selectedSupplierDetail={selectedSupplierDetail}
              expandable={false}
              onClose={() => {
                setSelectedProductDetail('');
                setSelectedSupplierDetail('');
                setIsSupplierDetailOpen(false);
                setIsProductDetailOpen(false);
                history.push(
                  `/quotes/edit/${params?.quoteId ? params.quoteId : ''}`,
                );
              }}
            />
          </Paper>
        </Grid>
      )}

      {!editMode && (
        <QuoteEditFooter
          step={step}
          lastStep={1}
          changeStep={handleChangeStep}
          sendRequest={sendQuoteRequest}
          setEditMode={setEditMode}
        />
      )}

      <Base86Modal
        title={'Send request for quote'}
        open={requestModalOpen}
        onClose={requestModalOpenControl.setFalse}
        submitText={'Send'}
        onSubmit={() => ({})}
      >
        <QuoteRequestModalContent />
      </Base86Modal>
      <RoleRender
        supplier={
          <LinkNewProductModal
            isOpen={linkProductModal}
            onClose={linkProductModalControl.setFalse}
            onSubmit={() => {}}
            step={step}
          />
        }
        customer={
          <QuoteAddModal
            isOpen={addModalOpen}
            onClose={addModalOpenControl.setFalse}
            onSubmit={() => {}}
            step={step}
          />
        }
      />
    </Grid>
  );
};

export default QuoteEdit;
