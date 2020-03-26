import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpChatInfoPage } from './exp-chat-info.page';

describe('ExpChatInfoPage', () => {
  let component: ExpChatInfoPage;
  let fixture: ComponentFixture<ExpChatInfoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpChatInfoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpChatInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
