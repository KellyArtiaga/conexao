import { Pipe, PipeTransform, WrappedValue } from '@angular/core';

@Pipe({
  name: "price",
})
export class PricePipe implements PipeTransform{

  transform(text, decimals = 2) {
    text = text ? text.toString() : "";
    var result = ""
    var strLeft = ["0"]
    var strRight = new Array(decimals).fill("0");
    text = (parseInt(text.replace(/[^0-9]/g, "")) || 0).toString();
    var splitted = text.split(",");
    
    if (splitted.length == 1) {
      splitted[1] = splitted[0].substr(decimals * -1);
      splitted[0] = splitted[0].substr(0, splitted[0].length - decimals);
    }
    splitted[1] = splitted[1].substr(0, decimals);

    splitted[1] = parseInt(splitted[1] || 0).toString()
    splitted[0] = (parseInt(splitted[0]) || 0).toString()

    splitted[0] = splitted[0].split("").reverse().map((l, i) => {
      if (i != 0 && (i-3) % 3 == 0) {
          return l+"."
      } else {
         return l
      }
     }).reverse().join("");
    
   
    
    strLeft = splitted[0].split('')
    
    var decArr = splitted[1].split("")
    for (let i = decimals-1; i >= 0; i--) {
      strRight[i] = decArr.pop()  || strRight[i] 
    }

    result = "R$ " + (strLeft.join("") + "," + strRight.join(""))
    return result
  }

}
