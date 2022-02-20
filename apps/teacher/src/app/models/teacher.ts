export class Teacher {
  _id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  date_of_birth?: string;
  blood_group?: string;
  religion?: string;
  addmission_date?: string;
  email?: string;
  address?: string;
  phone?: string;
  password?: string;
  short_bio?: string;
  image?: string;
  role?: string;
  kelas?: {
    _id?: string;
    class_name?: string;
  };
  Subject?: [
    {
      _id?: string;
      subject_name?: string;
    }
  ];
}
