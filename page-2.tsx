import * as React from 'react';
import { Nav } from './nav';

export function Page2() {
  return (
    <div>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <h1 style={{ color: 'white' }}>Page 2</h1>
      </div>
    </div>
  );
}
