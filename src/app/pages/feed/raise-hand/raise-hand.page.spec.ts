import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaiseHandPage } from './raise-hand.page';

describe('RaiseHandPage', () => {
  let component: RaiseHandPage;
  let fixture: ComponentFixture<RaiseHandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseHandPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaiseHandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
