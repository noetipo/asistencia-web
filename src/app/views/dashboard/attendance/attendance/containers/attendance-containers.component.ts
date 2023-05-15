import {Component, OnInit} from '@angular/core';

import {EventService} from "../../../../../providers/services/event/event.service";
import {InstitutionService} from "../../../../../providers/services/setup/institution.service";
import {SubsidiaryService} from "../../../../../providers/services/setup/subsidiary.service";
import {FacultyService} from "../../../../../providers/services/setup/faculty.service";
import {ProfessionalSchoolService} from "../../../../../providers/services/setup/professional-school.service";
import {Institution} from "../../../Setup/person/models/institution";
import {Subsidiary} from "../../../Setup/person/models/subsidiary";
import {Faculty} from "../../../Setup/person/models/faculty";
import {ProfessionalSchool} from "../../../Setup/person/models/professionalSchool";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {abcForms} from 'src/environments/generals';
import {EventDetail} from "../../../event/event/models/eventDetail";
import {Event} from "../../../event/event/models/event";
import {AttendanceService} from "../../../../../providers/services";
import {Attendance} from "../models/attendance";

@Component({
  selector: 'app-attendance-container',
  template: `
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active"><i class="{{ abcForms.btnNew.icon }}"></i> Nuevo Evento</a>
        </li>
      </ul>
      <form [formGroup]="attendanceForm" class="row mt-2 d-flex justify-content-start align-items-center ">


        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Institucion. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="institucionId"
                    id="institucionId">
              <option value=0>Selecciona Institucion</option>
              <option *ngFor="let l of institutions" [value]="l.id">
                {{l.descripcion}}
              </option>
            </select>
          </div>
        </div>

        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Filial. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="filialId"
                    id="filialId">
              <option value=0>Selecciona Filial</option>
              <option *ngFor="let l of subsidiarys" [value]="l.id">
                {{l.descripcion}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Facultad. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="facultadId"
                    id="facultadId">
              <option value=0>Selecciona Facultad</option>
              <option *ngFor="let l of facultys" [value]="l.id">
                {{l.descripcion}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Escuela Profesional. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="escuelaProfesionalId"
                    id="escuelaProfesionalId">
              <option value=0>Seleccione Escuela Profesinal</option>
              <option *ngFor="let l of profesionalSchools" [value]="l.id">
                {{l.descripcion}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Evento. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="evento"
                    id="evento">
              <option value=0>Seleccione Evento</option>
              <option *ngFor="let l of events" [ngValue]="l">
                {{l.nombre}}
              </option>
            </select>
          </div>
        </div>
        <div class="form-group col-md-3 ">
          <div class="input-group input-group-sm input-group-rounded row mx-auto">
            <label class="col-form-label"><b>Actividades. </b> </label>
            <select class="form-control form-select form-control-sm" formControlName="eventoDetalleId"
                    id="eventoDetalleId">
              <option value=0>Seleccione Evento</option>
              <option *ngFor="let l of eventDetails" [value]="l.id">
                {{l.nombre}}  {{l.fecha}}
              </option>
            </select>
          </div>
        </div>
      </form>
    </div>
    <div class="responsive-table">
      <table class="table table-lg table-hover table-striped table-sm">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Apellidos y nombres</th>
          <th scope="col">DNI</th>
          <th scope="col">Codigo</th>
          <th scope="col">Ciclo</th>
          <th scope="col">Grupo</th>
          <th scope="col">Ingreso</th>
          <th scope="col">Salida</th>
        </tr>
        </thead>
        <tbody class="table-group-divider">
        <tr *ngFor="let v of attendances ; let i=index">
          <th scope="row">{{i + 1}}</th>
          <td data-title="Apellidos y nombres">{{v.nombres}}</td>
          <td data-title="DNI">{{v.dni}}</td>
          <td data-title="Codigo">{{v.codigo}}</td>
          <td data-title="Ciclo">{{v.ciclo}}</td>
          <td data-title="Grupo">{{v.grupo}}</td>
          <td data-title="Ingreso">{{v.fecha_entrada}}</td>
          <td data-title="Salida">{{v.fecha_salida}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="attendanceForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})

export class AttendanceContainersComponent implements OnInit {
  abcForms: any;
  public error: string = '';
  public institutions: Institution[] = [];
  public subsidiarys: Subsidiary[] = [];
  public facultys: Faculty[] = [];
  public profesionalSchools: ProfessionalSchool[] = [];
  public events: Event[] = [];
  public event = new Event();
  public eventDetails: EventDetail[] = [];
  public attendances: Attendance[] = [];

  attendanceForm = new FormGroup({
    institucionId: new FormControl(0, [Validators.required]),
    filialId: new FormControl(0, [Validators.required]),
    facultadId: new FormControl(0, [Validators.required]),
    escuelaProfesionalId: new FormControl(0, [Validators.required]),
    evento: new FormControl(Event),
    eventoDetalleId: new FormControl(0),
  });

  constructor(
    private eventService: EventService,
    private attendanceService: AttendanceService,
    private institutionService: InstitutionService,
    private subsidiaryService: SubsidiaryService,
    private facultyService: FacultyService,
    private professionalSchoolService: ProfessionalSchoolService,
  ) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getInstitutions();
    this.attendanceForm.controls['institucionId'].valueChanges.subscribe(val => {
      this.getSubsidiarys(val!);
    });
    this.attendanceForm.controls['filialId'].valueChanges.subscribe(val => {
      this.getFacultys(val!);
    });
    this.attendanceForm.controls['facultadId'].valueChanges.subscribe(val => {
      this.getProssionalSchool(val!);
    });
    this.attendanceForm.controls['escuelaProfesionalId'].valueChanges.subscribe(val => {
      this.getEvents(val!);
    });
    this.attendanceForm.controls['evento'].valueChanges.subscribe(val => {
      // @ts-ignore
      this.event = val!;
      console.log(this.event);
      this.eventDetails = this.event?.eventoDetalles!;
    });
    this.attendanceForm.controls['eventoDetalleId'].valueChanges.subscribe(val => {
      this.getAttendance(val!);

    });


  }

  public getInstitutions(params?: Object): void {
    this.institutionService.getWithQuery$(params).subscribe(response => {
      this.institutions = response;
    }, error => {
      this.error = error;
    });
  }

  public getSubsidiarys(idInstitution: number): void {
    this.subsidiaryService.getByInstitutionId$(idInstitution).subscribe(response => {
      this.subsidiarys = response;
    }, error => {
      this.error = error;
    });
  }

  public getFacultys(idSubsidiary: number): void {
    this.facultyService.getBySubsidiaryId$(idSubsidiary).subscribe(response => {
      this.facultys = response;
    }, error => {
      this.error = error;
    });
  }


  public getProssionalSchool(idFaculty: number): void {
    this.professionalSchoolService.getByFacultyId$(idFaculty).subscribe(response => {
      this.profesionalSchools = response;
    }, error => {
      this.error = error;
    });
  }

  public getEvents(id: number): void {
    this.eventService.getByProfessionalScholl$(id).subscribe(response => {
      console.log(response);
      this.events = response;
    }, error => {
      this.error = error;
    });
  }

  public getAttendance(id: number): void {
    this.attendanceService.getForReport$(id).subscribe(response => {
      this.attendances = response;
    }, error => {
      this.error = error;
    });
  }

  public saveForm(): void {
    console.log(this.attendanceForm.value);
  }
}
