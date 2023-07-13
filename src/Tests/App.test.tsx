// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from './App';

// describe('App', () => {
//   it('renders the search bar', () => {
//     render(<App />);

//     const searchBar = screen.getByPlaceholderText('Search cities...');
//     expect(searchBar).toBeInTheDocument();
//   });

//   it('displays city suggestions when typing in the search bar', () => {
//     render(<App />);

//     const searchBar = screen.getByPlaceholderText('Search cities...');

//     userEvent.type(searchBar, 'New York');
//     const suggestionItem = screen.getByText('New York, USA');
//     expect(suggestionItem).toBeInTheDocument();
//   });

//   it('selects a city when clicking on a suggestion', () => {
//     render(<App />);

//     const searchBar = screen.getByPlaceholderText('Search cities...');

//     userEvent.type(searchBar, 'Paris');
//     const suggestionItem = screen.getByText('Paris, France');
//     userEvent.click(suggestionItem);

//     const selectedCity = screen.getByText('Selected City: Paris, France');
//     expect(selectedCity).toBeInTheDocument();
//   });
// });
