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

// Mock PointerEvent methods for JSDOM
if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
  window.HTMLElement.prototype.setPointerCapture = window.HTMLElement.prototype.setPointerCapture || function(pointerId) {};
  window.HTMLElement.prototype.releasePointerCapture = window.HTMLElement.prototype.releasePointerCapture || function(pointerId) {};
  // Mock hasPointerCapture to return true after setPointerCapture is called, needed for our component logic
  const originalSetPointerCapture = window.HTMLElement.prototype.setPointerCapture;
  const capturedPointers = new Set();
  window.HTMLElement.prototype.setPointerCapture = function(pointerId) {
    capturedPointers.add(pointerId);
    originalSetPointerCapture.call(this, pointerId);
  };
  const originalReleasePointerCapture = window.HTMLElement.prototype.releasePointerCapture;
  window.HTMLElement.prototype.releasePointerCapture = function(pointerId) {
    capturedPointers.delete(pointerId);
    originalReleasePointerCapture.call(this, pointerId);
  };
  window.HTMLElement.prototype.hasPointerCapture = window.HTMLElement.prototype.hasPointerCapture || function(pointerId) {
    return capturedPointers.has(pointerId);
  };
} 