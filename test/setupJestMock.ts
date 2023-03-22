jest.mock('../src/services/google/initFirebase', () => ({
  initFirebase: jest.fn(() => ({
    storage: jest.fn(() => ({ bucket: jest.fn() })),
    firestore: jest.fn(() => ({ collection: jest.fn() })),
  })),
}));
