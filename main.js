const app = Vue.createApp({
    data(){
        return{
            clientName: 'Lucas',
            orderTime: '08:18h 18/11',
            orderStatus: 'Aguardando confirmação cozinha',

            ordemItemsList: [
                {
                    PortionName: '12312',
                    PortionableName: 'aaaaa',
                    Note: 'bbbbbbbb',
                    Quantity: 12
                }
            ]
        }
    },
    methods:{
        changeStatus(){
            this.orderStatus = 'preparação'
        },

        async getData() {
            let response = await fetch('http://localhost:3000/api/v1/restaurants/11bs0k/orders/ou5634n4');
           
              let data = await response.json();
              console.log(data);
              
              this.orderCode = data.order.alphanumeric_code
              this.clientName = data.order.client_name
              this.orderTime = data.order.created_at
              this.orderStatus = data.order.status
              this.ordemItemsList = [];
              data.order_items.forEach(order_item => {
                const newItem = {
                    PortionName: order_item.portion_name,
                    PortionableName: order_item.portion_description,
                    Note: order_item.note,
                    Quantity: order_item.quantity
                };
                this.ordemItemsList.push(newItem);
            });
        }
      
    }

})

app.mount('#app')