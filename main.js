
const app = Vue.createApp({
  data() {
      return {
          orders: [{
            currentPage: '', 
            orderCode: '',
            clientName: '',
            orderTime: '',
            orderStatus: '',
          }            
          ],
          ordemItemsList: [
            {
                PortionName: '',
                PortionableName: '',
                Note: '',
                Quantity: 12
            }
        ]
      };
  },
  methods: {
      showIndex() {
          this.currentPage = 'index';
          this.getOrders();
      },

      showOrderDetails(orderCode) {
          this.currentPage = 'orderDetails';
          this.getData(orderCode);
      },

      async getOrders() {
          let response = await fetch('http://localhost:3000/api/v1/restaurants/11bs0k/orders');
          let data = await response.json();
          console.log(data);

          this.orders = data.orders.forEach(item => ({
            orderCode: item.alphanumeric_code,
            clientName: item.client_name,
            orderTime: item.created_at,
        }))
      },

      async getData(orderCode) {
          let response = await fetch(`http://localhost:3000/api/v1/restaurants/11bs0k/orders/${orderCode}`);
          let data = await response.json();
          console.log('Dados recebidos:', data);

          this.orderCode = data.order.alphanumeric_code;
          this.clientName = data.order.client_name;
          this.orderTime = data.order.created_at;
          this.orderStatus = data.order.status;

          this.ordemItemsList = data.order_items.map(item => ({
              PortionName: item.portion_name,
              PortionableName: item.portion_description,
              Note: item.note,
              Quantity: item.quantity
          }));
      },

      changeStatus() {
          this.orderStatus = 'Em preparação';
      }
  },
  mounted() {
      this.getOrders();
  }
});

app.mount('#app');