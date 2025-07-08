import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateProfile } from './template-profile';

describe('TemplateProfile', () => {
  let component: TemplateProfile;
  let fixture: ComponentFixture<TemplateProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplateProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
