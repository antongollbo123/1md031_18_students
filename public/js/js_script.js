function MenuItem(name, kCal, gluten,lactose){
  this.burgername = name;
  this.calories = kCal;
  this.gluten = gluten;
  this.lactose = lactose;
  this.burger = function(){
    return this.burgername + " " + this.calories;
  };
}
var burg = new MenuItem("Tryffelburg","4500","Ja","Nej");
console.log(burg.burger());
