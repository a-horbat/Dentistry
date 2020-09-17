export default {
  quoteId: '5dc3b48f8f69a',
  name: 'Quote name 1',
  rfqDate: 'April 29, 2021',
  sendDate: 'April 31, 2021',
  status: 'Sent',
  amount: '1000',
  customerName: 'Bill Gates',
};

export const productTableData = [
  {
    _id: '5f05d518f63f0b38698e4028',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'All-Black metal electric toothbrush',
    category: 'Cleaning',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:15:52.892Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    status: null,
    threshold: null,
    annualQuantity: 800,
    __typename: 'Product',
    lastPrice: 5,
    lastPurchase: '2020-01-01T00:00:00.000Z',
    bestPrice: 5,
    annualCost: 4000,
    manufacturer: {
      name: 'DentistryIQ',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 2,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d534f63f0b38698e402a',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Complete Home Disinfectant Clean Citrus',
    category: 'Cleaning',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:16:20.820Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    status: null,
    threshold: null,
    annualQuantity: 5676,
    __typename: 'Product',
    lastPrice: 10,
    lastPurchase: '2020-02-12T00:00:00.000Z',
    bestPrice: 10,
    annualCost: 56760,
    manufacturer: {
      name: 'MedicalExpo',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 1,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d58ef63f0b38698e402b',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'BD Luer Lock Syringe 3mL 23G x 1" (25mm) PrecisionGlide Needle 10pk',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:17:50.144Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    status: null,
    threshold: null,
    annualQuantity: 5000,
    __typename: 'Product',
    lastPrice: 51,
    lastPurchase: '2020-03-22T00:00:00.000Z',
    bestPrice: 51,
    annualCost: 255000,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 0,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d595f63f0b38698e402c',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Topicals',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:17:57.726Z',
    updatedDate: '2020-07-13T23:44:41.211Z',
    status: null,
    threshold: null,
    annualQuantity: 10056,
    __typename: 'Product',
    lastPrice: 15,
    lastPurchase: '2020-04-01T00:00:00.000Z',
    bestPrice: 15,
    annualCost: 150840,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 1,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d5a7f63f0b38698e402d',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Vivacaine',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:18:15.948Z',
    updatedDate: '2020-07-13T23:44:41.211Z',
    status: null,
    threshold: null,
    annualQuantity: 400,
    __typename: 'Product',
    lastPrice: 25,
    lastPurchase: '2020-05-12T00:00:00.000Z',
    bestPrice: 25,
    annualCost: 10000,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 2,
      __typename: 'SuppliersPage',
    },
  },
];

export const suppliersTableData = [
  {
    id: '5f06641b7e49c06a110a5f28',
    organizationId: '5f066367af230941db1ffe0e',
    name: 'Florida Center For Laser Dentistry',
    category: null,
    description: null,
    imageUrl: null,
    createdDate: '2020-07-09T00:26:03.736Z',
    updatedDate: '2020-07-09T00:26:03.736Z',
    specialty: null,
    status: null,
    minOrderAmount: null,
    __typename: 'Supplier',
    billingAddress: null,
    products: {
      total: 2,
      __typename: 'ProductList',
    },
  },
  {
    id: '5f0667bc7e49c05f0b0a5f31',
    organizationId: '5f0667b57e49c076f90a5f2f',
    name: 'Burkhart Dental Supply Co',
    category: null,
    description: null,
    imageUrl: null,
    createdDate: '2020-07-09T00:41:32.506Z',
    updatedDate: '2020-07-09T00:41:32.506Z',
    specialty: null,
    status: null,
    minOrderAmount: null,
    __typename: 'Supplier',
    billingAddress: null,
    products: {
      total: 2,
      __typename: 'ProductList',
    },
  },
  {
    id: '5f0669e47e49c0c6e80a5f34',
    organizationId: '5f0669df7e49c0fe7c0a5f32',
    name: 'Pearson Dental Supply',
    category: null,
    description: null,
    imageUrl: null,
    createdDate: '2020-07-09T00:50:44.488Z',
    updatedDate: '2020-07-09T00:50:44.488Z',
    specialty: 'Cleaning',
    status: null,
    minOrderAmount: null,
    __typename: 'Supplier',
    billingAddress: null,
    products: {
      total: 3,
      __typename: 'ProductList',
    },
  },
];

export const productColumns = [
  { id: 'name', info: 'name', label: 'Product Name', editable: false },
  {
    id: 'category',
    label: 'Category',
    editable: false,
    expandedLabel: 'Category Tree',
  },
  {
    id: 'lastPrice',
    label: 'Last Price',
    editable: false,
  },
  {
    id: 'bestPrice',
    label: 'Best Price',
    editable: false,
  },
  {
    id: 'annualQuantity',
    label: 'Annual Qty',
    editable: true,
  },
  {
    id: 'annualCost',
    label: 'Annual Cost',
    editable: false,
  },
];
export const addProductColumns = [
  { id: 'name', info: 'name', label: 'Product Name', editable: false },
  {
    id: 'category',
    label: 'Category',
    editable: false,
    expandedLabel: 'Category Tree',
  },
  {
    id: 'lastPrice',
    label: 'Last Price',
    editable: false,
  },
  {
    id: 'bestPrice',
    label: 'Best Price',
    editable: false,
  },
  {
    id: 'annualQuantity',
    label: 'Annual Qty',
    editable: true,
  },
  {
    id: 'annualCost',
    label: 'Annual Cost',
    editable: false,
  },
];
export const suppliersColumns = [
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
    id: 'status',
    label: 'Status',
  },
];
export const addSuppliersColumns = [
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
    id: 'status',
    label: 'Status',
  },
];

export const productTableDataForSuppliers = [
  {
    _id: '5f05d518f63f0b38698e4028',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'All-Black metal electric toothbrush',
    category: 'Cleaning',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:15:52.892Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    supplierSKU: '-',
    catalogPrice: '',
    quotePrice: '',
    status: null,
    threshold: null,
    annualQuantity: 800,
    __typename: 'Product',
    lastPrice: 5,
    lastPurchase: '2020-01-01T00:00:00.000Z',
    bestPrice: 5,
    annualCost: 4000,
    manufacturer: {
      name: 'DentistryIQ',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 2,
      __typename: 'SuppliersPage',
    },
    alternatives: [
      {
        _id: 'a1',
        organizationId: '5dc3b48f8f69a100022ab8d8',
        name: 'GC America FUJICEM® EVOLVE DOUBLE PACK',
        category: 'Anesthetics',
        description: null,
        imageUrl: null,
        createdDate: '2020-07-08T14:15:52.892Z',
        updatedDate: '2020-08-06T04:23:17.988Z',
        status: null,
        threshold: null,
        annualQuantity: 10,
        __typename: 'Product',
        lastPrice: 5,
        lastPurchase: '2020-01-01T00:00:00.000Z',
        bestPrice: 5,
        annualCost: 4000,
        supplierSKU: '-',
        catalogPrice: '',
        priority: 'Green',
        quotePrice: '',
        manufacturer: {
          name: 'DentistryIQ',
          __typename: 'Manufacturer',
        },
        suppliers: {
          total: 2,
          __typename: 'SuppliersPage',
        },
      },
      {
        _id: 'a2',
        organizationId: '5dc3b48f8f69a100022ab8d8',
        name: 'GC America FUJICEM® EVOLVE DOUBLE PACK',
        category: 'Anesthetics',
        description: null,
        imageUrl: null,
        createdDate: '2020-07-08T14:15:52.892Z',
        updatedDate: '2020-08-06T04:23:17.988Z',
        status: null,
        threshold: null,
        annualQuantity: 10,
        __typename: 'Product',
        lastPrice: 5,
        lastPurchase: '2020-01-01T00:00:00.000Z',
        bestPrice: 5,
        annualCost: 4000,
        supplierSKU: '-',
        priority: 'Orange',
        catalogPrice: '',
        quotePrice: '',
        manufacturer: {
          name: 'DentistryIQ',
          __typename: 'Manufacturer',
        },
        suppliers: {
          total: 2,
          __typename: 'SuppliersPage',
        },
      },
    ],
  },
  {
    _id: '5f05d534f63f0b38698e402a',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Complete Home Disinfectant Clean Citrus',
    category: 'Cleaning',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:16:20.820Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    status: null,
    threshold: null,
    annualQuantity: 5676,
    supplierSKU: '-',
    catalogPrice: '',
    quotePrice: '',
    __typename: 'Product',
    lastPrice: 10,
    lastPurchase: '2020-02-12T00:00:00.000Z',
    bestPrice: 10,
    annualCost: 56760,
    manufacturer: {
      name: 'MedicalExpo',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 1,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d58ef63f0b38698e402b',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'BD Luer Lock Syringe 3mL 23G x 1" (25mm) PrecisionGlide Needle 10pk',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:17:50.144Z',
    updatedDate: '2020-08-06T04:23:17.988Z',
    status: null,
    threshold: null,
    supplierSKU: '-',
    catalogPrice: '',
    quotePrice: '',
    annualQuantity: 5000,
    __typename: 'Product',
    lastPrice: 51,
    lastPurchase: '2020-03-22T00:00:00.000Z',
    bestPrice: 51,
    annualCost: 255000,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 0,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d595f63f0b38698e402c',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Topicals',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:17:57.726Z',
    updatedDate: '2020-07-13T23:44:41.211Z',
    status: null,
    threshold: null,
    supplierSKU: '-',
    catalogPrice: '',
    quotePrice: '',
    annualQuantity: 10056,
    __typename: 'Product',
    lastPrice: 15,
    lastPurchase: '2020-04-01T00:00:00.000Z',
    bestPrice: 15,
    annualCost: 150840,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 1,
      __typename: 'SuppliersPage',
    },
  },
  {
    _id: '5f05d5a7f63f0b38698e402d',
    organizationId: '5dc3b48f8f69a100022ab8d8',
    name: 'Vivacaine',
    category: 'Anesthetics',
    description: null,
    imageUrl: null,
    createdDate: '2020-07-08T14:18:15.948Z',
    updatedDate: '2020-07-13T23:44:41.211Z',
    status: null,
    threshold: null,
    annualQuantity: 400,
    __typename: 'Product',
    lastPrice: 25,
    supplierSKU: '-',
    catalogPrice: '',
    quotePrice: '',
    lastPurchase: '2020-05-12T00:00:00.000Z',
    bestPrice: 25,
    annualCost: 10000,
    manufacturer: {
      name: 'Henry Schein',
      __typename: 'Manufacturer',
    },
    suppliers: {
      total: 2,
      __typename: 'SuppliersPage',
    },
  },
];

export const productColumnsForSuppliers = [
  { id: 'name', info: 'name', label: 'Product Name', editable: false },
  {
    id: 'category',
    label: 'Category',
    editable: false,
    expandedLabel: 'Category Tree',
  },
  {
    id: 'manufacturer.name',
    label: 'Manufacturer',
    editable: false,
  },
  {
    id: 'annualQuantity',
    label: 'Annual Qty',
    editable: false,
  },
  {
    id: 'supplierSKU',
    label: 'Supplier SKU',
    editable: true,
  },
  {
    id: 'catalogPrice',
    label: 'Catalog Prive',
    editable: true,
  },
  {
    id: 'quotePrice',
    label: 'Quote Price',
    editable: true,
  },
];

export const productDetaisColumnsSupplier = [
  { id: 'name', label: 'Product Name' },
  {
    id: 'supplier',
    label: 'Supplier',
  },
  {
    id: 'sku',
    label: 'SKU',
  },
  {
    id: 'manufacturer',
    label: 'Manufacturer',
  },
  {
    id: 'price',
    label: 'Price',
  },
  {
    id: 'popover',
    label: 'Priority',
  },
];
