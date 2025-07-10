import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dungeons } from './dungeons';

describe('Dungeons', () => {
  let component: Dungeons;
  let fixture: ComponentFixture<Dungeons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Dungeons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dungeons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
