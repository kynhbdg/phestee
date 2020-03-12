import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinessProfilePage } from './business-profile.page';

describe('BusinessProfilePage', () => {
  let component: BusinessProfilePage;
  let fixture: ComponentFixture<BusinessProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
