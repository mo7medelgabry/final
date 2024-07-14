import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serch'
})
export class SerchPipe implements PipeTransform {

  transform(clients: any[], searchword: string): any[] {
    if (!clients) {
      return [];
    }

    searchword = searchword ? searchword.toLocaleLowerCase() : '';

    return clients.filter((customer: any) => 
      customer.name && customer.name.toLocaleLowerCase().includes(searchword)
    );
  }

}
