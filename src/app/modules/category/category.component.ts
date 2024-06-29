import { Component } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.less'],
})
export class CategoryComponent {
  catogory: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private notificationService: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (catogory: any) => {
        this.catogory = catogory.data;
      },
      error: (error) => {
        this.notificationService.error('Error', error.message);
      },
    });
  }
}
