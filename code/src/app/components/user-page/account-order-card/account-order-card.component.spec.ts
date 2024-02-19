import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../../../services/user.service';
import { AccountOrderCardComponent } from './account-order-card.component';
import { IOrder } from '../../../models/order';
import {orders} from "../../../data/orders";

describe('AccountOrderCardComponent', () => {
    let component: AccountOrderCardComponent;
    let fixture: ComponentFixture<AccountOrderCardComponent>;

    const userServiceMock = {
        currentUserId: jasmine.createSpy('currentUserId').and.returnValue(123),
    };

    const orderMock: IOrder = orders[0]

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountOrderCardComponent],
            imports: [RouterTestingModule],
            providers: [{ provide: UserService, useValue: userServiceMock }],
        });

        fixture = TestBed.createComponent(AccountOrderCardComponent);
        component = fixture.componentInstance;
        component.order = orderMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set userId from UserService', () => {
        expect(component['userId']).toEqual(123);
    });
});
