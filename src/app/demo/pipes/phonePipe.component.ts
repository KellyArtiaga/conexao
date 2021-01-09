import { Pipe, PipeTransform, WrappedValue } from '@angular/core';

@Pipe({
  name: "phone"
})
export class PhonePipe implements PipeTransform {

  transform(text: any, ...args: any[]): any {

    if (!text) {
      return ''
    }
    text = text.toString().replace(/[^0-9]/g, '').substr(0, 11);
    let chars = text.split('');

    // (31) 99547-9995
    // (31) 9547-9995
    let formatA = ["(\d", "\d", ") \d", "\d", "\d", "\d", "-\d", "\d", "\d", "\d"];
    let formatB = ["(\d", "\d", ") \d", "\d", "\d", "\d", "\d", "-\d", "\d", "\d", "\d"];
    let format = chars.length <= 10 ? formatA : formatB

    let result = "";

    chars.map((char, index) => {
      let parsedStr = format[index].replace("\d", char);
      result += parsedStr;
    })

    return result.substring(0, 15);
  }
}
