import { Injectable } from '@angular/core';
import win1252 from 'windows-1252';
import { text } from 'd3';

@Injectable({
  providedIn: 'root'
})
export class CsvServiceService {

  constructor() { }

  export(fileName: string, data: object[], columns: string[], columnNames: string[]) {
    let csv = "data:text/csv;charset=utf-8,\uFEFF";
    let textEncoder = new TextEncoder();

    columnNames.map(col => {
      csv += col+","
    })
    csv += "\n"
    data.map(row => {

      columnNames.map((name, index) => {
        csv += (row[columns[index]] === true ? "SIM" : row[columns[index]] === false ? "NÃO" : row[columns[index]] || "")+","
      })

      csv += "\n"
    })
    var encodedUri = encodeURI(csv);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", fileName+".csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    link.remove();
  }
}
