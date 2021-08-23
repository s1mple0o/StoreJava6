const app = angular.module("shopping_cart_app",[]);

app.controller("shopping_cart_ctrl",function($scope,$http){
	
	//quản lý giỏ hàng
	$scope.cart = {
		
		items : [],
		//Thêm sản phẩm vào giỏ hàng
		add(id){
			
			var item = this.items.find(item => item.id == id);
			if(item){
				item.qty++;
				this.saveToLocalStorage();
				console.log("items :",items)
			}else{
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty =1 ;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
				
		},
	
		//Xóa sản phẩm khỏi giỏ hàng
		remove(id){
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index,1);
			this.saveToLocalStorage();
		},
		//xóa sách các mặt hàng trong giỏ
		clear(){
			this.items = [];
			this.saveToLocalStorage();
		},
		//Tính tiền của 1 sản phẩm
		amt_of(item){},
		//tính tổng số lượng các mặt hàng trong giỏ
		get count(){
			return this.items
			.map(item => item.qty)
			.reduce((total,qty)=> total += qty,0);
		},
		//Tính tổng thành tiền các mặt hàng trong giỏ
		get amount(){
			return this.items
			.map(item => item.qty * item.price)
			.reduce((total,qty)=> total += qty,0);
		},
		//Lưu giỏ hàng vào local storage
		saveToLocalStorage(){
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart",json);
		},
		//Đọc giỏ hàng từ local storage
		loadFormLocalStorage(){
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		}
	}
	
	$scope.cart.loadFormLocalStorage();
	
	$scope.order = {
		createDate: new Date(),
		address : "",
		account : {username : $("#username").text()},
		get orderDetails(){
			return $scope.cart.items.map(item =>{
				return {
					product : {id : item.id},
					price : item.price,
					quantity : item.qty
				}
			})
		},
		purchase(){
			
			var order = angular.copy(this);
			//thực hiện đặt hàng
			$http.post("/rest/orders",order).then(response =>{
				alert("Đặt hàng thành công !");
				$scope.cart.clear();
				location.href = "/order/detail/" + response.data.id;
			})
			.catch(error =>{
				alert("Đặt hàng lỗi!")
				console.log("error",error);
			})
		}
	}
	
	
})