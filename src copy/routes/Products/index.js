import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  ProductListDocument,
  UpdateProductDocument,
  useBooleanControls,
} from '@base86inc/apollo-client';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import 'firebase/auth';
import Fuse from 'fuse.js';
import get from 'lodash/get';
import React, { useMemo, useState } from 'react';
import MainMenu from '../../components/Menu';
import { usePersistentMenuStyles } from '../../components/Menu/usePersistentMenuStyles';
import ProductsIcon from '../../components/MenuIcons/Products';
import Nav from '../../components/Nav';
import NavSearch from '../../components/NavSearch';
import { SelectOneDrawer } from '../../components/SelectOneDrawer';
import { ChangeProductThreshold } from './Details';
import { ProductFilterDrawer, useSelectManyCategoriesControls } from './Filter';
import { ProductListDisplay } from './List';
import { useHistory } from 'react-router-dom';
import Details from './Details/Details';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import WideScreenList from '../../components/WideScreenList';
import Navigation from '../../components/Navigation';
import NavigationSearch from '../../components/NavigationSearch';

//Navigation and NavigationSearch new components for header instead of Nav and NavSearch

const makeProductIndex = products => {
  return new Fuse(products, { keys: ['name', 'category'], threshold: 0 });
};

export default ({ menu = <MainMenu /> }) => {
  const history = useHistory();

  const usePersistentMenuStyles = makeStyles(theme =>
    createStyles({
      mainContainer: {
        [theme.breakpoints.up('md')]: {
          marginLeft: 300,
          padding: '20px',
          backgroundColor: '#E5E5E5',
          height: '100%',
        },
      },
    }),
  );

  const classes = usePersistentMenuStyles();
  const {
    selected,
    setSelected,
    isFilterUsed,
    IN,
  } = useSelectManyCategoriesControls();
  const [product, selectProduct] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [changeCategoryOpen, changeCategoryControls] = useBooleanControls(
    false,
  );
  const [filterOpen, filterControls] = useBooleanControls(false);
  const [thresholdOpen, thresholdControls] = useBooleanControls(false);
  const [productOpen, productControls] = useBooleanControls(false);

  const variables = useMemo(
    () =>
      IN.length
        ? {
            filter: {
              category: { IN },
            },
          }
        : {},
    [IN],
  );
  const { data, loading } = useQuery(ProductListDocument, {
    variables,
  });

  const [handleUpdateProduct, updateProduct] = useMutation(
    UpdateProductDocument,
  );
  const categories =
    (data && data.productList && data.productList.categories) || [];
  const products = (data && data.productList && data.productList.data) || [];
  const productIndex = useMemo(() => makeProductIndex(products), [products]);
  const filteredProducts = searchText
    ? productIndex.search(searchText)
    : products;

  const handleChangeCategory = product => {
    selectProduct(product);
    changeCategoryControls.setTrue();
  };

  const handleSelectProduct = product => {
    selectProduct(product);
    productControls.setTrue();
  };

  const onChangeStatus = async (product, status) => {
    console.log('Change product status', product, status);
    if (product && product._id && status) {
      await handleUpdateProduct({
        variables: {
          productId: product._id,
          product: {
            status,
          },
        },
      });
    }
  };

  const onChangeCategory = async category => {
    console.log('Change product category', product, category);
    if (product && product._id && category) {
      await handleUpdateProduct({
        variables: {
          productId: product._id,
          product: {
            category,
          },
        },
      });
    }
  };

  const onViewAlerts = product =>
    history.push(`/alerts?productIds=${product._id}`);

  const onViewInvoices = product => history.push(`/?productIds=${product._id}`);

  const onChangeThreshold = product => {
    selectProduct(product);
    thresholdControls.setTrue();
  };

  return (
    <Box className={classes.mainContainer}>
      <Box display={{ xs: 'block', md: 'none' }}>
        <Nav title="Products">
          <NavSearch
            searchText={searchText}
            setSearchText={setSearchText}
            filterOpen={filterOpen}
            filterControls={filterControls}
            isFilterUsed={isFilterUsed}
          />
        </Nav>
      </Box>
      <Box display={{ xs: 'none', md: 'block' }}>
        <Navigation title="Products">
          <NavigationSearch
            searchText={searchText}
            setSearchText={setSearchText}
            filterOpen={filterOpen}
            filterControls={filterControls}
            isFilterUsed={isFilterUsed}
          />
        </Navigation>
      </Box>
      {loading ? (
        <LinearProgress />
      ) : filteredProducts.length ? (
        <>
          <Box display={{ xs: 'block', md: 'none' }}>
            <ProductListDisplay
              rows={filteredProducts}
              onChangeCategory={handleChangeCategory}
              onChangeStatus={onChangeStatus}
              onViewAlerts={onViewAlerts}
              onViewInvoices={onViewInvoices}
              onChangeThreshold={onChangeThreshold}
            />
          </Box>
          <Box display={{ xs: 'none', md: 'block' }}>
            <WideScreenList />
          </Box>
        </>
      ) : (
        <Box flexGrow={1} textAlign="center" pt={4}>
          <Typography style={{ color: '#bdbdbd' }}>
            <ProductsIcon style={{ height: 120, width: 120 }} />
          </Typography>
          <Typography>There is nothing here.</Typography>
        </Box>
      )}
      <div style={{ paddingBottom: 120 }} />
      <Hidden mdUp>
        <div
          style={{
            position: 'fixed',
            padding: 24,
            bottom: 0,
            left: 0,
            zIndex: 11,
          }}
        >
          {menu}
        </div>
      </Hidden>
      <ProductFilterDrawer
        options={categories}
        loading={loading}
        selected={selected}
        setSelected={setSelected}
        controls={filterControls}
        open={filterOpen}
      />
      <Details
        product={product}
        productOpen={productOpen}
        productControls={productControls}
      />
      <SelectOneDrawer
        name="Select New Category"
        options={categories}
        selected={get(product, 'category')}
        setSelected={onChangeCategory}
        loading={loading}
        open={changeCategoryOpen}
        controls={changeCategoryControls}
      />
      <ChangeProductThreshold
        product={product}
        thresholdOpen={thresholdOpen}
        thresholdControls={thresholdControls}
      />
    </Box>
  );
};
