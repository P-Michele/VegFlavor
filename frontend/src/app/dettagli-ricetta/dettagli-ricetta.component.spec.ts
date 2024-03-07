import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettagliRicettaComponent } from './dettagli-ricetta.component';

describe('DettagliRicettaComponent', () => {
  let component: DettagliRicettaComponent;
  let fixture: ComponentFixture<DettagliRicettaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettagliRicettaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DettagliRicettaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
