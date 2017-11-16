import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {TraceReporter} from '../../TraceReporter/TraceReporter';
import {trace} from '../../TraceReporter/trace';

jasmine.getEnv().addReporter(new TraceReporter());

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
  trace('PROJECT-123', it('should create the app', async(() => {
    fail();
  })));
  trace(['PROJECT-123', 'PROJECT-122'], it(`should have as title 'app'`, async(() => {
    return;
  })));
  trace('PROJECT-122', it('should render title in a h1 tag', async(() => {
    return;
  })));
});
