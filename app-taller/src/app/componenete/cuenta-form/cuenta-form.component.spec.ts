import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaFormComponent } from './cuenta-form.component';

describe('CuentaFormComponent', () => {
  let component: CuentaFormComponent;
  let fixture: ComponentFixture<CuentaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
