import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  CreateInvoiceDocument,
  InvoiceListDocument,
  UpdateInvoiceDocument,
  UpdateLineItemDocument,
  RemoveLineItemDocument,
  VendorListDocument,
  ProductListDocument,
  useBooleanControls,
} from '@base86inc/apollo-client'
import { useHistory } from 'react-router-dom'
import { scanAll } from '../../client'
import Box from '@material-ui/core/Box'
import Fab from '@material-ui/core/Fab'
import Hidden from '@material-ui/core/Hidden'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import TextField from '@material-ui/core/TextField'
import Camera from '@material-ui/icons/CameraAlt'
import FilterIcon from '@material-ui/icons/FilterListOutlined'
import 'firebase/auth'
import Fuse from 'fuse.js'
import React, { useMemo, useState } from 'react'
import MainMenu from '../../components/Menu'
import { usePersistentMenuStyles } from '../../components/Menu/usePersistentMenuStyles'
import Nav from '../../components/Nav'
import NavSearch from '../../components/NavSearch'
import { SelectOneDrawer } from '../../components/SelectOneDrawer'
import InvoicesIcon from '../../components/MenuIcons/Invoices'
import { ProductListItem } from '../Products/List'
import { VendorListItem } from '../Vendors/List'
import { InvoiceListDisplay } from './List'
import { InvoiceDetailsDrawer } from './Details'
import { InvoiceFilterDrawer, useInvoiceFilters } from './Filter'
import { parse } from 'querystring'
import { InvoiceScannerDrawer } from './Scan'
import { useToastContext } from '../../components/Toast'
import get from 'lodash/get'

const parseScanResultsText = scanResultList => {
  if (!scanResultList || !scanResultList.data) return ''
  return scanResultList.data.map(({ rawResults }) => rawResults)
}

const makeInvoiceIndex = invoices => {
  const parsed = invoices.map(invoice => ({
    ...invoice,
    rawDocumentText: parseScanResultsText(invoice.scanResultList),
  }))
  return new Fuse(parsed, {
    keys: ['rawDocumentText', 'vendor.name'],
    threshold: 0,
  })
}

export default ({ menu = <MainMenu /> }) => {
  const history = useHistory()
  const { setSuccess, setError } = useToastContext()
  const classes = usePersistentMenuStyles()
  const [searchText, setSearchText] = useState('')
  const [invoice, setInvoice] = useState(null)
  const [lineItem, setLineItem] = useState(null)
  const {
    initial,
    selected,
    setSelected,
    isFilterUsed,
    IN,
  } = useInvoiceFilters()

  const variables = useMemo(() => {
    const search = parse(history.location.search.replace('?', ''))
    const filter = {
      status: { IN },
    }
    if (search.productIds) {
      filter.productId = {
        IN: search.productIds.split(','),
      }
    }
    if (search.productId) {
      filter.productId = {
        EQ: search.productId,
      }
    }
    if (search.vendorIds) {
      filter.vendorId = {
        IN: search.vendorIds.split(','),
      }
    }
    if (search.vendorId) {
      filter.vendorId = {
        EQ: search.vendorId,
      }
    }
    return {
      pagination: {
        page: 1,
        perPage: 100,
      },
      sort: {
        field: 'createdDate',
        order: -1,
      },
      filter,
    }
  }, [IN, history.location.search])

  const invoiceList = useQuery(InvoiceListDocument, { variables })
  const vendorList = useQuery(VendorListDocument)
  const productList = useQuery(ProductListDocument)
  const [handleCreateInvoice, create] = useMutation(CreateInvoiceDocument, {
    onCompleted: () => setSuccess('Invoice created successfully.'),
  })
  const [handleUpdateInvoice, updateInvoice] = useMutation(
    UpdateInvoiceDocument,
    {
      onCompleted: () => setSuccess('Invoice updated successfully.'),
      onError: e => setError(e.message),
    },
  )
  const [handleUpdateLineItem, updateLineItem] = useMutation(
    UpdateLineItemDocument,
    {
      onCompleted: () => setSuccess('Line item updated successfully.'),
      onError: e => setError(e.message),
    },
  )
  const [handleRemoveLineItem, removeLineItem] = useMutation(
    RemoveLineItemDocument,
    {
      onCompleted: () => setSuccess('Line item removed successfully.'),
      onError: e => setError(e.message),
    },
  )
  const invoices = get(invoiceList, 'data.invoiceList.data') || []
  const vendors = get(vendorList, 'data.vendorList.data') || []
  const products = get(productList, 'data.productList.data') || []
  const onSubmit = async invoice => {
    console.log('onCreateInvoice', invoice)
    await handleCreateInvoice({
      variables: { invoice },
      update: async () => {
        scanControls.setFalse()
        try {
          await scanAll()
          invoiceList.refetch({ variables })
        } catch (e) {
          console.log('scan error', e)
        }
      },
      refetchQueries: [{ query: InvoiceListDocument, variables }],
    })
  }
  const onChangeStatus = async (invoice, status) => {
    if (invoice && invoice._id && status) {
      await handleUpdateInvoice({
        variables: { invoiceId: invoice._id, invoice: { status } },
        onCompleted: () =>
          setSuccess(`Invoice status successfully set to ${status}.`),
      })
    }
  }
  const handleChangeVendor = invoice => {
    changeVendorControls.setTrue()
    setInvoice(invoice)
  }
  const handleChangeProduct = lineItem => {
    changeProductControls.setTrue()
    setLineItem(lineItem)
  }
  const onChangeVendor = async vendorId => {
    console.log('onChangeVendor', invoice, vendorId)
    changeVendorControls.setFalse()
    if (invoice && invoice._id && vendorId) {
      await handleUpdateInvoice({
        variables: { invoiceId: invoice._id, invoice: { vendorId } },
        onCompleted: () => setSuccess(`Invoice vendor successfully updated.`),
      })
    }
  }
  const onChangeProduct = async productId => {
    console.log('onChangeProduct', lineItem, productId)
    changeProductControls.setFalse()
    if (lineItem && lineItem._id && productId) {
      await handleUpdateLineItem({
        variables: { lineItemId: lineItem._id, lineItem: { productId } },
        onCompleted: () =>
          setSuccess(`Line item product successfully updated.`),
      })
    }
  }
  const onChangeLineItemStatus = async (lineItem, status) => {
    console.log('onChangeLineItemStatus', lineItem, status)
    if (lineItem && lineItem._id && status) {
      await handleUpdateLineItem({
        variables: { lineItemId: lineItem._id, lineItem: { status } },
        onCompleted: () =>
          setSuccess(`Line item status successfully set to ${status}.`),
      })
    }
  }
  const onRemoveLineItem = async lineItem => {
    console.log('onRemoveLineItem', lineItem)
    if (lineItem && lineItem._id) {
      await handleRemoveLineItem({
        variables: { lineItemId: lineItem._id },
        onCompleted: () => setSuccess(`Remove line item success.`),
      })
    }
  }
  const invoiceIndex = useMemo(() => makeInvoiceIndex(invoices), [invoices])
  const filteredInvoices = searchText
    ? invoiceIndex.search(searchText)
    : invoices
  const [filterOpen, filterControls] = useBooleanControls(false)
  const [scanOpen, scanControls] = useBooleanControls(false)
  const [invoiceOpen, invoiceControls] = useBooleanControls(false)
  const [changeVendorOpen, changeVendorControls] = useBooleanControls(false)
  const [changeProductOpen, changeProductControls] = useBooleanControls(false)
  const selectInvoice = invoice => {
    setInvoice(invoice)
    invoice ? invoiceControls.setTrue() : invoiceControls.setFalse()
  }
  return (
    <Box className={classes.mainContainer}>
      <Nav title='Invoices'>
        <NavSearch
          searchText={searchText}
          setSearchText={setSearchText}
          filterOpen={filterOpen}
          filterControls={filterControls}
          isFilterUsed={isFilterUsed}
        />
      </Nav>
      {invoiceList.loading ? (
        <LinearProgress />
      ) : filteredInvoices.length ? (
        <InvoiceListDisplay
          rows={filteredInvoices}
          onClick={selectInvoice}
          onChangeStatus={onChangeStatus}
        />
      ) : (
        <Box flexGrow={1} textAlign='center' pt={4}>
          <Typography style={{ color: '#bdbdbd' }}>
            <InvoicesIcon style={{ height: 120, width: 120 }} />
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
      <div
        style={{
          position: 'fixed',
          padding: 24,
          bottom: 0,
          right: 0,
          zIndex: 11,
        }}
      >
        <Fab color='secondary' onClick={scanControls.setTrue}>
          <Camera />
        </Fab>
      </div>
      <InvoiceFilterDrawer
        filterOpen={filterOpen}
        filterControls={filterControls}
        selected={selected}
        setSelected={setSelected}
        initial={initial}
      />
      <InvoiceScannerDrawer
        scanOpen={scanOpen}
        scanControls={scanControls}
        onSubmit={onSubmit}
        {...create}
      />
      <InvoiceDetailsDrawer
        invoice={invoice}
        invoiceOpen={invoiceOpen}
        invoiceControls={invoiceControls}
        onChangeStatus={onChangeStatus}
        onChangeVendor={handleChangeVendor}
        onChangeProduct={handleChangeProduct}
        onChangeLineItemStatus={onChangeLineItemStatus}
        onRemoveLineItem={onRemoveLineItem}
      />
      <SelectOneDrawer
        name='Select New Vendor'
        options={vendors}
        selected={get(invoice, 'vendor._id')}
        renderItem={(vendor, i) => (
          <VendorListItem
            key={vendor._id}
            vendor={vendor}
            style={{ paddingLeft: 24, paddingRight: 24 }}
            onClick={() => onChangeVendor(vendor._id)}
            selected={get(invoice, 'vendor._id') === vendor._id}
          />
        )}
        setSelected={onChangeVendor}
        loading={vendorList.loading}
        open={changeVendorOpen}
        controls={changeVendorControls}
      />
      <SelectOneDrawer
        name='Select New Product'
        options={products}
        selected={get(lineItem, 'product._id')}
        renderItem={(product, i) => (
          <ProductListItem
            key={product._id}
            product={product}
            style={{ paddingLeft: 24, paddingRight: 24 }}
            onClick={() => onChangeProduct(product._id)}
            selected={get(lineItem, 'product._id') === product._id}
          />
        )}
        setSelected={onChangeProduct}
        loading={productList.loading}
        open={changeProductOpen}
        controls={changeProductControls}
      />
    </Box>
  )
}
