import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomProfileForm } from './custom-profile-form';

describe('CustomProfileForm', () => {
  let component: CustomProfileForm;
  let fixture: ComponentFixture<CustomProfileForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomProfileForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomProfileForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
