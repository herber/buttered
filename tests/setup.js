jest.mock(
    'react',
    () => ({ createElement: jest.fn().mockReturnValue('vnode'), forwardRef: (e) => e }),
    {
        virtual: true
    }
);
