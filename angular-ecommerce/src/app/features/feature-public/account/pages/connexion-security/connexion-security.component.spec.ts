import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionSecurityComponent } from './connexion-security.component';

describe('ConnexionSecurityComponent', () => {
  let component: ConnexionSecurityComponent;
  let fixture: ComponentFixture<ConnexionSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnexionSecurityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
