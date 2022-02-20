export class Kelas {
  _id!: string;
  class_name!: string;
  teacher!: {
    _id?: string;
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    short_bio?: string;
    id?: string;
  };
  subject!: [
    {
      _id?: string;
      subject_name?: string;
      teacher_id?: {
        _id?: string;
        first_name?: string;
        last_name?: string;
        email?: string;
        phone?: string;
        short_bio?: string;
        id?: string;
      };
      duration?: string;
      id?: string;
    }
  ];
}
