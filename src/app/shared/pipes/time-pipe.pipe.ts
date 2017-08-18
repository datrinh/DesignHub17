import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timePipe'
})
export class TimePipe implements PipeTransform {
  transform(value: number, format: string): string {
      // const date = new Date(value);
      let result = format;
      // let ss: string|number = date.getUTCSeconds();
      // let mm: string|number = date.getUTCMinutes();
      // let hh: string|number = date.getUTChh();

      let hh: string|number = Math.floor(value / 3600);
      let mm: string|number = Math.floor((value - (hh * 3600)) / 60);
      let ss: string|number = Math.floor(value) - (hh * 3600) - (mm * 60);


      if (ss < 10) {
          ss = '0' + ss;
      }
      if (mm < 10) {
          mm = '0' + mm;
      }
      if (hh < 10) {
          hh = '0' + hh;
      }

      result = result.replace(/ss/g, <string>ss);
      result = result.replace(/mm/g, <string>mm);
      result = result.replace(/hh/g, <string>hh);

      return result;
  }
}
