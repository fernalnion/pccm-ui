import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { first, groupBy, sumBy } from 'lodash';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { CarbonFootprint } from 'src/app/models/carbon-footprint';
import { Category } from 'src/app/models/category';
import { CarbonCreditService } from 'src/app/services/carbon-credit.service';
import { CarbonFootprintService } from 'src/app/services/carbon-footprint.service';
import { CategoryService } from 'src/app/services/category.service';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
})
export class DashboardComponent implements OnInit {
  carbonCredit: number = 0;
  carbonEmission: number = 0;
  carbonFootprint: CarbonFootprint[] = [];
  isCarbonFootprintVisible = false;

  catogory: Category[] = [];
  carbonFootprintForm!: FormGroup<{
    activityType: FormControl<string>;
    utilizedAmount: FormControl<number>;
  }>;

  // charts
  private categorywiseCreditChart: any = null;
  private categorywiseCArbonFootprintChart: any = null;

  constructor(
    private readonly carbonCreditService: CarbonCreditService,
    private readonly notificationService: NzNotificationService,
    private readonly categoryService: CategoryService,
    private readonly carbonFootprintService: CarbonFootprintService,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next: (data: any) => {
        this.catogory = data.data;
      },
    });

    this.carbonCreditService.getCredit().subscribe({
      next: (credits: any) => {
        this.carbonCredit = credits.data.credits ?? 0;
      },
      error: (error) => {
        this.notificationService.error('Error', error.message);
      },
    });

    this.carbonFootprintService.getCarbonFootprint().subscribe({
      next: (data) => {
        this.carbonFootprint = data.data;

        this.carbonEmission = sumBy(
          this.carbonFootprint,
          (m) => m.carbonEmissions!
        );

        this.initCategorywiseChart();
      },
    });
  }

  showCarbonFootprintModal(): void {
    this.carbonFootprintForm = this.fb.group({
      activityType: ['', [Validators.required]],
      utilizedAmount: [0, [Validators.required, Validators.min(1)]],
    });
    this.isCarbonFootprintVisible = true;
  }

  initCategorywiseChart = () => {
    this.categorywiseCreditChart = echarts.init(
      document.getElementById('categorywiseChart') as any
    );

    this.categorywiseCArbonFootprintChart = echarts.init(
      document.getElementById('categorywiseCArbonFootprintChart') as any
    );

    const carbonFootprintGroup = groupBy(
      this.carbonFootprint,
      (footprint) => footprint.activityType
    );

    const categorywiseCreditChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Carbon Credis',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            ...Object.entries(carbonFootprintGroup).map(
              ([activityId, data]) => {
                const category = this.catogory.find(
                  (x) => x._id === activityId
                );
                return {
                  value: sumBy(data, (credit) => credit.credits!),
                  name: category?.category,
                };
              }
            ),
          ],
        },
      ],
    };

    const categorywiseCarbonFootprintChartOptions = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          name: 'Carbon Credis',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            ...Object.entries(carbonFootprintGroup).map(
              ([activityId, data]) => {
                const category = this.catogory.find(
                  (x) => x._id === activityId
                );
                return {
                  value: sumBy(data, (credit) => credit.carbonEmissions!),
                  name: category?.category,
                };
              }
            ),
          ],
        },
      ],
    };

    this.categorywiseCreditChart.setOption(categorywiseCreditChartOptions);
    this.categorywiseCArbonFootprintChart.setOption(
      categorywiseCarbonFootprintChartOptions
    );
  };

  handleCarbonFootprintOk(): void {
    if (this.carbonFootprintForm.valid) {
      this.carbonFootprintService
        .addCarbonFootprint(<CarbonFootprint>this.carbonFootprintForm.value)
        .subscribe({
          next: (result: any) => {
            this.carbonCredit += result.data.credits;
            this.notificationService.info(
              'Information',
              `Credit Added : ${result.data.credits.toFixed(3)}`
            );
            this.isCarbonFootprintVisible = false;
          },
          error: (error) => {
            this.notificationService.error('Error', error.message);
          },
        });
    } else {
      Object.values(this.carbonFootprintForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  handleCarbonFootprintCancel(): void {
    this.isCarbonFootprintVisible = false;
  }

  getSelectedUnit() {
    if (this.carbonFootprintForm.controls.activityType.valid) {
      const category = this.catogory.find(
        (_category) =>
          _category._id === this.carbonFootprintForm.controls.activityType.value
      );

      if (category) {
        return `[${category.unit}]`;
      }
    }

    return '';
  }
}
