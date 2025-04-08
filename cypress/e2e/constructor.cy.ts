/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';
const API_URL = 'https://norma.nomoreparties.space/api';

const BUN_ID = '[data-cy=643d69a5c3f7b9001cfa093d]';
const FILLING_ID = '[data-cy=643d69a5c3f7b9001cfa0941]';

beforeEach(() => {
  cy.intercept('GET', `${API_URL}/ingredients`, {
    fixture: 'ingredients.json'
  }).as('getIngredients');
  cy.intercept('GET', `${API_URL}/orders`, { fixture: 'orders.json' });
  cy.intercept('POST', `${API_URL}/auth/login`, { fixture: 'user.json' });
  cy.visit(BASE_URL);
});

describe('Добавление ингредиентов в бургер', () => {
  it('Добавляет булку', () => {
    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get(BUN_ID).find('button').click();
    cy.get('[data-cy=constructor-bun-top]').should('exist');
  });

  it('Добавляет начинку', () => {
    cy.get('[data-cy=constructor-filling]').should('not.exist');
    cy.get(FILLING_ID).find('button').click();
    cy.get('[data-cy=constructor-filling]').should('exist');
  });
});

describe('Модальные окна ингредиента', () => {
  it('Открытие модального окна и отображение информации', () => {
    cy.get(FILLING_ID).find('a').click();
    cy.get('#modals').should('exist');

    // Проверка, что заголовок ингредиента отображается
    cy.get('[data-cy=ingredient-name]')
      .should('exist')
      .invoke('text')
      .should('not.be.empty');
  });

  it('Закрытие модалки по крестику', () => {
    cy.get(FILLING_ID).find('a').click();
    cy.get('[data-cy=close-button]').click();

    // Проверка: модалка полностью исчезла (нет дочерних элементов)
    cy.get('#modals').children().should('have.length', 0);
  });

  it('Закрытие модалки по клику на оверлей', () => {
    cy.get(FILLING_ID).find('a').click();
    cy.get('[data-cy=modal-overlay]').click({ force: true });

    // Проверка: модалка закрыта
    cy.get('#modals').children().should('have.length', 0);
  });
});

describe('Оформление заказа (авторизованный пользователь)', () => {
  const user = {
    email: 'david@mail.ru',
    password: '12345678'
  };

  beforeEach(() => {
    localStorage.setItem('refreshToken', 'fake-refresh-token');
    cy.setCookie('accessToken', 'fake-access-token');
    cy.visit(BASE_URL);
  });

  afterEach(() => {
    cy.clearAllCookies();
    cy.clearLocalStorage();
  });

  it('Собирает бургер и оформляет заказ', () => {
    cy.visit(`${BASE_URL}/login`);
    cy.get('input[name=email]').type(user.email);
    cy.get('input[name=password]').type(user.password);
    cy.contains('Войти').click();
    cy.location('pathname').should('eq', '/');

    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get(BUN_ID).find('button').click();
    cy.get('[data-cy=constructor-bun-top]').should('exist');

    cy.get('[data-cy=constructor-filling]').should('not.exist');
    cy.get(FILLING_ID).find('button').click();
    cy.get('[data-cy=constructor-filling]').should('exist');

    cy.contains('Оформить заказ').click();
    cy.get('#modals').should('exist');

    cy.get('[data-cy=order-number]')
      .should('exist')
      .invoke('text')
      .should('match', /^\d+$/); // любое число

    cy.get('[data-cy=close-button]').click();

    cy.get('[data-cy=constructor-bun-top]').should('not.exist');
    cy.get('[data-cy=constructor-filling]').should('not.exist');
  });
});
