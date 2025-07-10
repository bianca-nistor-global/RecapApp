import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlValueAccess } from './control-value-access';

describe('ControlValueAccess', () => {
  let component: ControlValueAccess;
  let fixture: ComponentFixture<ControlValueAccess>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ControlValueAccess]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlValueAccess);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
