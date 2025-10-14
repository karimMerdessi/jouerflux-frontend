import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallForm } from './firewall-form';

describe('FirewallForm', () => {
  let component: FirewallForm;
  let fixture: ComponentFixture<FirewallForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirewallForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
