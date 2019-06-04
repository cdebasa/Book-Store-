import React from "react";
import {BrowserRouter, Route, Link} from "react-router-dom";
import BookInfo from "./BookInfo";
const API = 'http://localhost:3001/book/';

class BookInfoSmall extends React.Component {
	constructor(props) {
			super(props);
	    this.state = {
			isbn: this.props.isbn,
			response: '',
			post: '',
			responseToPost: '',
			};
				 this.addToCart = this.addToCart.bind(this)


		}

	addToCart(event) {
		fetch('http://localhost:3001/isLoggedIn', {credentials: "include" })
		.then((res) => {
				return res.json()
		}).then((json) => {
				if(json.hasOwnProperty("error")){
					console.log("not logged in");
				}
				else{
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
						body: JSON.stringify(body)
					}).then(
						(response2) => {
						return response2.json();
						}).then((json) => {
									console.log(json);
						} 
						)
				}
		}
		
		)}

		


  render() {
    return (
			<div>
			<div class= "book-wrapper">	
			<Link to={{ pathname: '/book/' + this.state.isbn}}>
			<img class= "cover-small" src= {this.props.cover}/>
			<p class= "title">{this.props.title}</p>
			</Link>
			<p class= "price">${this.props.price}</p></div>
			<div class= "buttons">

			
			<button type="submit" name="add-to-cart" value="892" class="add-to-cart-button" onClick={this.addToCart}>ADD</button>
			<button class="wishlist">
			<i class="fas fa-heart heart"></i>
			</button>	
	</div>
	</div>
  );
  
  }
};

export default BookInfoSmall;
