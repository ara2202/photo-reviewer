import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import { render, screen, within, waitFor} from './test-utils'
import userEvent from '@testing-library/user-event'
import App from './App'
import { randomResponseMock } from './api/randomResponse.mock';
import { Photo } from './api/types'

export const handlers = [
  rest.get('https://api.unsplash.com/photos/random', (req, res, ctx) => res(ctx.json(randomResponseMock), ctx.delay(150)))
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

/**
 * an example of integration tests
 */

test('initial App state', () => {
  render(<App />)
  
  expect(screen.getByRole('heading', {name: 'image approval application'})).toBeInTheDocument()
  expect(screen.getByRole('heading', {name: 'approved images (0)'})).toBeInTheDocument()

  expect(screen.getByRole('figure')).toBeInTheDocument();
  
  const $approveButton = screen.getByRole('button', {name: 'check Approve'}); // this antd names is weird...
  expect($approveButton).toBeDisabled();

  const $loadMoreButton =  screen.getByRole('button', {name: 'reload Load another'});
  expect($loadMoreButton).toBeEnabled();

  const $rejectButton = screen.getByRole('button', {name: 'close Reject'});
  expect($rejectButton).toBeDisabled();
})

test('fetch random image and approval logic', async () => {
  render(<App />)
  
  const $loadMoreButton =  screen.getByRole('button', {name: 'reload Load another'});
  
  userEvent.click($loadMoreButton);
  expect(screen.getByTestId('antd-spinner')).toBeInTheDocument();
  expect($loadMoreButton).toBeDisabled();
  
  const $figure = screen.getByRole('figure');
  const $randomImg = await within($figure).findByAltText('alt_desc');
  expect($randomImg).toHaveAttribute('src', 'regular_url');

  const $approveButton = screen.getByRole('button', {name: 'check Approve'});
  const $rejectButton = screen.getByRole('button', {name: 'close Reject'});

  expect($approveButton).toBeEnabled();
  expect($rejectButton).toBeEnabled();
  
  userEvent.click($approveButton);

  expect(screen.getByRole('heading', {name: 'approved images (1)'})).toBeInTheDocument();
  const $approvedImgsContainer = screen.getByRole('list');
  const $approvedImgs = within($approvedImgsContainer).getAllByRole('listitem');
  expect($approvedImgs).toHaveLength(1);

  expect($approveButton).toBeDisabled();
  expect($rejectButton).toBeDisabled();
})

test('fetch random image and rejection logic', async () => {
  render(<App />)
  
  const $loadMoreButton =  screen.getByRole('button', {name: 'reload Load another'});
  
  userEvent.click($loadMoreButton);
  
  const $rejectButton = screen.getByRole('button', {name: 'close Reject'});
  await waitFor(() => expect($rejectButton).toBeEnabled());
  
  server.use(
    rest.get('https://api.unsplash.com/photos/random', (req, res, ctx) => res(ctx.json<Photo>({...randomResponseMock, id: 'id2', urls: {...randomResponseMock.urls, regular: 'regular_new_url'}})))
  )
  userEvent.click($rejectButton);
  
  const $figure = screen.getByRole('figure');
  const $randomImg = await within($figure).findByAltText('alt_desc');
  expect($randomImg).toHaveAttribute('src', 'regular_new_url');
    
})