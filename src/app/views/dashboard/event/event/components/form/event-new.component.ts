import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {abcForms, typesReceta} from 'src/environments/generals';
import {PeriodService} from "../../../../../../providers/services";
import {ConfirmDialogService} from "../../../../../../shared";
import {ActivatedRoute, Router} from "@angular/router";
import {Institution} from "../../../../Setup/person/models/institution";
import {Subsidiary} from "../../../../Setup/person/models/subsidiary";
import {Faculty} from "../../../../Setup/person/models/faculty";
import {ProfessionalSchool} from "../../../../Setup/person/models/professionalSchool";
import {InstitutionService} from "../../../../../../providers/services/setup/institution.service";
import {SubsidiaryService} from "../../../../../../providers/services/setup/subsidiary.service";
import {FacultyService} from "../../../../../../providers/services/setup/faculty.service";
import {ProfessionalSchoolService} from "../../../../../../providers/services/setup/professional-school.service";
import {EventService} from "../../../../../../providers/services/event/event.service";

@Component({
  selector: 'app-event-new',
  template: `
    <button type="button" class="close btn-gm-return mb-2" aria-label="Close" (click)="cancelForm()">
      <span class="{{ abcForms.btnReturn.icon }}"></span> Regresar
    </button>
    <div>
      <ul class="nav nav-tabs">
        <li class="nav-item">
          <a class="nav-link active"><i class="{{ abcForms.btnNew.icon }}"></i> Nuevo Evento</a>
        </li>
      </ul>
      <form [formGroup]="eventForm" class="row mt-2 d-flex justify-content-start align-items-center ">


        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b>Evento. </b></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="text" class="form-control form-control-sm" formControlName="nombre"
                   id="nombre"
                   placeholder="Evento ...">
          </div>
          <app-form-validate-errors [group]="eventForm"
                                    [controlName]="'nombre'"></app-form-validate-errors>
        </div>
        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b>Descripción. </b></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="text" class="form-control form-control-sm" formControlName="descripcion"
                   id="descripcion"
                   placeholder="2023">
          </div>
          <app-form-validate-errors [group]="eventForm"
                                    [controlName]="'descripcion'"></app-form-validate-errors>
        </div>
        <div class="form-group col-md-2 required">
          <div class="input-group input-group-sm">
            <label class="col-form-label"><b>Tolerancia. </b></label>
          </div>
          <div class="input-group input-group-sm input-group-rounded">
            <input type="text" class="form-control form-control-sm" formControlName="tolerancia"
                   id="tolerancia"
                   placeholder="10">
          </div>
          <app-form-validate-errors [group]="eventForm"
                                    [controlName]="'tolerancia'"></app-form-validate-errors>
        </div>
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
        <div class="form-group col-md-2">
          <div class="input-group input-group-sm input-group-rounded">
            <div class="input-group input-group-sm">
              <label class="col-form-label"><b>Estado.</b></label>
            </div>
            <div class="custom-control custom-checkbox d-flex align-items-center">
              <input type="checkbox" class="custom-control-input" id="estado"
                     formControlName="estado">
              <label class="custom-control-label todo-label badge-gm" for="estado">
                            <span
                              class="badge text-bg-{{eventForm.value.estado ?'success': 'danger'}} text-white">
                            {{eventForm.value.estado ? 'ACTIVO' : 'INACTIVO'}}</span>
              </label>
            </div>
          </div>
        </div>

      </form>
      <hr>
    </div>
    <div>
      <div class="mt-4 d-flex justify-content-end">
        <button type="button" class="btn {{ abcForms.btnCancel.class }} btn-sm" (click)="cancelForm()">
          <span class="{{ abcForms.btnCancel.icon }} lamb-icon"></span> {{ abcForms.btnCancel.label }}
        </button>
        <button type="button" class="btn {{ abcForms.btnSave.class }} btn-sm" (click)="saveForm()"
                [disabled]="eventForm.invalid">
          <span class="{{ abcForms.btnSave.icon }} lamb-icon"></span> {{ abcForms.btnSave.label }}
        </button>
      </div>
    </div>
  `
})
export class EventNewComponent implements OnInit {
  //@Input() title: string = '';
  abcForms: any;
  public error: string = '';
  public institutions: Institution[] = [];
  public subsidiarys: Subsidiary[] = [];
  public facultys: Faculty[] = [];
  public profesionalSchools: ProfessionalSchool[] = [];
  eventForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    tolerancia: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    estado: new FormControl(true, [Validators.required]),
    institucionId: new FormControl(0, [Validators.required]),
    filialId: new FormControl(0, [Validators.required]),
    facultadId: new FormControl(0, [Validators.required]),
    escuelaProfesionalId: new FormControl(0, [Validators.required]),
    eventoDetalles: new FormControl([[]]),
    matriculas: new FormControl([[]]),
  });


  constructor(
    private eventService: EventService,
    private institutionService: InstitutionService,
              private subsidiaryService: SubsidiaryService,
              private facultyService: FacultyService,
              private professionalSchoolService: ProfessionalSchoolService,
              private confirmDialogService: ConfirmDialogService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.abcForms = abcForms;
    this.getInstitutions();

    this.eventForm.controls['institucionId'].valueChanges.subscribe(val => {
      this.getSubsidiarys(val!);
    });
    this.eventForm.controls['filialId'].valueChanges.subscribe(val => {
      this.getFacultys(val!);
    });
    this.eventForm.controls['facultadId'].valueChanges.subscribe(val => {
      this.getProssionalSchool(val!);
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

  public saveForm(): void {
    if (this.eventForm.valid) {
      // @ts-ignore
      this.confirmDialogService.confirmSave().then(() => {
        this.eventService.add$(this.eventForm.value).subscribe(response => {
          this.router.navigate(['../'], {relativeTo: this.route});
        }, error => {
          this.error = error;
        });
      }).catch(() => {
      });
    }
  }

  public cancelForm(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
