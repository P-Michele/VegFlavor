import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchComponent } from './research.component';

describe('RicercaComponent', () => {
  let component: ResearchComponent;
  let fixture: ComponentFixture<ResearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

