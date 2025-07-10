import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bosses } from './bosses';

describe('Bosses', () => {
  let component: Bosses;
  let fixture: ComponentFixture<Bosses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Bosses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Bosses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
