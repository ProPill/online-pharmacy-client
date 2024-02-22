import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoginService],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should handle successful login', (done) => {
    const username = '+123456789';
    const password = 'password';

    service.login(username, password).then((result) => {
      expect(result.get(200)).toBe(1);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/accounts/login?phone=%2B123456789&password=${password}`);
    req.flush({ id: 1, role: { id: 1 }});
  });

  it('should handle unsuccessful login', (done) => {
    const username = '+123456789';
    const password = 'invalidPassword';

    service.login(username, password).then((result) => {
      expect(result.get(400)).toBe(0); // Expecting the code for unsuccessful login
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/accounts/login?phone=%2B123456789&password=${password}`);
    req.flush(null, { status: 400, statusText: 'Bad Request' });
  });
});
