import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageTabComponent } from './language-tab.component';

describe('LanguageTabComponent', () => {
  let component: LanguageTabComponent;
  let fixture: ComponentFixture<LanguageTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LanguageTabComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LanguageTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
