// Mock data for the inventory dashboard
export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 129.99,
    stock: 45,
    threshold: 10,
    image: "https://placehold.co/200x200?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    stock: 8,
    threshold: 10,
    image: "https://placehold.co/200x200?text=Watch"
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    stock: 23,
    threshold: 15,
    image: "https://placehold.co/200x200?text=Speaker"
  },
  {
    id: 4,
    name: "Laptop Stand",
    price: 49.99,
    stock: 0,
    threshold: 5,
    image: "https://placehold.co/200x200?text=Stand"
  },
  {
    id: 5,
    name: "Wireless Mouse",
    price: 39.99,
    stock: 12,
    threshold: 10,
    image: "https://placehold.co/200x200?text=Mouse"
  },
  {
    id: 6,
    name: "USB-C Hub",
    price: 59.99,
    stock: 7,
    threshold: 8,
    image: "https://placehold.co/200x200?text=Hub"
  }
];

export const sales = [
  {
    id: 1,
    productId: 1,
    productName: "Wireless Headphones",
    quantity: 2,
    total: 259.98,
    timestamp: "2025-05-12T10:30:00Z"
  },
  {
    id: 2,
    productId: 3,
    productName: "Bluetooth Speaker",
    quantity: 1,
    total: 79.99,
    timestamp: "2025-05-12T09:15:00Z"
  },
  {
    id: 3,
    productId: 2,
    productName: "Smart Watch",
    quantity: 1,
    total: 199.99,
    timestamp: "2025-05-11T16:45:00Z"
  },
  {
    id: 4,
    productId: 5,
    productName: "Wireless Mouse",
    quantity: 3,
    total: 119.97,
    timestamp: "2025-05-11T14:20:00Z"
  },
  {
    id: 5,
    productId: 1,
    productName: "Wireless Headphones",
    quantity: 1,
    total: 129.99,
    timestamp: "2025-05-10T11:05:00Z"
  }
];

// Helper functions for dashboard stats
export const getStockStatus = (product) => {
  if (product.stock === 0) return "Out of Stock";
  if (product.stock < product.threshold) return "Low Stock";
  return "In Stock";
};

export const getStatusColor = (status) => {
  switch (status) {
    case "Out of Stock":
      return "bg-red-100 text-red-800";
    case "Low Stock":
      return "bg-yellow-100 text-yellow-800";
    case "In Stock":
      return "bg-green-100 text-green-800";
    default:
      return "bg-green-100 text-green-800";
  }
};

export const getTotalProducts = () => products.length;

export const getTotalSales = () => {
  return sales.reduce((total, sale) => total + sale.total, 0);
};

export const getLowStockItems = () => {
  return products.filter(product => product.stock < product.threshold);
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
};
