export class Student {
  _id?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  father_name?: string;
  mother_name?: string;
  date_of_birth?: string;
  father_occupation?: string;
  blood_group?: string;
  religion?: string;
  email?: string;
  year_academic?: string;
  addmission_date?: string;
  kelas?: {
    _id?: string;
    class_name?: string;
    teacher?: {
      _id?: string;
      first_name?: string;
      last_name?: string;
      email?: string;
      short_bio?: string;
    };
    subject?: [
      {
        _id?: string;
        subject_name?: string;
        teacher_id?: {
          _id?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          short_bio?: string;
          id?: string;
        };
        duration?: string;
        id?: string;
      }
    ];
  };
  address?: string;
  phone?: string;
  password?: string;
  short_bio?: string;
  image?: string;
  role?: string;
  status?: string;
  subject?: [
    {
      subject_name?: {
        _id?: string;
        subject_name?: string;
        teacher_id?: string;
        duration?: string;
        id?: string;
      };
      score_subject?: string;
    }
  ];
  id?: string;
}
