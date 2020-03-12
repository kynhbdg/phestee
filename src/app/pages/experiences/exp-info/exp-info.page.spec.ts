import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpInfoPage } from './exp-info.page';

describe('ExpInfoPage', () => {
  let component: ExpInfoPage;
  let fixture: ComponentFixture<ExpInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
