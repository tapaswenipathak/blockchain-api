const config = {
  env: '',
  dev: 'development',
  test: 'test',
  port: process.env.PORT || 5000
};

process.env.NODE_ENV = process.env.NODE_ENV || config.dev;
config.env = process.env.NODE_ENV;

export default config;
