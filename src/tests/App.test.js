import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import APIMock from './mock/APImock';
import { act } from 'react-dom/test-utils';
import APIProvider from '../context/APIprovider';

describe('App', () => {
  beforeEach(async() => { 
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(APIMock)
    }); 

    await act(() => {
      render(
        <APIProvider>
        <App />
        </APIProvider>
      )
    })
  }); 

  it('Testa a caixa para pesquisas na página', async () => {
    await act(() => render(<App />));
    const data = await screen.getByTestId('name-filter');
    expect(data).toBeInTheDocument();
  })
});
