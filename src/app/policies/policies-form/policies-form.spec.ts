import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliciesForm } from './policies-form';

describe('PoliciesForm', () => {
  let component: PoliciesForm;
  let fixture: ComponentFixture<PoliciesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliciesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliciesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
