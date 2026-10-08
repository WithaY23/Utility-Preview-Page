import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
import { expect } from '@jest/globals';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);