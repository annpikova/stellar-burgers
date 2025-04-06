/// <reference types="cypress" />

const BASE_URL = 'http://localhost:4000';
const API_URL = 'https://norma.nomoreparties.space/api';

const BUN_ID = '[data-cy=643d69a5c3f7b9001cfa093d]';
const FILLING_ID = '[data-cy=643d69a5c3f7b9001cfa0941]';

beforeEach(() => {
  cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('GET', `${API_URL}/orders`, { fixture: 'orders.json' });
  cy.intercept('POST', `${API_URL}/auth/login`, { fixture: 'user.json' });
  cy.visit(BASE_URL);
});

describe('Добавление ингредиентов в бургер', () => {
  it('Добавляет булку', () => {
    cy.get(BUN_ID).find('button').click();
    cy.get(BUN_ID).find('.counter__num').should('contain', '2');
  });

  it('Добавляет начинку', () => {
    cy.get(FILLING_ID).find('button').click();
    cy.get(FILLING_ID).find('.counter__num').should('contain', '1');
  });
});

describe('Модальные окна ингредиента', () => {
  it('Открытие модального окна', () => {
    cy.get('#modals').should('be.empty');
    cy.get(FILLING_ID).find('a').click();
    cy.get('#modals').should('not.be.empty');
    cy.url().should('include', '643d69a5c3f7b9001cfa0941');
  });

  it('Закрытие модалки по крестику', () => {
    cy.get(FILLING_ID).find('a').click();
    cy.get('[data-cy=close-button]').click();
    cy.get('#modals')
      .should('not.be.visible')
      .children('')
      .should('have.length', 0);
  });

  it('Закрытие модалки по клику на оверлей', () => {
    cy.get(FILLING_ID).find('a').click();
    cy.get('body').click(0, 0);
    cy.get('#modals')
      .should('not.be.visible')
      .children('')
      .should('have.length', 0);
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

    cy.get(BUN_ID).find('button').click();
    cy.get(FILLING_ID).find('button').click();

    cy.contains('Оформить заказ').click();
    cy.get('#modals').should('exist');
    cy.wait(2000);
    cy.get('[data-cy=close-button]').click();
    cy.get('#modals')
      .should('not.be.visible')
      .children('')
      .should('have.length', 0);
  });
});
