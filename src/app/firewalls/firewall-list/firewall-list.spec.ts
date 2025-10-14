import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirewallList } from './firewall-list';

describe('FirewallList', () => {
  let component: FirewallList;
  let fixture: ComponentFixture<FirewallList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FirewallList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FirewallList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
