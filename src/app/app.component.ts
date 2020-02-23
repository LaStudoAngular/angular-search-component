import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';

import { Organisation } from './interfaces/organisation';
import { map, startWith } from 'rxjs/operators';
import { OrganisationService } from './services/organisation.service';

@Component({
  selector: 'sr-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public input: FormControl;
  public filteredOrganisations$: Observable<Organisation[]>;

  private filter$: Observable<string>;
  private organisations$: Observable<Organisation[]>;

  constructor(private organisationService: OrganisationService) {}

  public ngOnInit(): void {
    this.input = new FormControl('');
    this.filter$ = this.input.valueChanges.pipe(startWith(''));
    this.organisations$ = this.organisationService.getAllOrganisations();

    this.filteredOrganisations$ = combineLatest(
      this.organisations$,
      this.filter$
    ).pipe(
      map(([organisations, filterString]) =>
        organisations.filter((organisation: Organisation) =>
          organisation.name.toLowerCase().includes(filterString.toLowerCase())
        )
      )
    );
  }
}
