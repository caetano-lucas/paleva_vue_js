const app = Vue.createApp({
    data() {
      return {
        
        orders: [],
        ordemItemsList: [],
        clientName: '',
        orderTime: '',
        orderStatus: '',
        
        showList: true,
        showDetails: false,
      };
    },
    methods: {
      
      goBack() {
        this.showList = true;
        this.showDetails = false;
      },
      
      async getData() {
        const response = await fetch('http://localhost:3000/api/v1/restaurants/11bs0k/orders/', {
          cache: 'no-store',
        });
        const data = await response.json();
        this.orders = data.orders
        .filter(item => item.status === 'aguardando_confirmacao_cozinha' || item.status === 'preparação')
        .map(order => ({
          orderCode: order.alphanumeric_code,
          orderClientName: order.client_name,
          orderTime: order.created_at,
          orderStatus: order.status,
        }));
        this.showList = true;
        this.showDetails = false;
      },
      
      async getOrder(orderCode) {
        const response = await fetch(`http://localhost:3000/api/v1/restaurants/11bs0k/orders/${orderCode}`);
        const data = await response.json();
        this.clientName = data.order.client_name;
        this.orderTime = data.order.created_at;
        this.orderStatus = data.order.status;
        this.ordemItemsList = data.order_items.map(item => ({
          PortionName: item.portion_name,
          PortionableName: item.portion_description,
          Note: item.note,
          Quantity: item.quantity,
        }));
        this.showList = false;
        this.showDetails = true;
      },
    },
  });
  
  app.mount('#app');