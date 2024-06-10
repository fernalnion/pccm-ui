export interface CarbonFootprint {
  _id: string;
  activityType: string;
  utilizedAmount: number;
  carbonEmissions?: number;
  credits?:number;
}
