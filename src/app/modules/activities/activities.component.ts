import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CarbonFootprint } from 'src/app/models/carbon-footprint';
import { Category } from 'src/app/models/category';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.less'],
})
export class ActivitiesComponent implements OnInit {
  catogory: Category[] = [];
  carbonFootprint: CarbonFootprint[] = [];

  constructor(
    private readonly notificationService: NzNotificationService,
    private readonly categoryService: CategoryService,
    private readonly carbonFootprintService: CarbonFootprintService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        this.catogory = data.data;

        this.carbonFootprintService.getCarbonFootprint().subscribe({
          next: (data) => {
            this.carbonFootprint = data.data.map((footprint) => ({
              ...footprint,
              activityType: this.catogory.find(
                (x) => x._id == footprint.activityType
              )?.category!,
            }));
          },
        });
      },
    });
  }

  download(){
    
  }
}
