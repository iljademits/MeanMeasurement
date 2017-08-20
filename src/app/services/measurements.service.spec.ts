/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeasurementsService } from './measurements.service';

describe('MeasurementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementsService]
    });
  });

  it('should ...', inject([MeasurementsService], (service: MeasurementsService) => {
    expect(service).toBeTruthy();
  }));
});
