import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTrainingDialogComponent } from './stop-training-dialog.component';

describe('StopTrainingDialogComponent', () => {
  let component: StopTrainingDialogComponent;
  let fixture: ComponentFixture<StopTrainingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopTrainingDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopTrainingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
