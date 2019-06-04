	import React from 'react';
  import { Link } from 'react-router-dom'
  import CartItem from './CartItem';



import Description from '../Description';
import Header from '../Header/header.js'; 
import Tabs from '../Tabs';

	// const APIcall = 'http://localhost:3001/cart1';
	
    export default class Cart extends React.Component {
      constructor(props) {
        super(props);
        this.state = { 
        // selectedTable: '',
        products: [], 
        savedForLater: [],
        total: 0, 

    
    }
    // console.log(super());

		
		this.addToCart = this.addToCart.bind(this)
		this.deleteCart = this.deleteCart.bind(this)
      }
     
	  componentWillMount() {

      fetch('http://localhost:3001/cart', {
        credentials: "include",
      }).then((response) => response.json())
      .then((response2) => {
        // fetch('http://localhost:3001/SaveForLater')
        console.log(response2);
          this.setState ({
            products: response2
          })

        })

        
      }
      
   
    
  //   getColumnList(selectedTable) {
  //   if (!selectedTable) {
  //     selectedTable = this.state.selectedTable;
  //   }
  //   Object.assign(fetch.defaults, {headers: {authorization: this.state.auth}});
  //   axios.get(`${this.props.baseUrl}/${selectedTable}/$metadata?@json`)
  //     .then(res => {
  //       let columns = res.data.items[0]["odata:cname"];
  //       this.setState({ 
  //         columns,
  //         selectedColumns: [], 
  //       });
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         alert('Code: ' + error.response.data.error.code + 
  //               '\r\nMessage: ' + error.response.data.error.message);
  //       } else {
  //         console.log('Error', error.message);
  //       }
  //     });
  // }
      
    //   clearCart = () => {
    //     localStorage.removeItem('cart');
    //     this.setState({products: []});
	  // }
    
  //    getColumnList(selectedTable) {
  //   if (!selectedTable) {
  //     selectedTable = this.state.selectedTable;
  //   }
  //   Object.assign(axios.defaults, {headers: {authorization: this.state.auth}});
  //   axios.get(`${this.props.baseUrl}/${selectedTable}/$metadata?@json`)
  //     .then(res => {
  //       let columns = res.data.items[0]["odata:cname"];
  //       this.setState({ 
  //         columns,
  //         selectedColumns: [], 
  //       });
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         alert('Code: ' + error.response.data.error.code + '\r\nMessage: ' + error.response.data.error.message);
  //       } else {
  //         console.log('Error', error.message);
  //       }
  //     });
  // }
	  addToCart(event) {
	    fetch('http://localhost:3001/isLoggedIn', {
	      credentials: "include"
	    }).then((res) => {
	      return res.json()
	    }).then((json) => {
	        if (json.hasOwnProperty("error")) {
	          console.log("not logged in");
	        } else {
	          var url = window.location.pathname;
	          var file = url.substring(url.lastIndexOf('/') + 1);
	          alert(file);
	          let body = {
	            isbn: this.isbn = this.state.isbn
	          };
	          console.log(body);


	          fetch('http://localhost:3001/cart', {
	            method: "POST",
	            credentials: "include",
	            headers: {
	              "Content-Type": "application/json"
	            },
	            // body: JSON.stringify(body)
	          }).then(
	            (response2) => {
	              return response2.json();
	            }).then((json) => {
	            console.log(json);
	          })
	        }
	      }

	    )
    }

//force refresh. 
    deleteCart(event, isbn){
      console.log('hello isbn', isbn);
      
      fetch('http://localhost:3001/isLoggedIn', {
        credentials: "include"
      }).then((res) => {
        return res.json()
      }).then((json) => {
          if (json.hasOwnProperty("error")) {
            console.log("not logged in");
          } else {
            var url = window.location.pathname;
            var file = url.substring(url.lastIndexOf('/') + 1);
            alert(file);
            
            console.log('Hello');

            fetch(`http://localhost:3001/cart?id=${isbn}`, {

              method: "DELETE",
              credentials: "include",
              headers: {
                "Content-Type": "application/json"
              }
              // body: JSON.stringify(body)
            }).then(
              (response2) => {
                return response2.json();
              }).then((json) => {
                window.location.reload();
            })
          }
        }
      )
    }


    savedForLater(event, isbn) {
      console.log('hello isbn', isbn);

      fetch('http://localhost:3001/isLoggedIn', {
        credentials: "include"
      }).then((res) => {
        return res.json()
      }).then((json) => {
        if (json.hasOwnProperty("error")) {
          console.log("not logged in");
        } else {
          var url = window.location.pathname;
          var file = url.substring(url.lastIndexOf('/') + 1);
          alert(file);
           let body = {
             isbn: isbn
           };

          console.log('Hello');

          fetch(`http://localhost:3001/SaveForLater`, {

            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
          }).then(
            (response2) => {
              return response2.json();
            }).then((json) => {
            window.location.reload();
          })
        }
      })
    }
//
   
//list end point and put a button on each of them 
//  <div>
//     {
//       this.state.products.map((dynamicData, key) =>(
//       <div className = "card-body" >
//           <h5 className="card-title">{dynamicData.title}</h5>
//           <h5 className="card-title"><small>{dynamicData.price}</small>
//           <button className="btn btn-sm btn-warning float-right" onClick={this.deleteCart}>Remove from cart</button></h5>

//       </div> )
//       )
//     }
//   </div>
//   <div><p></p></div>
// <div>
//     </div>
        //<h5><button className="btn btn-sm btn-warning float-right" onClick={this.deleteCart}>Remove from cart</button></h5>
//
render() {
    const {total, products} = this.state

    let cart = this.state.products.map(( key, key2) =>(
        
          <div>
              <table class="table">
              <thead>
                <tr>
                  <th scope="col">BOOK</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> 
                    <h5 className="card-title" >{key.title} </h5>
                    <img class= "cover-small" width="150" src= {key.cover} />
                  </td>

                  <td>
                  <h5 className="card-title"><small>{key.price}</small></h5>
                  </td>
                  <td>
                    <h5> <small>{
                     products.length > 1 ? key.price + key.price: key.price
                    } </small> </h5>    
                  </td>
                  <td>
                    <a class="btn btn-primary" href="#" role="button" name= {key2} onClick={(e) => this.savedForLater(e, key.isbn)}>Save for Later</a>
                    </td>
                    <td>
                    <a class=" card-title btn btn-warning " name= {key2} onClick={(e) => this.deleteCart(e, key.isbn)}>Remove from cart</a>

                    </td>

                  </tr>
                  
              </tbody>
                
            </table>

            <div>
            </div>
            </div>
           )
           
           );
   
           let savedForLater = this.state.products.map((key, key2) => (
             <div>
              <table class="table">
              <thead>
                <tr>
                  <th scope="col">BOOK</th>
                  <th scope="col">PRICE</th>
                  <th scope="col">total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td> 
                    <h5 className="card-title" >{key.title} </h5>
                    <img class= "cover-small" width="150" src= {key.cover} />
                  </td>

                  <td>
                  <h5 className="card-title"><small>{key.price}</small></h5>
                  </td>
                  <td>
                    <h5> <small>{
                     products.length > 1 ? key.price + key.price: key.price
                    } </small> </h5>    
                  </td>
                  <td>
                    <a class="btn btn-primary" href="#" role="button" name= {key2} onClick={(e) => this.savedForLater(e, key.isbn)}>Save for Later</a>
                    </td>
                    <td>
                    <a class=" card-title btn btn-warning " name= {key2} onClick={(e) => this.deleteCart(e, key.isbn)}>Remove from cart</a>

                    </td>

                  </tr>
                  
              </tbody>
                
            </table>

            <div>
            </div>
            </div>
          
           )
           );

    return (
      <div>
        <h1>Shopping Cart</h1>
        {cart}

        <h1>Saved For Later</h1>

      </div>
    );

  }
}
    