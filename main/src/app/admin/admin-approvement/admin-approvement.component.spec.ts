import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApprovementComponent } from './admin-approvement.component';

describe('AdminApprovementComponent', () => {
  let component: AdminApprovementComponent;
  let fixture: ComponentFixture<AdminApprovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApprovementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApprovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
