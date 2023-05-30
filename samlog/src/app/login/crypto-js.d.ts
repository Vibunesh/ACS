declare module 'crypto-js' {
    const AES: {
      encrypt: (data: string, key: string) => any;
      // Add other methods you need from the library
    };
  
    // Add other classes or functions you need from the library
  
    export { AES };
    // Export other classes or functions you added
  }
  