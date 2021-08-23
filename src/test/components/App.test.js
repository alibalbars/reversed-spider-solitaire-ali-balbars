import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});


// import React from 'react';
// import { render } from '@testing-library/react';
// import { ThemeProvider } from 'styled-components';
// import DraggingContextProvider from '../../../contexts/DraggingContext';
// import { theme } from '../../../globalStyles';
// import GameContextProvider from '../../../contexts/GameContext';
// import DeckArea from '.';
// import HintContextProvider from '../../../contexts/HintContext';

// describe('DeckArea Components', () => {
//   it('should be render', () => {
//     const { container } = render(
//       <GameContextProvider>
//         <HintContextProvider>
//           <DraggingContextProvider>
//             <ThemeProvider theme={theme}>
//               <DeckArea />
//             </ThemeProvider>
//           </DraggingContextProvider>
//         </HintContextProvider>
//       </GameContextProvider>
//     );

//     expect(container.innerHTML).not.toEqual('');
//   });
// });