// Contains all the custom types we want to use for our application
export interface BookItem {
  doctorId: number;
  name: string;
  author: string;
  price: number;
  isPublic: boolean;
  isSuggested: boolean;
}

export interface Provider{
  name: string;
  email: string;
  gender: string;
  address: string;
  contact: string;
  specialization: string;
  dateOfBirth: string;
  providerId: number;
  yearsOfExperience: number;
  upcomingAppointments: Appointment[];
  availabilitySchedule: AppointmentSlot[];
}

export interface Appointment{
  id: number;
  providerId: number;
  patientId: number;
  duration: number;
  providerName: string;
  providerEmail: string;
  patientName: string;
  patientEmail: string;
  date: Date | string;
  time: string;
  url: string;
  status: string;
  videoAppointment: boolean;
}

export interface AppointmentSlot{
  appointmentSlotId: number;
  providerId: number;
  day: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
}

export interface PatientHistory{
  patientId: number;
  apptDate: string;
  providerName: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}