import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveProfile } from './reactive-profile';

describe('ReactiveProfile', () => {
  let component: ReactiveProfile;
  let fixture: ComponentFixture<ReactiveProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
