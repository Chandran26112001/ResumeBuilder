import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import {FormArray, FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrl: './form1.component.css',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class Form1Component implements OnInit {
  constructor(private formBuilder: FormBuilder, private datePipe: DatePipe, private http: HttpClient){
  }
  requestBody:any = {
    profile: {},
    educations: [],
    experiences: [],
    projects: [],
    skills: [],
    achievements: [],
    profile_links: []
  };
  profileForm!: FormGroup
  educationForm: FormGroup[] = []
  experienceForm: FormGroup[] = []
  projectForm: FormGroup[] = []
  skillForm: FormGroup[] = []
  achievementForm: FormGroup[] = []
  profileLinkForm: FormGroup[] = []
  //dummy
  dummyForm!: FormGroup
  canDeleteEducationForm: boolean = false
  canDeleteExperienceForm: boolean = false
  canDeleteProjectForm: boolean = false
  canDeleteSkillForm: boolean = false
  canDeleteAchievementForm: boolean = false
  canDeleteProfileLinkForm: boolean = false
  canDeleteExpDesc: boolean = false
  canDeletePrjctDesc: boolean = false
  canDeleteAchvDesc: boolean = false
  skillItems = ['Scientific Computing', 'Engineering Softwares', 'Programming Languages']
  ngOnInit(): void {
    this.profileForm = new FormGroup({
      first_name: new FormControl(null, [Validators.required]),
      last_name: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required, Validators.pattern(/^[\w\s]+,\s*[\w\s]+$/)]),
      phone: new FormControl(null, [Validators.required, Validators.pattern(/^(?:\+?91|0)?[ -]?[1-9]\d{2}[ -]?\d{3}[ -]?\d{4}$/)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      linkedin_username: new FormControl(null, [Validators.required])
    })
    this.dummyForm = new FormGroup({
      dummyFormArray: new FormArray([new FormControl(null), new FormControl(null)])
    })
    this.addEducationFormGroup()
    this.addExperienceFormGroup()
    this.addProjectFormGroup()
    this.addSkillFormGroup()
    this.addAchievementFormGroup()
    this.addProfileLinkFormGroup()
    console.log('--->>> '+ typeof(this.getExperienceDescription(0)))
    //this.skillForm[0].valueChanges.subscribe(console.log)
    //this.profileForm.valueChanges.subscribe(console.log)
    //this.educationForm.forEach( x => x.valueChanges.subscribe(console.log) )
  }
  isLinear = false; 

  //dummy
  get dummyFormArray(){
    return this.dummyForm.get('dummyFormArray') as FormArray
  }

  // add and remove education form group in the array
  addEducationFormGroup(){
    const newEducationForm = new FormGroup({
      institution: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required, Validators.pattern(/^[\w\s]+,\s*[\w\s]+$/)]),
      degree: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required])
    })
    this.educationForm.push(newEducationForm)
    this.educationForm.length > 1 ? this.canDeleteEducationForm = true : this.canDeleteEducationForm = false
  }
  removeEducationForm(i: number){
    console.log(this.educationForm[i].value)
    this.educationForm.splice(i, 1)
    this.educationForm.length > 1 ? this.canDeleteEducationForm = true : this.canDeleteEducationForm = false
  }

  // add and remove experience form group in the array
  addExperienceFormGroup(){
    const newExperienceForm = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      location: new FormControl(null, [Validators.required, Validators.pattern(/^[\w\s]+,\s*[\w\s]+$/)]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      description: new FormArray([])
    })
    const experienceDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>newExperienceForm.get("description")).push(experienceDescriptionFormControl);
    this.experienceForm.push(newExperienceForm)
    this.experienceForm.length > 1 ? this.canDeleteExperienceForm = true : this.canDeleteExperienceForm = false
  }
  removeExperienceForm(i: number){
    console.log(this.experienceForm[i].value)
    this.experienceForm.splice(i, 1)
    this.experienceForm.length > 1 ? this.canDeleteExperienceForm = true : this.canDeleteExperienceForm = false
  }

  // add and remove project form group in the array
  addProjectFormGroup(){
    const newProjectForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      startDate: new FormControl(null, [Validators.required]),
      endDate: new FormControl(null, [Validators.required]),
      description: new FormArray([])
    })
    const projectDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>newProjectForm.get("description")).push(projectDescriptionFormControl);
    this.projectForm.push(newProjectForm)
    this.projectForm.length > 1 ? this.canDeleteProjectForm = true : this.canDeleteProjectForm = false
  }
  removeProjectForm(i: number){
    console.log(this.projectForm[i].value)
    this.projectForm.splice(i, 1)
    this.projectForm.length > 1 ? this.canDeleteProjectForm = true : this.canDeleteProjectForm = false
  }

  // add and remove skill form group in the array
  addSkillFormGroup(){
    const newSkillForm = new FormGroup({
      skill: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })
    this.skillForm.push(newSkillForm)
    this.skillForm.length > 1 ? this.canDeleteSkillForm = true : this.canDeleteSkillForm = false
  }
  removeSkillForm(i: number){
    console.log(this.skillForm[i].value)
    this.skillForm.splice(i, 1)
    this.skillForm.length > 1 ? this.canDeleteSkillForm = true : this.canDeleteSkillForm = false
  }

  // add and remove achievement form group in the array
  addAchievementFormGroup(){
    const newAchievementForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      description: new FormArray([])
    })
    const achievementDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>newAchievementForm.get("description")).push(achievementDescriptionFormControl);
    this.achievementForm.push(newAchievementForm)
    this.achievementForm.length > 1 ? this.canDeleteAchievementForm = true : this.canDeleteAchievementForm = false
  }
  removeAchievementForm(i: number){
    console.log(this.achievementForm[i].value)
    this.achievementForm.splice(i, 1)
    this.achievementForm.length > 1 ? this.canDeleteAchievementForm = true : this.canDeleteAchievementForm = false
  }

  // add and remove profile link form group in the array
  addProfileLinkFormGroup(){
    const newProfileLinkForm = new FormGroup({
      platform: new FormControl(null, [Validators.required]),
      url: new FormControl(null, [Validators.required, Validators.pattern(/^(https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+(?:\.com|\.in)(?:\/[a-zA-Z0-9_\/-]*)?$/)])
    })
    this.profileLinkForm.push(newProfileLinkForm)
    this.profileLinkForm.length > 1 ? this.canDeleteProfileLinkForm = true : this.canDeleteProfileLinkForm = false
  }
  removeProfileLinkForm(i: number){
    console.log(this.profileLinkForm[i].value)
    this.profileLinkForm.splice(i, 1)
    this.profileLinkForm.length > 1 ? this.canDeleteProfileLinkForm = true : this.canDeleteProfileLinkForm = false
  }
  
  // Validators
  customValidator(control: FormControl): ValidationErrors | null {
    // Implement your custom validation logic here
    if (control.value !== 'chan') {
      return { customError: true };
    }
    return null;
  }
  openDatePicker(dp?:any) {
    dp.open();
  }

  // after clicking next in each form

  profileFormNext(){
    this.requestBody.profile = this.profileForm.value
    console.log(JSON.stringify(this.requestBody))
  }
  educationFormNext(){
    this.educationForm.forEach(x=>{
      this.requestBody.educations.push( 
        {
          "institution": x.value.institution,
          "location": x.value.location,
          "degree": x.value.degree,
          "duration": this.calcDuration(x.value.startDate, x.value.endDate)
        }
       )
    })
    console.log(JSON.stringify(this.requestBody))
  }
  experienceFormNext(){
    this.experienceForm.forEach(x=>{
      this.requestBody.experiences.push(
        {
          "role": x.value.role,
          "company": x.value.company,
          "location": x.value.location,
          "duration": this.calcDuration(x.value.startDate, x.value.endDate),
          "description": x.value.description
        }
      )
    })
    console.log(JSON.stringify(this.requestBody))
  }
  skillFormNext(){
    this.skillForm.forEach(x=>{
      this.requestBody.skills.push(x.value)
    })
    console.log(JSON.stringify(this.requestBody))
  }
  projectFormNext(){
    this.projectForm.forEach(x=>{
      this.requestBody.projects.push(
        {
          "name": x.value.name,
          "duration": this.calcDuration(x.value.startDate, x.value.endDate),
          "description": x.value.description
        }
      )
    })
    console.log(JSON.stringify(this.requestBody))
  }
  achievementFormNext(){
    this.achievementForm.forEach(x=>{
      this.requestBody.achievements.push(x.value)
    })
    console.log(JSON.stringify(this.requestBody))
  }
  profileLinkFormNext(){
    this.profileLinkForm.forEach(x=>{
      this.requestBody.profile_links.push(x.value)
    })
    console.log(JSON.stringify(this.requestBody))
  }

  // method to convert two dates into mmm yyyy - mmm yyyy format
  calcDuration(x: any, y: any): string{
    console.log(this.formatDate(x))
    return this.formatDate(x)+" - "+this.formatDate(y)
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MMM yyyy')!;
  }

  // getting, adding and removing exp description

  getExperienceDescription(i: number): any {
    return this.experienceForm[i].controls["description"] as FormArray
  }

  addExperienceDescription(i: number){
    const experienceDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>this.experienceForm[i].get("description")).push(experienceDescriptionFormControl);
    console.log(this.getExperienceDescription(i).length)
    this.getExperienceDescription(i).length > 1 ? this.canDeleteExpDesc = true : this.canDeleteExpDesc = false
  }

  removeExperienceDescription(i: number, j: number){
    this.getExperienceDescription(i).removeAt(j)
    this.getExperienceDescription(i).length > 1 ? this.canDeleteExpDesc = true : this.canDeleteExpDesc = false
  }

  // getting, adding and removing prjct description

  getProjectDescription(i: number): any {
    return this.projectForm[i].controls["description"] as FormArray
  }

  addProjectDescription(i: number){
    const projectDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>this.projectForm[i].get("description")).push(projectDescriptionFormControl);
    console.log(this.getProjectDescription(i).length)
    this.getProjectDescription(i).length > 1 ? this.canDeletePrjctDesc = true : this.canDeletePrjctDesc = false
  }

  removeProjectDescription(i: number, j: number){
    this.getProjectDescription(i).removeAt(j)
    this.getProjectDescription(i).length > 1 ? this.canDeletePrjctDesc = true : this.canDeletePrjctDesc = false
  }

  // getting, adding and removing prjct description

  getAchievementDescription(i: number): any {
    return this.achievementForm[i].controls["description"] as FormArray
  }

  addAchievementDescription(i: number){
    const achievementDescriptionFormControl = new FormControl(null, Validators.required);
    (<FormArray>this.achievementForm[i].get("description")).push(achievementDescriptionFormControl);
    console.log(this.getAchievementDescription(i).length)
    this.getAchievementDescription(i).length > 1 ? this.canDeleteAchvDesc = true : this.canDeleteAchvDesc = false
  }

  removeAchievementDescription(i: number, j: number){
    this.getAchievementDescription(i).removeAt(j)
    this.getAchievementDescription(i).length > 1 ? this.canDeleteAchvDesc = true : this.canDeleteAchvDesc = false
  }

  seePreview(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('https://splashchemicals.in/check/api/resumes/generate-pdf/', this.requestBody, { headers, responseType: 'blob' as 'json' }).subscribe(
      (response) => {
        const file = new Blob([response], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL, '_blank');
      },
      (error) => {
        console.error('Error occurred:', error);
      }
    );
  }
  
}
