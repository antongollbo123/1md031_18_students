/*function MenuItem(name, kCal,lactose,gluten,stock,img){
  this.burgername = name
  this.calories = kCal;
  this.lactose = lactose;
  this.gluten = gluten;
  this.stock = stock;
  this.img = img;
 this.menu = function(){
    return x = [this.burgername, this.calories, this.gluten, this.lactose,this.stock ];
  };
}*/
/*let chickenBurger = new MenuItem("Chicken burger","850",true, false,20,"https://www.recipethis.com/wp-content/uploads/Copycat-KFC-Zinger-Chicken-Burger-In-The-Airfryer.jpg");


let tofuBurger = new MenuItem("Tofu burger","650", false, false, 15,"https://d1y37rophvf5gr.cloudfront.net/Images/Recipes/recipe-131.700x525.jpg");

let kahunaBurger = new MenuItem("Big Kahuna Burger", "1200", true, true, 5,"https://i.redd.it/dmq6jgia8oo11.jpg")

burgerList = [chickenBurger,tofuBurger,kahunaBurger];*/

"use strict";

var socket = io();

var vm = new Vue({
  el: '#wrapper',
  data: {
    checkbox : [],
    fullname: "",
    email : "",
    gender: "",
    payment: "",
    finishedorder: "",
    orders : {},
    details :{},

    burgers : food


  },

  created: function () {
    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods : {

    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },


    displayOrder: function (event){
      var offset = {x: event.currentTarget.getBoundingClientRect().left,
                    y: event.currentTarget.getBoundingClientRect().top};
                    this.details = { x: event.clientX - 10 - offset.x,
                                           y: event.clientY - 10 - offset.y };
        },

    addOrder: function (event) {
      this.finishedorder = "Your order has been placed, please look it through: " + this.checkbox + "\n" + "It will be delivered to: "+
      this.fullname + " " + "\n" + "Your email: " + this.email + "\n" + "Du är: " + this.gender + "\n" + "Please pay using: " + this.payment;

          socket.emit("addOrder", { orderId: this.getNext(), details : this.details, orderItems:this.checkbox, fullname:this.fullname, email:this.email
          });
                              }
                            }

    });

    /*displayOrder: function(event){
    var offset = {x: event.currentTarget.getBoundingClientRect().left,
                  y: event.currentTarget.getBoundingClientRect().top};

    this.order = {
      x: event.clientX - 10 - offset.x,
      y: event.clientY - 10 - offset.y,
    orderItems: this.checkbox};

    console.log(event.clientX-10-offset.x, event.clientY-10-offset.y)

  }*/
