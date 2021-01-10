import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftDialogComponent } from './shift-dialog.component';

describe('ShiftDialogComponent', () => {
  let component: ShiftDialogComponent;
  let fixture: ComponentFixture<ShiftDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShiftDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
