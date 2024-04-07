import { Injectable } from '@angular/core';
import { FormDataModel } from '../model/FormDataModel';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {
  formData: FormDataModel | undefined;
  constructor() { }
}
