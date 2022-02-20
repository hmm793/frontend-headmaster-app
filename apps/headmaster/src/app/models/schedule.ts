export class Schedule {
    _id?: string;
    kelas?: {
      _id?: string;
      class_name?: string;
      teacher?: {
        _id: string;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        short_bio: string;
        id: string;
      };
    };
    title?: string;
    daysOfWeek?: [string];
    start?: string;
    end?: string;
    startTime?: string;
    endTime?: string;
    color?: string;
    allDay?: boolean;
    id?: string;
  }