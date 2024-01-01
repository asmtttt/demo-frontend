import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdiverLayoutComponent } from './prodiver-layout.component';

describe('ProdiverLayoutComponent', () => {
  let component: ProdiverLayoutComponent;
  let fixture: ComponentFixture<ProdiverLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdiverLayoutComponent]
    });
    fixture = TestBed.createComponent(ProdiverLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
