const app = Vue.createApp({
    data() {
      return {
        
        orders: [],
        ordemItemsList: [],
        clientName: '',
        orderTime: '',
        orderStatus: '',
        orderCode: '',
        restaurantCode: '',
        newLogin: true,
        showList: false,
        showDetails: false,
      };
    },
    methods: {
      getRestaurant(restaurantCode){
        this.restaurantCode = restaurantCode;
        this.getData()
      },
      goBack() {
        this.showList = true;
        this.showDetails = false;
      },
      
      async getData() {
        const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/`, {
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
        this.newLogin = false;
        this.showList = true;
        this.showDetails = false;
      },
      
      async getOrder( orderCode) {
        const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${orderCode}`, {
            cache: 'no-store',
          });
        const data = await response.json();
        this.clientName = data.order.client_name;
        this.orderTime = data.order.created_at;
        this.orderStatus = data.order.status;
        this.orderCode = data.order.alphanumeric_code;
        this.ordemItemsList = data.order_items.map(item => ({
          PortionName: item.portion_name,
          PortionableName: item.portion_description,
          Note: item.note,
          Quantity: item.quantity,
        }));
        this.newLogin = false;
        this.showList = false;
        this.showDetails = true;
      },

      async updateData(newStatus) {
        const response = await fetch(`http://localhost:3000/api/v1/restaurants/${this.restaurantCode}/orders/${this.orderCode}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              status: newStatus, 
            }),
          });
      },
    },
  });
  
  app.mount('#app');