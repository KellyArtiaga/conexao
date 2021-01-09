import { Pipe, PipeTransform, WrappedValue } from '@angular/core';

@Pipe({
  name: "centseparator"
})
export class SeparadorPipe implements PipeTransform{

  transform(text) {
    if (!text) {
      return ''
    }
    var parsedStr = text.toString().replace(/[^0-9]/g, '');
    var result = [];
    var counter = 1;
    for (let i = parsedStr.length - 1; i >= 0; i--) {
      result.unshift(parsedStr[i]);
      if (counter % 3 == 0 && i > 0) {
        result.unshift(".");
      }
      counter++;
    }

    return result.join("");
  }

}
