import React from 'react';
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { BrowserRouter } from 'react-router-dom';
import { AlertContextProvider } from '../AlertContext';
import ActionEntity from '../ActionEntity';
import { VESSELS_URL, VOYAGE_REPORT_URL, VOYAGE_STATUSES } from '../../constants/ApiConstants';

let mockApiHook = jest.fn();
const mockHistoryReplace = jest.fn();
const mockHistoryGoBack = jest.fn();

// Mocking params
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    entityId: '1a2b3c',
  }),
  useHistory: () => ({
    replace: mockHistoryReplace,
    goBack: mockHistoryGoBack,
  }),
}));

// Mocking AlertContext
const renderPage = (props = {
  title: 'Success',
  heading: 'Pleasure craft successfully deleted.',
  entity: 'pleasure craft',
  baseURL: VESSELS_URL,
  redirectURL: '/pleasure-crafts',
  apiHook: mockApiHook,
  action: 'Delete',
}, alertContext = null, setAlertContext = jest.fn()) => {
  return render(
    <BrowserRouter>
      <AlertContextProvider value={{ alertContext, setAlertContext }}>
        <ActionEntity notification={props} />
      </AlertContextProvider>
    </BrowserRouter>,
  );
};

describe('ActionEntity', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render page and elements correctly', () => {
    renderPage();

    expect(screen.getByText('Are you sure you want to delete this pleasure craft?')).toBeInTheDocument();
    expect(screen.getByText('Continue')).toBeInTheDocument();
  });

  it('should redirect when user click no on deletion confirmation', () => {
    renderPage();

    fireEvent.click(screen.getByTestId('confirm-no'));
    fireEvent.click(screen.getByText('Continue'));

    expect(mockHistoryReplace).toHaveBeenCalled();
    expect(mockHistoryReplace).toBeCalledWith('/pleasure-crafts');
  });

  it('should go back when user clicks back', () => {
    renderPage();

    fireEvent.click(screen.getByText('Back'));

    expect(mockHistoryGoBack).toHaveBeenCalled();
  });

  it('should invoke delete function on submit', async () => {
    renderPage();

    fireEvent.click(screen.getByTestId('confirm-yes'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(mockApiHook).toHaveBeenCalled();
      expect(mockApiHook).toHaveBeenCalledWith(`${VESSELS_URL}/1a2b3c`);
    });
  });

  it('should handle errors correctly', async () => {
    mockApiHook = jest.fn().mockImplementation(() => {
      throw Object.assign(
        new Error('Error'),
        { response: 'Foo' },
      );
    });

    renderPage();

    fireEvent.click(screen.getByTestId('confirm-yes'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(screen.getByText('Cannot delete this pleasure craft right now, try again later')).toBeInTheDocument();
    });
  });

  it('should handle cancelling voyage report', async () => {
    renderPage({
      title: 'Success',
      heading: 'Voyage plan successfully cancelled.',
      entity: 'voyage plan',
      baseURL: VOYAGE_REPORT_URL,
      redirectURL: '/voyage-plans',
      apiHook: mockApiHook,
      apiHookConfig: [{ status: VOYAGE_STATUSES.PRE_CANCELLED }],
      action: 'Cancel',
    });

    fireEvent.click(screen.getByTestId('confirm-yes'));
    fireEvent.click(screen.getByText('Continue'));

    await waitFor(() => {
      expect(mockApiHook).toHaveBeenCalledWith(`${VOYAGE_REPORT_URL}/1a2b3c`, { status: VOYAGE_STATUSES.PRE_CANCELLED });
    });
  });
});
