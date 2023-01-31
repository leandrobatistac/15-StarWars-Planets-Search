import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { act } from 'react-dom/test-utils';
import APIProvider from '../context/APIprovider';
import planets from './mock'

describe('App', () => {
  beforeEach(async() => { 
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(planets)
    }); 
  }); 

  it('Testa a caixa para pesquisas na página', async () => {
    await act(() => render(<App />));
    const data = await screen.getAllByTestId('name-filter');
    expect(data.length).toBe(1);
  })

  it('Testa o radio button', async () => {
    await act(() => render(<App />));
    const radioButton = await screen.getByTestId('column-sort-input-asc');
    const botaoFiltro = await screen.getByTestId('column-sort-button');
    userEvent.click(radioButton)
    userEvent.click(botaoFiltro)
  })
});
