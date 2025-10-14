import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallDetail } from './firewall-detail';

describe('FirewallDetail', () => {
  let component: FirewallDetail;
  let fixture: ComponentFixture<FirewallDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirewallDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
