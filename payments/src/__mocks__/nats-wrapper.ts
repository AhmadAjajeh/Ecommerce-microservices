export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (_subject: string, _data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};

// we put jest.fn in order to be able to put tests around
// this function ( like whether it was called or not )
// and mockImplementation in order to still has an impl to be
// used by the code .
