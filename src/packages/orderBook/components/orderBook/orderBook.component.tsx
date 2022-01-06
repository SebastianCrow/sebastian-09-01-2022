import React, { FunctionComponent } from 'react';
import { SpreadHeader } from '../spreadHeader/spreadHeader.component';

// TODO: Replace all the inline styles with Sass

export const OrderBook: FunctionComponent = () => {
  return (
    <>
      <div style={{ backgroundColor: 'red' }} className="desktop">
        <div style={{ backgroundColor: 'green' }}>Order Book</div>
        <div className="desktop">
          <SpreadHeader />
        </div>
      </div>
      <div>
        <div style={{ backgroundColor: 'orange' }} />
        <div className="mobile">
          <SpreadHeader />
        </div>
        <div style={{ backgroundColor: 'orange' }} />
      </div>
    </>
  );
};
