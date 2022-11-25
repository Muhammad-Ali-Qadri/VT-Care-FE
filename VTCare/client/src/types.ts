// Contains all the custom types we want to use for our application
export interface BookItem {
  doctorId: number;
  name: string;
  author: string;
  price: number;
  isPublic: boolean;
  isSuggested: boolean;
}

//TODO: Make it parent of users and comply with API and other usages.
export interface User{
  id: number;
  name: string;
  email: string;
  gender: string;
  address: string;
  contact: string;
  dateOfBirth: string;
  upcomingAppointments: Appointment[];
}

export interface Provider {
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

export declare type AppointmentStatus = 'SCHEDULED' | 'PROCEEDING' | 'CANCELLED' | 'COMPLETED';

export interface Patient{
  name: string;
  email: string;
  gender: string;
  address: string;
  contact: string;
  dateOfBirth: string;
  id: number;
  designation: string;
  Insurance: Insurance;
  upcomingAppointments: Appointment[];
  patientVisitHistory: PatientVisitHistory[];
}

export interface Appointment {
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
  status: AppointmentStatus;
  videoAppointment: boolean;
}

export interface PatientVisitHistory{
  id: number;
  patientId: number;
  appDate: string;
  providerName: string;
  diagnosis: string;
  prescription: string;
  notes: string;
}

export interface Insurance{
  id: number;
  policeNo: number;
  networkId: number;
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