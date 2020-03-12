import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TycPage } from './tyc.page';

describe('TycPage', () => {
  let component: TycPage;
  let fixture: ComponentFixture<TycPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TycPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TycPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
