import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegistrationService]
    });

    service = TestBed.inject(RegistrationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle successful registration', (done) => {
    const fullName = 'John Doe';
    const phone = '+123456789';
    const password = 'password';

    const expectedUserId = 1;

    service.registration(fullName, phone, password).then((result) => {
      expect(result.get(200)).toBe(expectedUserId);
      done();
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/accounts/registry?full_name=${fullName}&phone=${encodeURIComponent(phone)}&password=${password}`);
    expect(req.request.method).toBe('POST');

    req.flush({ id: expectedUserId, full_name: fullName, phone, role: { id: 1 }, speciality_id: null });
  });
});
