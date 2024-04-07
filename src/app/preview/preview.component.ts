import { Component } from '@angular/core';
import { FormDataServiceService } from '../services/form-data-service.service';
import { FormDataModel } from '../model/FormDataModel';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.css'
})
export class PreviewComponent {
  constructor(public formDataService: FormDataServiceService){}
  formDataModel: FormDataModel = this.formDataService.formData!
  //fd: any = JSON.parse(this.formDataModel)
}
