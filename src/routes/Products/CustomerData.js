import View from '../../assets/Icons/Prover/View';
import Supplier from '../../assets/Icons/Prover/Supplier';

export const ProductColumns = [
  { id: 'name', info: 'name', label: 'Product Name', editable: false },
  {
    id: 'category',
    label: 'Category',
    editable: false,
    expandedLabel: 'Category Tree',
  },
  {
    id: 'suppliers.total',
    label: 'Suppliers',
    editable: false,
  },
  {
    id: 'manufacturer.name',
    label: 'Manufacturer',
    editable: false,
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
  {
    id: 'lastPurchase',
    get: ({ lastPurchase }) =>
      lastPurchase ? new Date(lastPurchase).toLocaleDateString() : '',
    label: 'Last Purchase',
    editable: false,
  },
];

export const overflowMenuContent = [
  {
    code: 'viewDetails',
    text: 'View Detail',
    icon: View,
    callback: () => {
      console.log('View Detail');
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
