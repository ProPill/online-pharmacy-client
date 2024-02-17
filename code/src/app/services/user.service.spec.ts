import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';

// it:
// Это функция Jasmine, которая используется для определения тестового случая или спецификации.
// Она принимает два аргумента: строку, описывающую, что должен делать тест, и функцию, содержащую код теста.

// expect:
// Это функция Jasmine, которая используется для определения ожидаемого поведения в тесте.
// Она принимает фактическое значение (обычно результат выполнения определенной функции или операции)
// и возвращает объект, который позволяет определить ожидаемое поведение.

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  // 1.1 Тест проверяет, что сервис UserService был успешно создан
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // 1.2 Тест проверяет, что начальное значение itemId равно -1
  it('should have initial itemId as -1', () => {
    service.itemIdObservable.subscribe(itemId => {
      expect(itemId).toBe(-1);
    });
  });

  // 1.3 Тест проверяет, что начальное значение userId равно null
  it('should have initial userId as null', () => {
    service.currentUserId.subscribe(userId => {
      expect(userId).toBeNull();
    });
  });

  // 1.4 Тест проверяет, что начальное значение items является пустым отображением
  it('should have initial items as empty map', () => {
    service.itemsObservable.subscribe(items => {
      expect(items.size).toBe(0);
    });
  });

  // 1.5 Тест проверяет, что метод changeUserId извлекает новый userId из BehaviorSubject - 'currentUserId'
  it('should emit new userId', () => {
    const userId = 1;
    service.changeUserId(userId);
    service.currentUserId.subscribe(newUserId => {
      expect(newUserId).toBe(userId);
    });
  });

  // 1.6 Тест проверяет, что метод changeItemId извлекает новый itemId
  it('should emit new itemId', () => {
    const itemId = 1;
    service.changeItemId(itemId);
    service.itemIdObservable.subscribe(newItemId => {
      expect(newItemId).toBe(itemId);
    });
  });

  // 1.7 Тест проверяет, что метод clearUserId корректно очищает userId
  it('should clear userId', () => {
    service.changeUserId(1);
    service.clearUserId();
    service.currentUserId.subscribe(userId => {
      expect(userId).toBeNull();
    });
  });

  // 1.8 Тест проверяет, что метод changeItem корректно изменяет количество элементов
  it('should change item quantity', () => {
    service.changeItem(1, 5);
    service.itemsObservable.subscribe(items => {
      expect(items.get(1)).toBe(5);
    });
  });

});
