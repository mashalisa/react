import { lazy } from 'react';

const Overview = lazy(() => import('./Overview'));
const Transactions = lazy(() => import('./Transactions'));
const Budgets = lazy(() => import('./Budgets'));
const Pots = lazy(() => import('./Pots'));
const RecurringBills = lazy(() => import('./RecurringBills'));

export const menu = [
  {
    id: 'page1',
    label: 'overview',
    path: '/',
    component: Overview,
    isButtonExists: false,
    svg_path: './img/icons/overview.svg'
  },
  {
    id: 'page2',
    label: 'transactions',
    path: '/transactions',
    component: Transactions,
    isButtonExists: false,
    svg_path: './img/icons/transaction.svg'
  },
  {
    id: 'page3',
    label: 'budgets',
    path: '/budgets',
    component: Budgets,
    isButtonExists: true,
    svg_path: './img/icons/budgets.svg'
  },
  {
    id: 'page4',
    label: 'pots',
    path: '/pots',
    component: Pots,
    isButtonExists: true,
    svg_path: './img/icons/pots.svg'
  },
  {
    id: 'page5',
    label: 'recurring bills',
    path: '/recurring-bills',
    component: RecurringBills,
    isButtonExists: false,
    svg_path: './img/icons/bills.svg'
  }
];