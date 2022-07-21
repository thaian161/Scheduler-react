/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from 'react';

/*
  We import our helper functions from the react-testing-library
  The render function allows us to render Components
*/
import { render } from '@testing-library/react';

/*
  We import the component that we are testing
*/
import Application from 'components/Application';

import {
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByPlaceholderText,
  getByAltText,
  queryByText,
  queryByAltText,
  getByDisplayValue,
} from '@testing-library/react';

/* somewhere near the top */
import axios from 'axios';

/*
  A test that renders a React Component
*/

//testing to see if this file works
describe('Application', () => {
  it('renders without crashing', () => {
    render(<Application />);
  });

  //PROMISE base
  it('defaults to Monday and changes the schedule when a new day is selected', () => {
    const { getByText } = render(<Application />);

    return waitForElement(() => getByText('Monday')).then(() => {
      fireEvent.click(getByText('Tuesday'));
      expect(getByText('Leopold Silvers')).toBeInTheDocument();
    });
  });

  //USING ASYNC AWAIT instead of PROMISE
  it('changes the schedule when a new day is selected', async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText('Monday'));

    fireEvent.click(getByText('Tuesday'));

    expect(getByText('Leopold Silvers')).toBeInTheDocument();
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('loads data, books an interview and reduces the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointments = getAllByTestId(container, 'appointment');
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, 'Add'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });

    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, 'no spots remaining')).toBeInTheDocument();
  });

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, 'Archie Cohen'));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    // 4. Check that the confirmation message is shown.
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, 'Confirm'));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    await waitForElement(() => getByAltText(appointment, 'Add'));

    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, '2 spots remaining')).toBeInTheDocument();
  });

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('loads data, edits an interview and keeps the spots remaining for Monday the same', async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(getByAltText(appointment, 'Edit'));

    expect(getByDisplayValue(appointment, 'Archie Cohen'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Ann' },
    });

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, 'Ann'));

    const day = getAllByTestId(container, 'day').find((day) =>
      queryByText(day, 'Monday')
    );

    expect(getByText(day, '1 spot remaining')).toBeInTheDocument();
  });
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  it('shows the save error when failing to save an appointment', async () => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Edit'));

    expect(getByDisplayValue(appointment, 'Archie Cohen'));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Ann' },
    });

    fireEvent.click(getByText(appointment, 'Save'));

    expect(getByText(appointment, 'SAVING')).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, 'Your appointment cannot be saved')
    );

    expect(
      getByText(appointment, 'Your appointment cannot be saved')
    ).toBeInTheDocument();
  });

  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  it('shows the delete error when failing to delete an existing appointment', async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, 'Archie Cohen'));

    const appointment = getAllByTestId(container, 'appointment').find(
      (appointment) => queryByText(appointment, 'Archie Cohen')
    );

    fireEvent.click(queryByAltText(appointment, 'Delete'));

    fireEvent.click(getByText(appointment, 'Confirm'));

    expect(getByText(appointment, 'DELETING')).toBeInTheDocument();

    await waitForElement(() =>
      getByText(appointment, 'Your appointment cannot be deleted')
    );

    expect(
      getByText(appointment, 'Your appointment cannot be deleted')
    ).toBeInTheDocument();
  });
});
