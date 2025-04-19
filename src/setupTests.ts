// Setup for Vitest tests
// Adds DOM testing utilities for assertions
import '@testing-library/jest-dom';
import { expect } from 'vitest';

// Set up a mock matchMedia function
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
}; 