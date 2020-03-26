import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExpChatPage } from './exp-chat.page';

describe('ExpChatPage', () => {
  let component: ExpChatPage;
  let fixture: ComponentFixture<ExpChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExpChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
