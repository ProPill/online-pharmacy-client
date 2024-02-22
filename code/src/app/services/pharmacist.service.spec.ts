import { PharmacistService } from './pharmacist.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('PharmacistService', () => {
  let service: PharmacistService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PharmacistService]
    });
    service = TestBed.inject(PharmacistService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all specializations', async () => {
    const mockSpecializations = [
      { id: 1, name: 'Specialization 1' },
      { id: 2, name: 'Specialization 2' }
    ];

    const promise = service.getAllSpecializations();

    const req = httpTestingController.expectOne('http://localhost:8080/api/speciality/all');
    expect(req.request.method).toEqual('GET');
    req.flush(mockSpecializations);

    const specialities = await promise;
    expect(specialities.size).toBe(2);
    expect(specialities.get(1)).toBe('Specialization 1');
    expect(specialities.get(2)).toBe('Specialization 2');
  });
});
