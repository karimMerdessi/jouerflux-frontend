import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesForm } from './rules-form';

describe('RulesForm', () => {
  let component: RulesForm;
  let fixture: ComponentFixture<RulesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RulesForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
