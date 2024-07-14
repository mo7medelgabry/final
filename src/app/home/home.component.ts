import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services.service';
import { ChangeDetectorRef } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  clients: any[] = [];
  money: any[] = [];
  total: { [key: string]: number } = {};
  searchvalue: string = '';

  constructor(private services: ServicesService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log("hello");
    this.services.getTransactions().subscribe(data => {
      this.money = data;
      this.services.getCustomers().subscribe(data => {
        this.clients = data;
        this.clients.forEach((element: any) => {
          const id = element.id;
          let amount = 0;
          this.money.forEach((transaction: any) => {
            if (transaction.customer_id === Number(id)) {
              console.log("match");
              amount += transaction.amount;
            }
          });
          this.total[id] = amount;
        });
      });
    });
  }

  DetailsId: any[] = [];
  selectedCustomer: any = {};
  selectedCustomerTransactions: any[] = [];
  amunt1: any = 0;
  amunt2: any = 0;

  viewDetails(id: any): void {
    this.DetailsId.push(id);
    this.display(id);
  }

  chartOptions: any = {};

  updateChartOptions(): void {
    this.chartOptions = {
      exportEnabled: false,
      title: {
        text: "Line Chart"
      },
      axisX: {
        valueFormatString: "DD MMM", // Format for displaying day and month
        interval: 1,
        intervalType: "day" // Setting the interval type to day
      },
      data: [{
        type: "line",
        xValueFormatString: "DD MMM YYYY", // Date value format for tooltips
        dataPoints: [
          { x: new Date(2021, 12, 31), y: 0 },
          { x: new Date(2022, 1, 1), y: this.amunt1 },
          { x: new Date(2022, 1, 2), y: this.amunt2 },
          { x: new Date(2022, 1, 3), y: 0 }
        ]
      }]
    };
  }

  display(cardId: number): void {
    this.selectedCustomer = this.clients.find(c => c.id === cardId);
    this.selectedCustomerTransactions = this.money.filter(t => Number(t.customer_id) === Number(cardId));

    if (this.selectedCustomer) {
      this.amunt1 = this.selectedCustomerTransactions.length >= 1 ? this.selectedCustomerTransactions[0].amount : 0;
      this.amunt2 = this.selectedCustomerTransactions.length >= 2 ? this.selectedCustomerTransactions[1].amount : 0;

      this.updateChartOptions();

      this.cdr.detectChanges();
    }
  }

  viewDetails2(id: any): void {
    this.viewDetails(id);
    this.viewDetails(id);  
  }
}
