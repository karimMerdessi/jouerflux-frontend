import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesList } from './policies-list';

describe('PoliciesList', () => {
  let component: PoliciesList;
  let fixture: ComponentFixture<PoliciesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliciesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
