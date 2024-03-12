import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform } from '@angular/core';

import { RicercaComponent } from './ricerca.component';

describe('RicercaComponent', () => {
  let component: RicercaComponent;
  let fixture: ComponentFixture<RicercaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RicercaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RicercaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Pipe({ name:'search' })
export class SearchPipe implements PipeTransform {
  transform(recipes: string[], searchInput: string): any[] {
    if (!searchInput) {
      return [];
    }
    searchInput = searchInput.toLowerCase();
    return recipes.filter(
      x => x.toLowerCase().includes(searchInput)
    )
  }
}

