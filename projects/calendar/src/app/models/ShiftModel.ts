export interface ShiftModel {
    fromHour: number;
    toHour: number;
    code: string;
    name: string;
    isWorking: boolean;
    day: Date;
    worker_id: number;
}